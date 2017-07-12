$(document).ready(function(){
  console.log("all good");


  if( $('body.posts.new').length ){

    // initialize the canvas, get the context as '2d'
    // var $canvas = $('#my_canvas');
    // var myContext = $canvas[0].getContext('2d');

    // set up the camera.
    Webcam.set({
    		width: 640,
    		height: 480,
    		dest_width: 640,
    		dest_height: 480,
    		image_format: 'jpeg',
    		jpeg_quality: 90,
    		force_flash: false,
    		flip_horiz: true,
    		fps: 45
    	});

    // attach the camera(live preview) onto a div '#my_camera'
    Webcam.attach( '#my_camera' );

    var canvas = this.__canvas = new fabric.Canvas('my_canvas', {
      width: 640,
      height: 480,
      // isDrawingMode: true
    });

    // define a function to save the sanpshot onto a canvas we placed on html page
    function take_snap_canvas(){
      Webcam.snap( function(data_uri){

        canvas.setBackgroundImage(data_uri, canvas.renderAll.bind(canvas));
      });
    }

        // canvas.renderAll.bind(canvas);

  var selectedClass = 'basic';

  var filters = {};

  var applyFilters = function (filters, id) {
    var $elem = $(id);
    for(var key in filters){
      var val = filters[key];
      var css_val = '';
      if(val.length){
        var css_val = key + '(' + val + ')';
      }
      $elem.css('filter', css_val);
    }
  }






  $('#filters_button button').on('click', function(){
    // display filters_button

    // swap button sets
    $('#filters_button').hide();
    $('.filters_buttons').show();
  });

  $('#Reset').on('click', function(){
  });

  $('#Blur').on('click', function(){
    $(this).toggleClass(selectedClass);

    if( $(this).hasClass(selectedClass) ){
      console.log('off');
      $("#my_camera").css("filter", "");
      filters.blur = '';
    } else {
      console.log('on');
      $("#my_camera").css("filter", "blur(3px)");
      filters.blur = "3px";
    }
    applyFilters(filters, "#my_camera");

  });


  $('#BnW').on('click', function(){

    $(this).toggleClass(selectedClass);

    if( $(this).hasClass(selectedClass) ){
      console.log('off');
      $("#my_camera").css("filter", "");
      filters.grayscale = '';
    } else {
      console.log('on');
      $("#my_camera").css("filter", "grayscale(100%)");
      filters.grayscale = "100%";
    }
    applyFilters(filters, "#my_camera");
  });
  //
  // $('#Bright').on('click', function(){
  //
  //       $(this).toggleClass(selectedClass);
  //
  //       if( $(this).hasClass(selectedClass) ){
  //         console.log('off');
  //         $("#my_camera").css("filter", "");
  //         filters.brightness = '';
  //       } else {
  //         console.log('on');
  //         $("#my_camera").css("filter", "brightness(300%)");
  //         filters.brightness = "300%";
  //       }
  //       applyFilters(filters, "#my_camera");
  // });

//   $('#Hue').on('click', function(){
//     $(this).toggleClass(selectedClass);
//
//     if( $(this).hasClass(selectedClass) ){
//       console.log('off');
//       $("#my_camera").css("filter", "");
//       filters.hue = '';
//     } else {
//       console.log('on');
//       $("#my_camera").css("filter", "hue-rotate(90deg)");
//       filters.hue = "300%";
//     }
//     applyFilters(filters, "#my_camera");
// });

  // });
  $('#Invent').on('click', function(){
    $("#my_camera").css({"filter":"grayscale(100%)"});

  });

  $('#Sepia').on('click', function(){
    $("#my_camera").css({"filter":"grayscale(100%)"});

  })

  $('#Contrast').on('click', function(){
    $("#my_camera").css({"filter":"grayscale(100%)"});

  });








    $('#pre_take_buttons button').on('click', function(){
      // freeze camera so user can preview pic
  		Webcam.freeze();

      // swap button sets
      $('#pre_take_buttons').hide();
      $('#post_take_buttons').show();
    });

    $('#cancel').on('click', function() {
      // cancel preview freeze and return to live camera feed
  		Webcam.unfreeze();

  		// swap buttons back
      $('#pre_take_buttons').show();
      $('#post_take_buttons').hide();
    });


    $('#save').on('click',function() {
      // take_snapshot();
      take_snap_canvas();

      $('#pre_take_buttons').show();
      $('#post_take_buttons').hide();
      $('#webcamjs').hide();
      Webcam.reset();
      $('#editor_ui').show();
    });


    // switch between tabs
    $('.menu .item').tab();

    // ==============functions buttons - BACK TO CAMERA - ryan ============
    $("#Camera").on("click",function(){
      $('#webcamjs').show();
      Webcam.attach( '#my_camera' );
      $('#editor_ui').hide();
      });





    // ======== sticker tab - unicar ========
    $('.ui.image').on('click', function() {
      var url = $(this).attr('src');
      fabric.Image.fromURL(url, function(oImg) {
        oImg.scale(0.5);
        canvas.add(oImg);
      }, { crossOrigin: 'Anonymous' });

    });




    // ------------ text tab -- Lingxiao ------------
    // set font color and size
    var fontColor = $('#font-color').val();
    var fontSize = parseInt( $('#font-size').val() );

    $('#font-color').on('change', function(){
      fontColor = $(this).val();
    });

    $('#font-size').on('change', function(){
      fontSize = $(this).val();
      $('#size-info').text(fontSize);
    });

    $('#add-text').on('click', function(){
      var text = new fabric.IText('Type text here', {
        width: 300,
        top: 240,
        left: 80,
        fontSize: fontSize,
        textAlign: 'center',
        fixedWidth: 150,
        fill: fontColor,
        fontFamily: 'Avenir'
      });

      canvas.add(text);
    });




    // -------- brushes tab -- jonathan ----------
    // set line width
    $('#drawing-line-width').on('change', function(){
      canvas.freeDrawingBrush.width = parseInt(this.value, 10) || 1;
      $('#width-info').text(this.value);
    })

    // set line color
    $('#drawing-line-color').on('change', function(){
      canvas.freeDrawingBrush.color = this.value;


      $('#color-info').text(this.value);

    })

    // activate the brush (drawing mode is true)
    $('#brush').on('click', function() {

      canvas.isDrawingMode = true;
      // Use Pencil Brush for drawing
      canvas.freeDrawingBrush = new fabric['PencilBrush'](canvas);
      canvas.freeDrawingBrush.width = 10;
      canvas.freeDrawingBrush.color = '#005E7A';
    });

    // disable the brush (drawing mode is false)
    $('.menu a.item').on('click', function(){
      canvas.isDrawingMode = false;
      if ( $('#brush').hasClass('active') ){
        canvas.isDrawingMode = true;
      }

    });

    //======================Save to computer ==========================

    $('#download').click(function() {
      window.location = canvas.toDataURL("image/png");
    }); // save the image to computer

    //======================Upload to gallery ==========================


    $('#new_post').submit(function () {

      var dataurl = canvas.toDataURL('image/png');
      $('#image').val( dataurl );

      console.log('GOT HERE');

    });



  } // main.js will only execute on posts/new page

}); // end of document ready
