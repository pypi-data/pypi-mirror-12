from django.db import models

from markdownx.models import MarkdownxField

class MyModel(models.Model):
    markdownx_field = MarkdownxField()
