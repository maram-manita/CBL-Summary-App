from django.urls import path
from . import views
from .views import SummarizeMarkdown

urlpatterns = [
    path("summarize/", SummarizeMarkdown.as_view(), name="summarize"),
]
