from django.shortcuts import redirect
from django.urls import reverse_lazy

def login_required(func):
    def decorator(*args,**kwargs):
        request = args[0]
        if 'jwt_token' in request.session:
            return func(*args,**kwargs)
        else:
            return redirect('auth:login')

    return decorator
