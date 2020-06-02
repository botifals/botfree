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
 
