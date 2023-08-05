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
Database models for `lino_cosi.lib.finan`.
"""


import logging
logger = logging.getLogger(__name__)

from django.db import models

from lino_cosi.lib.accounts.utils import ZERO, DEBIT, CREDIT
from lino_cosi.lib.ledger.fields import DcAmountField
from lino_cosi.lib.ledger.choicelists import VoucherTypes
from lino_cosi.lib.ledger.roles import LedgerStaff
from lino.api import dd, rt, _

from .mixins import FinancialVoucher, FinancialVoucherItem


ledger = dd.resolve_app('ledger')


class ShowSuggestions(dd.Action):
    # started as a copy of ShowSlaveTable
    TABLE2ACTION_ATTRS = tuple('help_text icon_name label sort_index'.split())
    show_in_bbar = True

    @classmethod
    def get_actor_label(self):
        return self._label or self.slave_table.label

    def attach_to_actor(self, actor, name):
        if actor.suggestions_table is None:
            logger.info("%s has no suggestions_table", actor)
            return  # don't attach
        if isinstance(actor.suggestions_table, basestring):
            T = rt.modules.resolve(actor.suggestions_table)
            if T is None:
                raise Exception("No table named %s" % actor.suggestions_table)
            actor.suggestions_table = T
        for k in self.TABLE2ACTION_ATTRS:
            setattr(self, k, getattr(actor.suggestions_table, k))
        return super(ShowSuggestions, self).attach_to_actor(actor, name)

    def run_from_ui(self, ar, **kw):
        obj = ar.selected_rows[0]
        sar = ar.spawn(ar.actor.suggestions_table, master_instance=obj)
        js = ar.renderer.request_handler(sar)
        ar.set_response(eval_js=js)


class Grouper(FinancialVoucher):
    """An internal journal entry used to group a series of matches.

    There are two types of groupers: *partner* groupers and *general
    account* groupers.

    """
    class Meta:
        abstract = dd.is_abstract_model(__name__, 'Grouper')
        verbose_name = _("Grouper")
        verbose_name_plural = _("Groupers")

    partner = dd.ForeignKey('contacts.Partner', blank=True, null=True)
    # account = dd.ForeignKey('accounts.Account', blank=True, null=True)


class JournalEntry(FinancialVoucher):
    """This is the model for "journal entries" ("operations diverses").

    """
    class Meta:
        abstract = dd.is_abstract_model(__name__, 'JournalEntry')
        verbose_name = _("Journal Entry")
        verbose_name_plural = _("Journal Entries")


class PaymentOrder(FinancialVoucher):
    """A **payment order** is when a user instructs a bank to execute a
    series of outgoing transactions from a given bank account.

    """
    class Meta:
        abstract = dd.is_abstract_model(__name__, 'PaymentOrder')
        verbose_name = _("Payment Order")
        verbose_name_plural = _("Payment Orders")

    total = dd.PriceField(_("Total"), blank=True, null=True)
    execution_date = models.DateField(
        _("Execution date"), blank=True, null=True)

    def get_wanted_movements(self):
        a = self.journal.account
        if not a:
            raise Exception("No account in %s" % self.journal)
        amount, movements = self.get_finan_movements()
        self.total = - amount
        for m in movements:
            yield m
        yield self.create_movement(a, None, self.journal.dc, -amount)

    def add_item_from_due(self, obj, **kwargs):
        if obj.bank_account is None:
            return
        i = super(PaymentOrder, self).add_item_from_due(obj, **kwargs)
        i.bank_account = obj.bank_account
        return i


class BankStatement(FinancialVoucher):
    """A **bank statement** is a document issued by the bank, which
    reports all transactions which occured on a given account during a
    given period.

    """
    class Meta:
        abstract = dd.is_abstract_model(__name__, 'BankStatement')
        verbose_name = _("Bank Statement")
        verbose_name_plural = _("Bank Statements")

    balance1 = dd.PriceField(_("Old balance"), default=ZERO)
    balance2 = dd.PriceField(_("New balance"), default=ZERO)

    def get_previous_voucher(self):
        if not self.journal_id:
            #~ logger.info("20131005 no journal")
            return None
        qs = self.__class__.objects.filter(
            journal=self.journal).order_by('-date')
        if qs.count() > 0:
            #~ logger.info("20131005 no other vouchers")
            return qs[0]

    def on_create(self, ar):
        super(BankStatement, self).on_create(ar)
        if self.balance1 == ZERO:
            prev = self.get_previous_voucher()
            if prev is not None:
                #~ logger.info("20131005 prev is %s",prev)
                self.balance1 = prev.balance2

    def get_wanted_movements(self):
        a = self.journal.account
        if not a:
            raise Exception("No account in %s" % self.journal)
        amount, movements = self.get_finan_movements()
        self.balance2 = self.balance1 + amount
        for m in movements:
            yield m
        yield self.create_movement(a, None, not self.journal.dc, amount)


class GrouperItem(FinancialVoucherItem):
    """An item of a :class:`Grouper`."""
    voucher = dd.ForeignKey('finan.Grouper', related_name='items')


class JournalEntryItem(FinancialVoucherItem):
    """An item of a :class:`JournalEntry`."""
    voucher = dd.ForeignKey('finan.JournalEntry', related_name='items')
    date = models.DateField(blank=True, null=True)
    debit = DcAmountField(DEBIT, _("Debit"))
    credit = DcAmountField(CREDIT, _("Credit"))


class BankStatementItem(FinancialVoucherItem):
    """An item of a :class:`BankStatement`."""
    voucher = dd.ForeignKey('finan.BankStatement', related_name='items')
    date = models.DateField(blank=True, null=True)
    debit = DcAmountField(DEBIT, _("Income"))
    credit = DcAmountField(CREDIT, _("Expense"))


class PaymentOrderItem(FinancialVoucherItem):
    """An item of a :class:`PaymentOrder`."""
    voucher = dd.ForeignKey('finan.PaymentOrder', related_name='items')
    bank_account = dd.ForeignKey('sepa.Account', blank=True, null=True)

# dd.update_field(PaymentOrderItem, 'iban', blank=True)
# dd.update_field(PaymentOrderItem, 'bic', blank=True)


class JournalEntryDetail(dd.FormLayout):
    main = "general ledger"

    general = dd.Panel("""
    date user narration workflow_buttons
    finan.ItemsByJournalEntry
    """, label=_("General"))

    ledger = dd.Panel("""
    id journal year number
    ledger.MovementsByVoucher
    """, label=_("Ledger"))


class PaymentOrderDetail(JournalEntryDetail):
    general = dd.Panel("""
    date user narration total execution_date workflow_buttons
    finan.ItemsByPaymentOrder
    """, label=_("General"))


class BankStatementDetail(JournalEntryDetail):
    general = dd.Panel("""
    date balance1 balance2 user workflow_buttons
    finan.ItemsByBankStatement
    """, label=_("General"))


class GrouperDetail(JournalEntryDetail):
    general = dd.Panel("""
    date partner user workflow_buttons
    finan.ItemsByGrouper
    """, label=_("General"))


class FinancialVouchers(dd.Table):
    """The table of all :class:`JournalEntry` vouchers.

    This is also the base table for the default tables of all other
    financial voucher types (:class:`PaymentOrders`,
    :class:`BankStatemens` and :class:`Groupers`).

    """
    model = 'finan.JournalEntry'
    required_roles = dd.login_required(LedgerStaff)
    params_panel_hidden = True
    order_by = ["date", "id"]
    parameters = dict(
        pyear=ledger.FiscalYears.field(blank=True),
        #~ ppartner=models.ForeignKey('contacts.Partner',blank=True,null=True),
        pjournal=ledger.JournalRef(blank=True))
    params_layout = "pjournal pyear"
    detail_layout = JournalEntryDetail()
    insert_layout = dd.FormLayout("""
    date user
    narration
    """, window_size=(40, 'auto'))

    suggest = ShowSuggestions()
    suggestions_table = None  # 'finan.SuggestionsByJournalEntry'

    @classmethod
    def get_request_queryset(cls, ar):
        qs = super(FinancialVouchers, cls).get_request_queryset(ar)
        if not isinstance(qs, list):
            if ar.param_values.pyear:
                qs = qs.filter(year=ar.param_values.pyear)
            if ar.param_values.pjournal:
                qs = qs.filter(journal=ar.param_values.pjournal)
        return qs


class JournalEntries(FinancialVouchers):
    suggestions_table = 'finan.SuggestionsByJournalEntry'


class PaymentOrders(FinancialVouchers):
    """The table of all :class:`PaymentOrder` vouchers."""
    model = 'finan.PaymentOrder'
    column_names = "date id number user *"
    detail_layout = PaymentOrderDetail()
    suggestions_table = 'finan.SuggestionsByPaymentOrder'


class Groupers(FinancialVouchers):
    """The table of all :class:`Grouper` vouchers."""
    model = 'finan.Grouper'
    column_names = "date id number partner user workflow_buttons"
    detail_layout = GrouperDetail()
    insert_layout = """
    date user
    partner
    """


class BankStatements(FinancialVouchers):
    """The table of all :class:`BankStatement` vouchers."""
    model = 'finan.BankStatement'
    column_names = "date id number balance1 balance2 user *"
    detail_layout = BankStatementDetail()
    insert_layout = """
    date user
    balance1
    balance2
    """
    suggestions_table = 'finan.SuggestionsByBankStatement'


class PaymentOrdersByJournal(ledger.ByJournal, PaymentOrders):
    pass


class JournalEntriesByJournal(ledger.ByJournal, JournalEntries):
    pass


class BankStatementsByJournal(ledger.ByJournal, BankStatements):
    pass


class GroupersByJournal(ledger.ByJournal, Groupers):
    pass


class ItemsByVoucher(dd.Table):
    order_by = ["seqno"]
    column_names = "date partner account match remark debit credit seqno *"
    master_key = 'voucher'
    auto_fit_column_widths = True
    hidden_columns = 'id amount dc seqno'


class ItemsByJournalEntry(ItemsByVoucher):
    model = 'finan.JournalEntryItem'
    column_names = "date partner account match remark debit credit seqno *"


class ItemsByBankStatement(ItemsByVoucher):
    model = 'finan.BankStatementItem'
    column_names = "date partner account match remark debit credit seqno *"


class ItemsByPaymentOrder(ItemsByVoucher):
    model = 'finan.PaymentOrderItem'
    column_names = "seqno partner bank_account match amount remark *"


class ItemsByGrouper(ItemsByVoucher):
    model = 'finan.GrouperItem'
    column_names = "seqno partner match amount remark *"


class FillSuggestions(dd.Action):
    """Fill selected suggestions into a financial voucher.

    This creates one voucher item for each selected DueMovement
    object.

    """
    label = _("Fill")
    icon_name = 'lightning'
    http_method = 'POST'
    select_rows = False

    def run_from_ui(self, ar, **kw):
        voucher = ar.master_instance
        seqno = None
        n = 0
        for obj in ar.selected_rows:
            i = voucher.add_item_from_due(obj, seqno=seqno)
            if i is not None:
                i.full_clean()
                i.save()
                seqno = i.seqno + 1
                n += 1

        msg = _("%d items have been added to %s.") % (n, voucher)
        logger.info(msg)
        kw.update(close_window=True)
        ar.success(msg, **kw)


class SuggestionsByVoucher(ledger.ExpectedMovements):
    """Shows the suggested items for a given voucher, with a button to
    fill them into the current voucher.

    This is the base class for
    :class:`SuggestionsByJournalEntry`
    :class:`SuggestionsByBankStatement` and
    :class:`SuggestionsByPaymentOrder` who define the class of the
    master_instance (:attr:`master <lino.core.actors.Actor.master>`)

    This is an abstract virtual slave table.

    """

    label = _("Suggestions")
    column_names = 'partner match account due_date debts payments balance *'
    window_size = (70, 20)  # (width, height)

    editable = False
    auto_fit_column_widths = True
    cell_edit = False

    do_fill = FillSuggestions()

    @classmethod
    def get_dc(cls, ar=None):
        if ar is None:
            return None
        voucher = ar.master_instance
        if voucher is None:
            return None
        return voucher.journal.dc

    @classmethod
    def param_defaults(cls, ar, **kw):
        voucher = ar.master_instance
        kw = super(SuggestionsByVoucher, cls).param_defaults(ar, **kw)
        #~ kw = super(MyEvents,self).param_defaults(ar,**kw)
        kw.update(for_journal=voucher.journal)
        kw.update(date_until=voucher.date)
        #~ kw.update(trade_type=vat.TradeTypes.purchases)
        return kw

    @classmethod
    def get_data_rows(cls, ar, **flt):
        #~ partner = ar.master_instance
        #~ if partner is None: return []
        flt.update(satisfied=False)
        # flt.update(account__clearable=True)
        return super(SuggestionsByVoucher, cls).get_data_rows(ar, **flt)


class SuggestionsByJournalEntry(SuggestionsByVoucher):
    "A :class:`SuggestionsByVoucher` table for a :class:`JournalEntry`."
    master = 'finan.JournalEntry'


class SuggestionsByPaymentOrder(SuggestionsByVoucher):
    "A :class:`SuggestionsByVoucher` table for a :class:`PaymentOrder`."

    master = 'finan.PaymentOrder'
    column_names = 'partner match account due_date debts payments balance bank_account *'

    @classmethod
    def param_defaults(cls, ar, **kw):
        kw = super(SuggestionsByPaymentOrder, cls).param_defaults(ar, **kw)
        voucher = ar.master_instance
        #~ kw.update(journal=voucher.journal)
        kw.update(date_until=voucher.execution_date or voucher.date)
        if voucher.journal.trade_type is not None:
            kw.update(trade_type=voucher.journal.trade_type)
        #~ kw.update(trade_type=vat.TradeTypes.purchases)
        return kw


class SuggestionsByBankStatement(SuggestionsByVoucher):
    "A :class:`SuggestionsByVoucher` table for a :class:`BankStatement`."
    master = 'finan.BankStatement'


# Declare the voucher types:

VoucherTypes.add_item(JournalEntry, JournalEntriesByJournal)
VoucherTypes.add_item(PaymentOrder, PaymentOrdersByJournal)
VoucherTypes.add_item(BankStatement, BankStatementsByJournal)
VoucherTypes.add_item(Grouper, GroupersByJournal)
