// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/


$(document).ready(function(){
  $('textarea[name="comments"]').keyup(function(){
    el = $(this);
    if(el.val().length < 5){
      $('#reply-post').addClass('disabled');
    } else {
      $('#reply-post').removeClass('disabled');
    }
  });

});
