from django.shortcuts import render,redirect
from django.http import HttpResponse,HttpResponseRedirect,Http404
from django.shortcuts import reverse
import requests as re
from crawlr_web import settings
import json
from crawlr_web.decorators import login_required

@login_required
def resultallpage(request):
    query = request.GET['q']
    search_text = request.GET['t']
    if query == None:
        return redirect('search:all')
    return render(request,'result.html',{'Question_id':query,'search_query':search_text})

@login_required
def allSearch(request):
    headers = {'content-type': 'application/json','authorization': request.session.get('jwt_token')}
    pageNo = request.GET.get('page')
    if pageNo == None:
        pageNo = 1
    else:
        pageNo = int(pageNo)
    if pageNo < 0 or pageNo == 0:
        pageNo = 1
    try:
        responce = re.get(settings.API_URL+'/search/all',params={'pageNo':pageNo},headers=headers)
    except Exception as e:
        print(e)
        raise Http404('something went wrong')
    if responce.status_code == 200:
        res = responce.json()
        data = res['data']
        for i in data:
            i['id'] = i.pop('_id')
        if data:
            pageNo += 1
            next = True
        else:
            next = False
        return render(request, 'mysearch.html', {'searches':data,'pageNo': pageNo, 'next': next})
    if responce.status_code == 401:
        return redirect('auth:login')
    raise Http404('some error occurred')

@login_required
def resultpage(request):
    query = request.POST['q']
    if len(query) == 0:
        return HttpResponseRedirect(reverse('homepage'))
    try:
        responce = re.post(settings.API_URL+'/search',data=json.dumps({'searchQuery':query}),headers={'authorization':request.session['jwt_token'],'content-type':'application/json'})
    except Exception as e:
        print(e)
        raise Http404('somerthing went wrong')
    if responce.status_code == 200:
        return render(request,'result.html',{'Question_id':responce.json()['id'],'search_query':query})
    if responce.status_code == 401:
        return redirect('auth:login')
    raise Http404('something went wrong')
    # return render(request,'result.html',{'Question_id':'5dd780c85ddf35001749ff73'})


@login_required
def ResultApi(request):
    id = request.GET['id']
    try:
        responce = re.get(settings.API_URL+'/search',params={'searchID':id},headers={'content-type':'application/json','authorization':request.session['jwt_token']})
    except Exception as e:
        print(e)
        return HttpResponse(json.dumps({'code':400}))
    if responce.status_code == 200:
        res = responce.json()
        return HttpResponse(json.dumps(res))
    if responce.status_code == 401:
        return HttpResponse(json.dumps({'code':401}))
    return HttpResponse(json.dumps({'code':400}))


@login_required
def cancelSearch(request):
    id = request.GET['id']
    try:
        responce = re.delete(settings.API_URL+'/search/cancel?id='+str(id),headers={'content-type':'application/json','authorization':request.session['jwt_token']})
    except Exception as e:
        print(e)
        raise Http404('something went wrong')
    if responce.status_code == 200:
        return redirect('search:all')
    if responce.status_code == 401:
        return redirect('auth:login')
    raise Http404('something went wrong')