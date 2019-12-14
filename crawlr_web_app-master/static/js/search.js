var $timer = setInterval(function() {
  var $id = $('input[name=id]').val()
  var $url = $('input[name=result_url]').val()
  var $data = $('#data')
  $data.html('<p style="text-align:center;color:blue">content loading but it may take some time</p><p style="text-align:center;color:blue">you can check in mysearch option Later<p><div class="loading" style="display: block;text-align:center"><lottie-player src="https://assets3.lottiefiles.com/datafiles/fPx4vaZrul2Fvg9/data.json" mode="normal" speed="1" style="width:150px; height: 150px;" hover loop autoplay></lottie-player></div>')
  $.ajax({
    type: 'GET',
    url: $url,
    data: {
      'id': $id
    },
    success: function(res, code) {
      responce = JSON.parse(res)
      if (responce['code']) {
        if (responce['code'] == 400) {
          $data.html('something went wrong try again later')
          clearTimeout($timer)
        }
        if (responce['code']== 401) {
          $data.html('you are not authorized to see this results')
          clearTimeout($timer)
        }
      }
      else {
        if (responce.status == "D") {
          var stringdata = "";
          $.each(responce.result,function(i,data){
            stringdata += '<div>'
            stringdata +=   '<div class="mt-4 mb-3">'
            stringdata +=    iconreturn(data.Icon)
            stringdata +=        '<h3 style="display: inline;" style="font-weight: bold;font-size: 19px;">'+data.title+'</h3>'
            stringdata +=    '</div>'
            if(isEmpty(data.content)){
              stringdata += '<p>no results found</p>'
            }
            $.each(data.content,function(i,content) {
              stringdata += '<p>'
              if (data.title == 'Images') {
                stringdata += '<img src="'+content.url+'" class="rounded-circle z-depth-2" width="40" height="40"></img>'
              }
              else{
                if (content.link) {
                  stringdata += '<a href="'+content.link+'" target="_blank">'+content.body+'</a>'
                }
                else{
                  if(content.body){
                    stringdata += content.body + ' '
                    if(content.secondaryBody){
                      stringdata += content.secondaryBody
                    }
                  }
                }
              }
              stringdata += '</p>'
            });
            stringdata += '</div>'
          });
          $('#querystatus').html('<i class="fa fa-check-circle-o" style="color: limegreen;"></i>')
          $data.html(stringdata)
          clearTimeout($timer)
          feather.replace()
        }
        if (responce.status == "C") {
          $('#querystatus').html('<i class="fa fa-exclamation-triangle" style="color: yellow;"></i>')
          $data.html('you cancelled this search')
          clearTimeout($timer)
        }
        if (responce.status == "ERR") {
          $('#querystatus').html('<i class="fa fa-times-circle-o" style="color: #F55D45;"></i>')
          $data.html('server error occured')
          clearTimeout($timer)
        }
      }
    }
  });
}, 2500);

function iconreturn(x){
  if(x.Feather == true){
    return '<i data-feather="'+x.name+'"></i>';
  }
  else{
    if(x.name == 'file-ppt'){
      return '<?xml version="1.0" standalone="no"?><svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 1024 1024" width="40" height="40"><path d="M424 476c-4.4 0-8 3.6-8 8v276c0 4.4 3.6 8 8 8h32.5c4.4 0 8-3.6 8-8v-95.5h63.3c59.4 0 96.2-38.9 96.2-94.1 0-54.5-36.3-94.3-96-94.3H424zm150.6 94.3c0 43.4-26.5 54.3-71.2 54.3h-38.9V516.2h56.2c33.8 0 53.9 19.7 53.9 54.1zm280-281.7L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0 0 42 42h216v494z"/></svg>'
    }
    if(x.name == 'reddit'){
      return '<?xml version="1.0" standalone="no"?><svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 1024 1024" width="40" height="40"><path d="M288 568a56 56 0 1 0 112 0 56 56 0 1 0-112 0zm338.7 119.7c-23.1 18.2-68.9 37.8-114.7 37.8s-91.6-19.6-114.7-37.8c-14.4-11.3-35.3-8.9-46.7 5.5s-8.9 35.3 5.5 46.7C396.3 771.6 457.5 792 512 792s115.7-20.4 155.9-52.1a33.25 33.25 0 1 0-41.2-52.2zM960 456c0-61.9-50.1-112-112-112-42.1 0-78.7 23.2-97.9 57.6-57.6-31.5-127.7-51.8-204.1-56.5L612.9 195l127.9 36.9c11.5 32.6 42.6 56.1 79.2 56.1 46.4 0 84-37.6 84-84s-37.6-84-84-84c-32 0-59.8 17.9-74 44.2L603.5 123a33.2 33.2 0 0 0-39.6 18.4l-90.8 203.9c-74.5 5.2-142.9 25.4-199.2 56.2A111.94 111.94 0 0 0 176 344c-61.9 0-112 50.1-112 112 0 45.8 27.5 85.1 66.8 102.5-7.1 21-10.8 43-10.8 65.5 0 154.6 175.5 280 392 280s392-125.4 392-280c0-22.6-3.8-44.5-10.8-65.5C932.5 541.1 960 501.8 960 456zM820 172.5a31.5 31.5 0 1 1 0 63 31.5 31.5 0 0 1 0-63zM120 456c0-30.9 25.1-56 56-56a56 56 0 0 1 50.6 32.1c-29.3 22.2-53.5 47.8-71.5 75.9a56.23 56.23 0 0 1-35.1-52zm392 381.5c-179.8 0-325.5-95.6-325.5-213.5S332.2 410.5 512 410.5 837.5 506.1 837.5 624 691.8 837.5 512 837.5zM868.8 508c-17.9-28.1-42.2-53.7-71.5-75.9 9-18.9 28.3-32.1 50.6-32.1 30.9 0 56 25.1 56 56 .1 23.5-14.5 43.7-35.1 52zM624 568a56 56 0 1 0 112 0 56 56 0 1 0-112 0z"/></svg>'
    }
  }
}

function isEmpty(obj) {
  for(var i in obj){
    return false;
  }
  return true;
}