# -*- coding: UTF-8 -*-
# Copyright 2014-2015 Luc Saffre
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
Model mixins for `lino_cosi.lib.sepa`.

"""

from __future__ import unicode_literals

from django.db import models
from django.core.exceptions import ValidationError

from lino.api import dd, rt, _


class Payable(dd.Model):
    """Model mixin for database objects that are considered *payable
    transactions*. To be combined with some mixin which defines a
    field `partner`.

    A **payable transaction** is a transaction that is expected to
    create a payment.

    Base class for :class:`vat.AccountInvoice`
    (and e.g. `sales.Invoice`, `finan.DocItem`)
    
    .. attribute:: your_ref
    .. attribute:: due_date
    .. attribute:: title

       A char field with a description for this transaction.

    """
    class Meta:
        abstract = True

    your_ref = models.CharField(
        _("Your reference"), max_length=200, blank=True)
    due_date = models.DateField(_("Due date"), blank=True, null=True)
    title = models.CharField(_("Description"), max_length=200, blank=True)
    bank_account = dd.ForeignKey('sepa.Account', blank=True, null=True)

    def full_clean(self):
        super(Payable, self).full_clean()
        if self.bank_account:
            if self.bank_account.partner != self.partner:
                raise ValidationError(_("Partners mismatch"))
        else:
            self.partner_changed(None)

    @classmethod
    def get_registrable_fields(cls, site):
        for f in super(Payable, cls).get_registrable_fields(site):
            yield f
        yield 'your_ref'
        yield 'bank_account'

    def partner_changed(self, ar):
        self.bank_account = None
        if self.partner:
            qs = rt.modules.sepa.Account.objects.filter(
                partner=self.partner, primary=True)
            if qs.count() == 1:
                self.bank_account = qs[0]
        
    def get_due_date(self):
        return self.due_date or self.date

    def get_bank_account(self):
        return self.bank_account

    @dd.chooser()
    def bank_account_choices(cls, partner):
        return rt.modules.sepa.Account.objects.filter(
            partner=partner).order_by('iban')

