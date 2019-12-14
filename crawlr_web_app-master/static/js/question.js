var infinite = new Waypoint.Infinite({
  element: $('.infinite-container')[0],
  onBeforePageLoad: function() {
    $('.loading').show();
  },
  onAfterPageLoad: function($items) {
    $('.loading').hide();
  }
});

function postQuestion() {
  var $ques = $('#add_question');
  $.ajax({
    type: "POST",
    url: $ques.data('url'),
    data: {
      'question': $ques.val(),
      'csrfmiddlewaretoken': $ques.data('csrf'),
    },
    success: function(res) {
      responce = JSON.parse(res)
      if (responce.status == 200) {
        $('#mesaage').css('display', 'block');
        $('#mesaage').addClass('alert-info');
        $('#mesaage').html('your question successfully submited !');
      } else {
        $('#mesaage').css('display', 'block');
        $('#mesaage').addClass('alert-danger');
        $('#mesaage').html('Something went wrong please try again later');
      }
      location.reload(true);
    }
  });
  $('#closepopque').click()
}

function postReply() {
  $('#replyload').html('<div style="text-align:center"><lottie-player src="https://assets3.lottiefiles.com/datafiles/fPx4vaZrul2Fvg9/data.json" mode="normal" speed="1" style="width:100px; height: 100px;" hover loop autoplay></lottie-player></div>')
  var $ques = $('#reply_text');
  $.ajax({
    type: "POST",
    url: $ques.data('url'),
    data: {
      'questionid':$('#questionid').val(),
      'reply': $ques.val(),
      'csrfmiddlewaretoken': $ques.data('csrf'),
    },
    success: function(res) {
      responce = JSON.parse(res)
      if (responce.status == 200) {
        $('#mesaage').css('display', 'block');
        $('#mesaage').addClass('alert-info');
        $('#mesaage').html('your reply successfully submited !');
      } else {
        $('#mesaage').css('display', 'block');
        $('#mesaage').addClass('alert-danger');
        $('#mesaage').html('Something went wrong please try again later');
      }
      location.reload(true);
    }
  });
}

$(document).ready(function() {
  $(document).on('click', '.delete-reply', function(event) {
    $('#replyload').html('<div style="text-align:center"><lottie-player src="https://assets3.lottiefiles.com/datafiles/fPx4vaZrul2Fvg9/data.json" mode="normal" speed="1" style="width:100px; height: 100px;" hover loop autoplay></lottie-player></div>')
    event.preventDefault();
    var id = $(this).data('reply');
    var $data = $('#reply_delete_url');
    $.ajax({
      url: $data.val(),
      type: "POST",
      data: {
        'csrfmiddlewaretoken' : $data.data('csrf'),
        'question' : $('#questionid').val(),
        'id' : id
      },
      success: function(data){
        responce = JSON.parse(data);
        if (responce.status == 200) {
          $('#mesaage').css('display', 'block');
          $('#mesaage').addClass('alert-info');
          $('#mesaage').html('your reply successfully deleted !');
        } else {
          $('#mesaage').css('display', 'block');
          $('#mesaage').addClass('alert-danger');
          $('#mesaage').html('Something went wrong please try again later');
        }
        location.reload(true);
      }
    });
  });
  
  $(document).on('click', '.verify-reply', function(event) {
    event.preventDefault();
    $('#replyload').html('<div style="text-align:center"><lottie-player src="https://assets3.lottiefiles.com/datafiles/fPx4vaZrul2Fvg9/data.json" mode="normal" speed="1" style="width:100px; height: 100px;" hover loop autoplay></lottie-player></div>')
    var id = $(this).data('reply');
    var $data = $('#reply_verify_url');
    $.ajax({
      url: $data.val(),
      type: "POST",
      data: {
        'csrfmiddlewaretoken' : $data.data('csrf'),
        'question' : $('#questionid').val(),
        'id' : id
      },
      success: function(data){
        responce = JSON.parse(data);
        if (responce.status == 200) {
          $('#mesaage').css('display', 'block');
          $('#mesaage').addClass('alert-info');
          $('#mesaage').html('your reply successfully verified !');
        } else {
          $('#mesaage').css('display', 'block');
          $('#mesaage').addClass('alert-danger');
          $('#mesaage').html('Something went wrong please try again later');
        }
        location.reload(true);
      }
    });
  });
});
