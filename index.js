$('.tooltip').hide();
$('.form-input').focus(function () {
  $('.tooltip').fadeOut(250);
  $("." + $(this).attr('tooltip-class')).fadeIn(500);
});

$('.form-input').blur(function () {
  $('.tooltip').fadeOut(250);
});

$('.login-button').click(function (event) {
  event.preventDefault();
  // or use return false;
});

$(".login-button").click(function () {

  if ($('.login-form').css("transform") == 'none' && $('#token').val() != '') {
    $('.login-form').css("transform", "rotateY(-180deg)");
    $('.loading').css("transform", "rotateY(0deg)");
    var delay = 600;
    setTimeout(function () {
      $('.loading-spinner-large').css("display", "block");
      $('.loading-spinner-small').css("display", "block");
    }, delay);
  } else {
    $('.login-form').css("transform", "");
  }
});
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
$('#login').on('click', function () {
  token = document.getElementById('token').value
  if (token !== '') {
    var loading = $.toast({ heading: 'Connecting...', position: 'top-right', });
    ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=20701')
    ws.onopen = function () {
      this.send(JSON.stringify({ authorize: token }))
    }
    ws.onmessage = function (evt) {
      loading.reset();
      data = JSON.parse(evt.data)
      if (data.authorize) {
        setCookie('api_token', token, 1)
        $.toast({
          heading: 'Welcome.',
          text: 'Your account is connected',
          position: 'top-right',
          loader: false,
          icon: 'success',
          hideAfter: 2000,
          stack: 6
        });
        setTimeout(function () {
          host = window.location.host

          const params = new URLSearchParams(window.location.search)
          if (params.has('url'))
            window.location.replace(params.get('url'))
          else
            window.location.replace('/')


        }, 1000)
      } else {
        $.toast({
          heading: 'Error',
          text: 'Invalid Token, Please create new one and try again..',
          position: 'top-right',
          loader: false,
          icon: 'error',
          hideAfter: 2000,
          stack: 6
        });
        clear()
      }
    }
  } else {
    $.toast({
      heading: 'Warning.',
      text: 'Please enter valid token',
      position: 'top-right',
      loader: false,
      icon: 'warning',
      hideAfter: 3000,
      stack: 6
    });
  }
})
function clear() {
  $('.login-form').css("transform", "");
  $('.loading').css("transform", "");
  $('.loading-spinner-large').css("display", "");
  $('.loading-spinner-small').css("display", "");
}
