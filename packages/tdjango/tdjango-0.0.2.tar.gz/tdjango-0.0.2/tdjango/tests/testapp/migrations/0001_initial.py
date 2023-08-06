# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Animals',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(unique=True, max_length=255)),
                ('weight', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Color',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('color', models.CharField(max_length=255)),
                ('r', models.IntegerField(default=0)),
                ('g', models.IntegerField(default=0)),
                ('b', models.IntegerField(default=0)),
            ],
        ),
        migrations.AddField(
            model_name='animals',
            name='color',
            field=models.ForeignKey(to='testapp.Color'),
        ),
        migrations.AddField(
            model_name='animals',
            name='owners',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL, blank=True),
        ),
    ]
