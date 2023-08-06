# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.utils.timezone
import mptt.fields
import optionsfield.fields
import django_extensions.db.fields


class Migration(migrations.Migration):

    dependencies = [
        ('contenttypes', '0002_remove_content_type_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='MenuNode',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created', django_extensions.db.fields.CreationDateTimeField(default=django.utils.timezone.now, verbose_name='created', editable=False, blank=True)),
                ('modified', django_extensions.db.fields.ModificationDateTimeField(default=django.utils.timezone.now, verbose_name='modified', editable=False, blank=True)),
                ('title', models.CharField(max_length=255, verbose_name='title')),
                ('title_en', models.CharField(max_length=255, null=True, verbose_name='title')),
                ('title_de', models.CharField(max_length=255, null=True, verbose_name='title')),
                ('title_fr', models.CharField(max_length=255, null=True, verbose_name='title')),
                ('description', models.TextField(null=True, verbose_name='description', blank=True)),
                ('description_en', models.TextField(null=True, verbose_name='description', blank=True)),
                ('description_de', models.TextField(null=True, verbose_name='description', blank=True)),
                ('description_fr', models.TextField(null=True, verbose_name='description', blank=True)),
                ('slug', django_extensions.db.fields.AutoSlugField(populate_from=b'title', verbose_name='slug', editable=False, blank=True)),
                ('slug_en', django_extensions.db.fields.AutoSlugField(populate_from=b'title', editable=False, blank=True, null=True, verbose_name='slug')),
                ('slug_de', django_extensions.db.fields.AutoSlugField(populate_from=b'title', editable=False, blank=True, null=True, verbose_name='slug')),
                ('slug_fr', django_extensions.db.fields.AutoSlugField(populate_from=b'title', editable=False, blank=True, null=True, verbose_name='slug')),
                ('status', models.IntegerField(default=1, verbose_name='status', choices=[(0, 'Inactive'), (1, 'Active')])),
                ('activate_date', models.DateTimeField(help_text='keep empty for an immediate activation', null=True, blank=True)),
                ('deactivate_date', models.DateTimeField(help_text='keep empty for indefinite activation', null=True, blank=True)),
                ('created_by', models.CharField(verbose_name='Created by', max_length=128, null=True, editable=False, blank=True)),
                ('modified_by', models.CharField(verbose_name='Modified by', max_length=128, null=True, editable=False, blank=True)),
                ('stub', models.SlugField(null=True, default=None, choices=[(None, 'No stub'), (b'main', 'Main'), (b'header', 'Header'), (b'footer', 'Footer'), (b'aside', 'Aside')], blank=True, unique=True, verbose_name='stub')),
                ('url', models.CharField(max_length=512, verbose_name='url', blank=True)),
                ('url_en', models.CharField(max_length=512, null=True, verbose_name='url', blank=True)),
                ('url_de', models.CharField(max_length=512, null=True, verbose_name='url', blank=True)),
                ('url_fr', models.CharField(max_length=512, null=True, verbose_name='url', blank=True)),
                ('object_id', models.PositiveIntegerField(null=True, blank=True)),
                ('options', optionsfield.fields.OptionsField(verbose_name='options', types=(unicode, str))),
                ('options_en', optionsfield.fields.OptionsField(null=True, verbose_name='options', types=(unicode, str))),
                ('options_de', optionsfield.fields.OptionsField(null=True, verbose_name='options', types=(unicode, str))),
                ('options_fr', optionsfield.fields.OptionsField(null=True, verbose_name='options', types=(unicode, str))),
                ('lft', models.PositiveIntegerField(editable=False, db_index=True)),
                ('rght', models.PositiveIntegerField(editable=False, db_index=True)),
                ('tree_id', models.PositiveIntegerField(editable=False, db_index=True)),
                ('level', models.PositiveIntegerField(editable=False, db_index=True)),
                ('content_type', models.ForeignKey(blank=True, to='contenttypes.ContentType', null=True)),
                ('parent', mptt.fields.TreeForeignKey(related_name='children', blank=True, to='menus.MenuNode', null=True)),
            ],
            options={
                'abstract': False,
                'get_latest_by': 'created',
                'verbose_name': 'menu node',
                'verbose_name_plural': 'menu nodes',
            },
        ),
    ]
