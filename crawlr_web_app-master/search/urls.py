from django.urls import path
from . import views

app_name = 'search'
urlpatterns = [
    path('result/',views.resultpage,name='result'),
    path('cancel/',views.cancelSearch,name='cancel'),
    path('resultall/',views.resultallpage,name='resultall'),
    path('all/',views.allSearch,name='all'),
    path('api/result/',views.ResultApi,name='result_api')
]
