
$(document).ready(function(){
  if( $('body.posts.show').length ){

    console.log("We're on posts#show page(posts/:id)");


    $('#imgur').on('click', function(){
      uploadToImgur();
    });

    var uploadToImgur = function(){
      var clientId = 'e15352c89240bec';
      var imgURL = $('.ui.centered.rounded.image').attr('src');

      $.ajax({
        url: 'https://api.imgur.com/3/image',
        method: 'POST',
        headers: {
          Authorization: 'Client-ID ' + clientId,
          Accept: 'application/json'
        },
        data: {
          image: imgURL,
          type: 'url',
          description: 'Hope you had fun with pikQ'
        },
        success: function (result) {
          var id = result.data.id;
          var url = 'https://imgur.com/' + id;
          $('.ui.tiny.modal img').attr('src', url).css('width','50px');
          $('.ui.tiny.modal a').attr('href', url).text(url);
          $('.ui.tiny.modal').modal('show')
        },
        error: function (xhr, status, err) {
          showError('Upload failed! Error: "' + message + '".');
        }
      });
    };

    $('.ui.tiny.modal').modal();
    $('.ui.tiny.modal button').on('click', function(){
      $('.ui.tiny.modal').modal('hide');
    })

  }

})
