# Copyright 2008-2015 Luc Saffre
# This file is part of Lino Cosi.
#
# Lino Cosi is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version.
#
# Lino Cosi is distributed in the hope that it will be useful, but
# WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
# Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public
# License along with Lino Cosi.  If not, see
# <http://www.gnu.org/licenses/>.

"""
Model mixins for :mod:`lino_cosi.lib.finan`.
"""


from django.db import models
from django.core.exceptions import ValidationError

from lino_cosi.lib.accounts.utils import DEBIT, CREDIT, ZERO
from lino_cosi.lib.accounts.fields import DebitOrCreditField
from lino_cosi.lib.ledger.mixins import VoucherItem, SequencedVoucherItem
from lino_cosi.lib.ledger.mixins import ProjectRelated, Matching

from lino.api import dd, rt, _

from lino_cosi.lib.ledger.choicelists import VoucherStates

ledger = dd.resolve_app('ledger')


class FinancialVoucher(ledger.Voucher):
    """Base class for all financial vouchers:
    :class:`Grouper`,
    :class:`JournalEntry`,
    :class:`PaymentOrder` and
    :class:`BankStatement`.
    """
    # state = VoucherStates.field(default=VoucherStates.draft)

    class Meta:
        abstract = True

    def after_state_change(self, ar, old, new):
        super(FinancialVoucher, self).after_state_change(ar, old, new)
        if self.journal.auto_check_clearings:
            self.check_clearings()

    def check_clearings(self):
        """Update the `satisfied` field of movements of all related partners.

        Called when a voucher has been (de)registered on each partner for
        whom the voucher caused at least one movement.

        """
        partners = set()
        for i in self.items.all():
            if i.partner:
                partners.add(i.partner)
        for p in partners:
            for m in ledger.get_due_movements(DEBIT, partner=p):
                m.check_clearings()

    def add_item_from_due(self, obj, **kwargs):
        i = self.add_voucher_item(
            obj.account, dc=not obj.dc,
            amount=obj.balance, partner=obj.partner,
            match=obj.match, **kwargs)
        if i.amount < 0:
            i.amount = - i.amount
            i.dc = not i.dc
        return i

    def get_wanted_movements(self):
        amount, movements = self.get_finan_movements()
        if amount:
            raise Exception("Missing amount %s in movements" % amount)
        return movements

    def get_finan_movements(self):
        amount = ZERO
        mvts = []
        for i in self.items.all():
            if i.dc == self.journal.dc:
                amount += i.amount
            else:
                amount -= i.amount
            # if i.match:
            #     match = i.match
            # elif i.partner:
            #     match = "%s#%s-%s" % (self.journal.ref, self.pk, i.seqno)
            # else:
            #     match = ''
            b = self.create_movement(
                i.account, None, i.dc, i.amount,
                seqno=i.seqno,
                match=i.match,
                partner=i.partner)
            mvts.append(b)

        return amount, mvts


class FinancialVoucherItem(VoucherItem, SequencedVoucherItem,
                           ProjectRelated, Matching):
    """The base class for the items of all types of financial vouchers
    (:class:`FinancialVoucher`).

    .. attribute:: account

        The general account to be used in the primary booking.

    .. attribute:: partner

        The partner account to be used in the primary booking.

    .. attribute:: amount

        The amount to be booked.

    .. attribute:: dc

        The direction of the primary booking to create.

    .. attribute:: remark
    .. attribute:: seqno

    .. attribute:: match

        The voucher that caused this voucher item.  For example the
        :attr:`match` of the payment of an invoice points to that
        invoice.

    """
    class Meta:
        abstract = True
        verbose_name = _("Item")
        verbose_name_plural = _("Items")

    amount = dd.PriceField(default=0)
    dc = DebitOrCreditField()
    remark = models.CharField(_("Remark"), max_length=200, blank=True)
    account = dd.ForeignKey('accounts.Account', blank=True)
    partner = dd.ForeignKey('contacts.Partner', blank=True, null=True)

    @dd.chooser()
    def match_choices(cls, voucher, partner):
        return cls.get_match_choices(voucher.journal, partner)

    def get_default_match(self):
        return str(self.date)

    def get_siblings(self):
        return self.voucher.items.all()

    def match_changed(self, ar):
        if self.match:
            dc = not self.voucher.journal.dc
            m = ledger.DueMovement(dc, self)
            self.dc = dc
            self.amount = m.balance
            #~ if m.balance > 0:
                #~ self.dc = not self.voucher.journal.dc
                #~ self.amount = m.balance
            #~ else:
                #~ self.dc = self.voucher.journal.dc
                #~ self.amount = - m.balance

    def partner_changed(self, ar):
        """The :meth:`trigger method <lino.core.model.Model.FOO_changed>` for
        :attr:`partner`.

        """
        if self.partner:
            flt = dict(partner=self.partner, satisfied=False)
            if self.match:
                flt.update(match=self.match)
            suggestions = list(ledger.get_due_movements(
                self.voucher.journal.dc, **flt))

            if len(suggestions) == 0:
                pass
            elif len(suggestions) == 1:
                self.fill_suggestion(suggestions[0])
            else:
                self.set_grouper(suggestions)
            if self.account_id is None:
                raise ValidationError(
                    _("Could not determine the general account"))
        print self.partner_id
        if self.partner_id is None:
            raise ValidationError(
                _("Could not determine the partner account"))

    def fill_suggestion(self, match):
        """Fill the fields of this item from the given suggestion (a
        `DueMovement` instance).

        """
        if match.trade_type is not None:
            self.account = match.trade_type.get_partner_account()
        if self.account_id is None:
            self.account = match.account
        self.dc = match.dc
        self.amount = - match.balance
        self.match = match.match

    def set_grouper(self, suggestions):
        # not tested
        Grouper = rt.modules.finan.Grouper
        GrouperItem = rt.modules.finan.GrouperItem
        fkw = dict(partner=self.partner)
        fkw.update(state__in=VoucherStates.get_editable_states())
        try:
            Grouper.objects.get(**fkw)
        except Grouper.DoesNotExist:
            pass
        else:
            msg = _("There is already an open grouper for {0}")
            raise Warning(msg.format(self.partner))
        jnl = self.voucher.journal.grouper_journal
        grouper = jnl.create_voucher()
        for match in suggestions:
            gi = GrouperItem(voucher=grouper)
            gi.fill_suggestion(match)
            gi.full_clean()
            gi.save()
        grouper.register_voucher()
        grouper.full_clean()
        grouper.save()
        self.match = grouper

    def full_clean(self, *args, **kw):
        if self.dc is None:
            self.dc = self.voucher.journal.dc
        if self.amount < 0:
            self.amount = - self.amount
            self.dc = not self.dc
        return super(FinancialVoucherItem, self).full_clean(*args, **kw)


