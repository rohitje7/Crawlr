from django.urls import path,include,re_path
from authentication.views import linkedInTokenHandle,homepage
from . import settings
from django.conf.urls.static import static

urlpatterns = [
    path('auth/',include('authentication.urls',namespace='auth')),
    path('ques/',include('question.urls',namespace='ques')),
    path('search/',include('search.urls',namespace='search')),
    re_path('login/',linkedInTokenHandle),
    path('',homepage,name="homepage")
]
if settings.DEBUG:
    urlpatterns = urlpatterns +  static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns = urlpatterns +  static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += patterns('',
        (r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
    )