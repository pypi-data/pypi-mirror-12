# -*- coding: UTF-8 -*-
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


"""Database models for `lino_cosi.lib.accounts`.

"""

from django.db import models
from django.conf import settings
from django.utils.translation import ugettext_lazy as _

from lino.api import dd, rt
from lino import mixins

from lino.core.roles import SiteStaff

from .choicelists import *
from .utils import DEBIT, CREDIT


class Group(mixins.BabelNamed):
    "A group of accounts."
    class Meta:
        verbose_name = _("Account Group")
        verbose_name_plural = _("Account Groups")
        unique_together = ['chart', 'ref']

    # chart = models.ForeignKey(Chart)
    chart = AccountCharts.field()
    ref = dd.NullCharField(
        max_length=settings.SITE.plugins.accounts.ref_length)
    #~ ref = models.CharField(max_length=100)
    account_type = AccountTypes.field(blank=True)
    # help_text = dd.RichTextField(_("Introduction"),format="html",blank=True)


class Groups(dd.Table):
    """The global table of all account groups."""
    model = 'accounts.Group'
    required_roles = dd.required(SiteStaff)
    order_by = ['chart', 'ref']
    column_names = 'chart ref name account_type *'

    insert_layout = """
    name
    account_type ref
    """

    detail_layout = """
    ref name
    account_type id
    #help_text
    AccountsByGroup
    """


class GroupsByChart(Groups):
    master_key = 'chart'
    order_by = ['ref']
    column_names = 'ref name account_type *'


class Account(mixins.BabelNamed, mixins.Sequenced, mixins.Referrable):
    """An **account** is an item of an account chart used to collect
    ledger transactions or other accountable items.

    .. attribute:: name

        The multilingual designation of this account, as the users see
        it.


    .. attribute:: chart

        The *account chart* to which this account belongs.  This must
        point to an item of
        :class:`lino_cosi.lib.accounts.choicelists.AccountCharts`.
    
    .. attribute:: group

        The *account group* to which this account belongs.  This must
        point to an instance of :class:`Group`.
    
    .. attribute:: seqno

        The sequence number of this account within its :attr:`group`.
    
    .. attribute:: ref

        An optional unique name which can be used to reference a given
        account.

    .. attribute:: type

        The *account type* of this account.  This must
        point to an item of
        :class:`lino_cosi.lib.accounts.choicelists.AccountTypes`.
    
    """
    ref_max_length = settings.SITE.plugins.accounts.ref_length

    class Meta:
        verbose_name = _("Account")
        verbose_name_plural = _("Accounts")
        unique_together = ['chart', 'ref']
        ordering = ['ref']

    chart = AccountCharts.field()
    group = models.ForeignKey('accounts.Group')
    # ref = dd.NullCharField(
    #     max_length=settings.SITE.plugins.accounts.ref_length)
    type = AccountTypes.field()  # blank=True)

    def full_clean(self, *args, **kw):
        if self.group_id is not None:
            self.chart = self.group.chart
            if not self.ref:
                qs = rt.modules.accounts.Account.objects.filter(
                    chart=self.chart)
                self.ref = str(qs.count() + 1)
            if not self.name:
                self.name = self.group.name
            #~ if not self.type:
            self.type = self.group.account_type
            #~ if not self.chart:
                #~ self.chart = self.group.chart
        super(Account, self).full_clean(*args, **kw)

    def __unicode__(self):
        return "(%(ref)s) %(title)s" % dict(
            ref=self.ref,
            title=settings.SITE.babelattr(self, 'name'))


class Accounts(dd.Table):
    model = 'accounts.Account'
    required_roles = dd.required(SiteStaff)
    order_by = ['ref']
    column_names = "ref name group *"
    insert_layout = """
    ref group type
    name
    """
    detail_layout = """
    ref name
    group type
    # help_text
    """


class AccountsByGroup(Accounts):
    required_roles = dd.login_required()
    master_key = 'group'
    column_names = "ref name *"


class AccountsByChart(Accounts):
    required_roles = dd.login_required()
    master_key = 'chart'
    order_by = ['ref']
    column_names = 'ref name group *'


