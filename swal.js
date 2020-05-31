togle = false,side = false
$(document).ready(function(){
$('.sidebar-toggle').on('click', function(){
  if(togle) {togle = false;$('body').removeClass(' skin-blue sidebar-mini').addClass(' skin-blue sidebar-mini sidebar-open')}
  else{togle = true;$('body').removeClass(' skin-blue sidebar-mini sidebar-open').addClass(' skin-blue sidebar-mini')}
})
$('#sidebarmenu').on('click', function(){
    if(side){
        side = false; $('#sidebarmenu2').removeClass('dropdown user user-menu').addClass('dropdown user user-menu open')
    }else{
        side  = true; $('#sidebarmenu2').removeClass('dropdown user user-menu open').addClass('dropdown user user-menu')
    }
})
  load_account()
  load_account_active()
  $('#add_token').on('click', add)
  $('#signout').on('click', function(){
    ar = ['list','form','cek']
    for(mf in ar) deleteCookie(ar[mf])
    setCookier('api_token','',-1)})
  $('input[type="text"').change(function(){
  var zz = ['duration','stake','multiplier','max_marti','max_compound','target_profit','stop_loss','barrir']
  if(zz.indexOf(this.id) != -1){
    abn = Number(this.value)
    if(isNaN(abn)) {alert('Silakan Isi dengan nomor')
      abv = zz.indexOf(this.id)
      abf = [5,0.5,2.15,7,0,20,50,0.70][abv]
      $('#'+this.id).val(abf)
}
}
})
$('#start').on('click', saveCookie)
//setTimeout(loadCookie, 3000)
})
_a = -1, ht = ''
cookie_array = []
load_account = function(){
_a++
api_token = takeCookie('api_token').split(',')
if(api_token == '') window.location.replace('/login')
cookie_array[_a] = api_token[_a]
api_tokens = api_token[_a]
wx = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=20701')
wx.onopen = function(){
  this.send(JSON.stringify({authorize: api_tokens}))
}
wx.onmessage = function(msg){
  data = JSON.parse(msg.data)
  if(data.authorize){
    dt = data.authorize
    list = 'list'
    ht = '<li><a href="javascript:set('+_a+');" style="color: black">'+dt.loginid+' <span class="pull-right badge bg-'+(['red','blue','green','aqua'][Math.floor(Math.random()*4)])+'">$ '+dt.balance+'</span></a></li>'
    $('#account_list').append(ht)
    if(_a < api_token.length - 1) {
    load_account();} else {
    setCookie('api_token',cookie_array,5);
}
}
}
}
function add(){
  tokens = $('#add_token_input').val()
  wsx = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=20701')
  wsx.onopen = function(){
    this.send(JSON.stringify({authorize: tokens}))
  }
  wsx.onmessage = function(msg){
    data = JSON.parse(msg.data)
    if(data.authorize){
      _a++
      cookie_array[_a] = tokens
      ht = '<li><a href="javascript:set('+_a+');" style="color: black">'+dt.loginid+' <span class="pull-right badge bg-'+(['red','blue','green','aqua'][Math.floor(Math.random()*4)])+'">$ '+dt.balance+'</span></a></li>'
      $('#account_list').append(ht)
      setCookie('api_token',cookie_array,5)
      setCookier('list',_a,5)
    }else{
      alert('Token Tidak Terdaftar !!')
}
}
}
load_account_active = function(){
  list = takeCookie('list') == '' ? 0:Number(takeCookie('list'))
  setCookie('list',list,5)
  api_token_active = takeCookie('api_token').split(',')[list]
  log_in(api_token_active)
}
deleteCookie = function(cname){
  setCookie(cname,'',-1)
}
function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function takeCookie(cname) {
 var name = cname + "=";
 var decodedCookie = decodeURIComponent(document.cookie);
 var ca = decodedCookie.split(';');
 for(var i = 0; i < ca.length; i++) {
     var c = ca[i];
     while (c.charAt(0) == ' ')
         c = c.substring(1);
     if (c.indexOf(name) == 0)
         return c.substring(name.length, c.length);
}
return "";
}
  arrag = 'market,file,duration,type_duration,stake,multiplier,max_marti,max_compound,target_profit,stop_loss,barrir,metode,tokenvirtual,tokencopytrade,'
  arrag += 'moder,periodepivot,support,e_support,resistance,e_resistance,countsignal,signalmode,modetickpicker,tickpickerexecution,p1,pattern1,p2,pattern2,w1,worm1,w2,worm2,periode,poin,modepoin'
  arr = arrag.split(',')
  ind = 'tickreader,pivotpoin,tickpicker,tickpattern,tickworm,tickpoin'.split(',')
saveCookie = function(){
  sv = [0], sg = [0];
  for(gx in arr) sv[gx] = $('#'+arr[gx]).val()
    setCookie('form',sv,5)
  for(gm in ind) sg[gm] = $('#'+ind[gm]).is(':checked')
    setCookie('cek',sg,5)
}
loadCookie = function(){
  sv = [0], sg = [0];
  sx = takeCookie('form').split(',')
  sb = takeCookie('cek').split(',')
  if(sx[0] != '' && sb[0] != ''){
  for(gx in arr) $('#'+arr[gx]).val(sx[gx])
  //for(gm in ind) $('#'+ind[gm]).attr('checked',sb[gm])
}}
