from django.urls import path
from . import views

app_name='authentication'
urlpatterns = [
    path('login/',views.logIn, name='login'),
    path('profile/',views.profileComfirm, name='profile_comfirm'),
    path('api/profile/',views.getProfile, name='profile'),
    path('logout/',views.logOut, name='logout'),
    path('edit/',views.editProfile, name='edit'),
]
