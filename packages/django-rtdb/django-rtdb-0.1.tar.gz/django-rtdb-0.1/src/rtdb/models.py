"""A limited wrapper for RT4's database structure

This only covers tickets, queues and custom fields of tickets. No users.

A complete list of models are in raw_models.
"""

from __future__ import unicode_literals

from django.db import models
from django.utils.encoding import python_2_unicode_compatible


@python_2_unicode_compatible
class Customfield(models.Model):
    name = models.CharField(max_length=200, blank=True, null=True)
    type = models.CharField(max_length=200, blank=True, null=True)
    description = models.CharField(max_length=255, blank=True, null=True)
    sortorder = models.IntegerField()
    creator = models.IntegerField()
    created = models.DateTimeField(blank=True, null=True)
    lastupdatedby = models.IntegerField()
    lastupdated = models.DateTimeField(blank=True, null=True)
    disabled = models.SmallIntegerField()
    lookuptype = models.CharField(max_length=255)
    pattern = models.CharField(max_length=65536, blank=True, null=True)
    maxvalues = models.IntegerField(blank=True, null=True)
    basedon = models.IntegerField(blank=True, null=True)
    rendertype = models.CharField(max_length=64, blank=True, null=True)
    valuesclass = models.CharField(max_length=64, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'customfields'

    def __str__(self):
        return self.name


@python_2_unicode_compatible
class CustomfieldValue(models.Model):
    "Allowable content for Customfields"

    customfield = models.ForeignKey('Customfield', db_column='customfield')
    name = models.CharField(max_length=200, blank=True, null=True)
    description = models.CharField(max_length=255, blank=True, null=True)
    sortorder = models.IntegerField()
    creator = models.IntegerField()
    created = models.DateTimeField(blank=True, null=True)
    lastupdatedby = models.IntegerField()
    lastupdated = models.DateTimeField(blank=True, null=True)
    category = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'customfieldvalues'

    def __str__(self):
        return '{}: {}'.format(self.customfield, self.name)


class AbstractObjectcustomfieldvalues(models.Model):
    """This table points to several other tables

    Known hooks:
    * Tickets
    * Articles

    'objectid' is the id of the row
    'objecttype' is the table"""

    objectid = models.IntegerField()
    customfield = models.ForeignKey('Customfield', db_column='customfield')
    content = models.CharField(max_length=255, blank=True, null=True)
    creator = models.IntegerField()
    created = models.DateTimeField(blank=True, null=True)
    lastupdatedby = models.IntegerField()
    lastupdated = models.DateTimeField(blank=True, null=True)
    objecttype = models.CharField(max_length=255)
    largecontent = models.TextField(blank=True, null=True)
    contenttype = models.CharField(max_length=80, blank=True, null=True)
    contentencoding = models.CharField(max_length=80, blank=True, null=True)
    sortorder = models.IntegerField()
    disabled = models.IntegerField()

    class Meta:
        managed = False
        abstract = True
        db_table = 'objectcustomfieldvalues'


class Objectcustomfieldvalues(AbstractObjectcustomfieldvalues):
    "All Objectcustomfieldvalues"

    class Meta:
        managed = False
        db_table = 'objectcustomfieldvalues'


class TicketCustomfieldValueManager(models.Manager):
    "Filter out non-Tickets"

    def get_queryset(self):
        return super(TicketCustomfieldValueManager,
            self).get_queryset().filter(objecttype='RT::Ticket')


@python_2_unicode_compatible
class TicketCustomfieldValue(AbstractObjectcustomfieldvalues):
    "Only Objectcustomfieldvalues for Ticket"

    # Easier joins: add a name to the column
    ticket = models.ForeignKey('Ticket', db_column='objectid', related_name='customfields')

    objects = TicketCustomfieldValueManager()

    class Meta:
        managed = False
        db_table = 'objectcustomfieldvalues'

    def __str__(self):
        return '{}: {}'.format(self.customfield, self.content)


@python_2_unicode_compatible
class Queue(models.Model):
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=255, blank=True, null=True)
    correspondaddress = models.CharField(max_length=120, blank=True, null=True)
    commentaddress = models.CharField(max_length=120, blank=True, null=True)
    initialpriority = models.IntegerField()
    finalpriority = models.IntegerField()
    defaultduein = models.IntegerField()
    creator = models.IntegerField()
    created = models.DateTimeField(blank=True, null=True)
    lastupdatedby = models.IntegerField()
    lastupdated = models.DateTimeField(blank=True, null=True)
    disabled = models.SmallIntegerField()
    subjecttag = models.CharField(max_length=120, blank=True, null=True)
    lifecycle = models.CharField(max_length=32, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'queues'

    def __str__(self):
        return self.name


@python_2_unicode_compatible
class Ticket(models.Model):
    effectiveid = models.IntegerField()
    queue = models.ForeignKey('Queue', db_column='queue', related_name='tickets')
    type = models.CharField(max_length=16, blank=True, null=True)
    issuestatement = models.IntegerField()
    resolution = models.IntegerField()
    owner = models.IntegerField()
    subject = models.CharField(max_length=200, blank=True, null=True)
    initialpriority = models.IntegerField()
    finalpriority = models.IntegerField()
    priority = models.IntegerField()
    timeestimated = models.IntegerField()
    timeworked = models.IntegerField()
    status = models.CharField(max_length=64, blank=True, null=True)
    timeleft = models.IntegerField()
    told = models.DateTimeField(blank=True, null=True)
    starts = models.DateTimeField(blank=True, null=True)
    started = models.DateTimeField(blank=True, null=True)
    due = models.DateTimeField(blank=True, null=True)
    resolved = models.DateTimeField(blank=True, null=True)
    lastupdatedby = models.IntegerField()
    lastupdated = models.DateTimeField(blank=True, null=True)
    creator = models.IntegerField()
    created = models.DateTimeField(blank=True, null=True)
    disabled = models.SmallIntegerField()
    ismerged = models.SmallIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tickets'

    def __str__(self):
        return '#{}: {}'.format(self.id, self.subject)
