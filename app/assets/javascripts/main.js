var canvas;
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

     canvas = this.__canvas = new fabric.Canvas('my_canvas', {
      width: 640,
      height: 480,
      // isDrawingMode: true
    });

    // define a function to save the sanpshot onto a canvas we placed on html page
    function take_snap_canvas(){
      Webcam.snap( function(data_uri){

        canvas.setBackgroundImage(data_uri, canvas.renderAll.bind(canvas));
      });
      console.log('filters:', filters);

      // loop over settings in CSS filters object

      canvas.backgroundImage.filters.push( new fabric.Image.filters.Grayscale(100) );

      // after looping over all the filtera and pushing them onto canvas.backgroundImage.filters
      // if (!filters) {
      //   return;
      // }else{
        canvas.backgroundImage.applyFilters(function(){
          canvas.renderAll();
        });
      // }

    }

        // canvas.renderAll.bind(canvas);


// ==============filters functions  - ryan ============

  var unselectedClass = 'basic';

  var filters = {};

  var applyFilters = function(filters, id) {
    var $elem = $(id);
    var filter_val = '';
    for(var key in filters){
      var val = filters[key];
      console.log(key +" filter's value "+val );//Q3 numbers?
      filter_val += key + '(' + val + ') ';
//
    }
    // var filter_vals =filter_val;// try to save the value in to the memory?
    console.log(filter_val);
    $elem.css('filter', filter_val);
  }

  var resetFilters = function(){
    var clickedbuttons= $('.filters_buttons').children().not('.basic');
    //pass between dom element and jquery element? 2 filter_val  call beyound the function?
    console.log(clickedbuttons);
    if (!clickedbuttons.length) {
      return;
    }else {
      for (var i = 0; i < clickedbuttons.length; i++) {
          $(clickedbuttons[i]).addClass('basic');
      }
    }
    $( '#my_camera' ).css('filter', '');
    var filters = {};
  };


  var hideFilters = function () {
    $('#filters_button').show();
    $('.filters_buttons').hide();
  };

  // ==============filters buttons  - ryan ============

  $('#filters_button button').on('click', function(){
    // display filters_button
    // swap button sets
    $('#filters_button').hide();
    $('.filters_buttons').show();
  });

  $('#Reset').on('click', function(){
    resetFilters();

  });

  $('#Blur').on('click', function(){
    $(this).toggleClass(unselectedClass);
    if( $(this).hasClass(unselectedClass) ){
      filters.blur ='0';
    } else {
      filters.blur = "3px";  // {css: '3px', fabric: '100'}
    }
    applyFilters(filters, "#my_camera");
  });


  $('#BnW').on('click', function(){
    $(this).toggleClass(unselectedClass);
    if( $(this).hasClass(unselectedClass) ){
      filters.grayscale = '0%';
    } else {
      filters.grayscale = "100%";
    }
    applyFilters(filters, "#my_camera");
  });

  $('#Bright').on('click', function(){
    $(this).toggleClass(unselectedClass);
    if( $(this).hasClass(unselectedClass) ){
      filters.brightness = '100%';
    } else {
      filters.brightness = "300%";
    }
    applyFilters(filters, "#my_camera");
  });

  $('#Hue').on('click', function(){
    $(this).toggleClass(unselectedClass);
    if( $(this).hasClass(unselectedClass) ){
      filters["hue-rotate"] = '0deg';
    } else {
      filters["hue-rotate"] = "180deg";
    }
    applyFilters(filters, "#my_camera");
  });


  $('#Saturate').on('click', function(){
    $(this).toggleClass(unselectedClass);
    if( $(this).hasClass(unselectedClass) ){
      filters.saturate = '100%';
    } else {
      filters.saturate = "500%";
    }
    applyFilters(filters, "#my_camera");
  });

  $('#Sepia').on('click', function(){
    $(this).toggleClass(unselectedClass);
    if( $(this).hasClass(unselectedClass) ){
      filters.sepia = '0%';
    } else {
      filters.sepia = "400%";
    }
    applyFilters(filters, "#my_camera");
  });


  $('#Contrast').on('click', function(){
    $(this).toggleClass(unselectedClass);
    if( $(this).hasClass(unselectedClass) ){
      filters.contrast = '100%';
    } else {
      filters.contrast = "400%";
    }
    applyFilters(filters, "#my_camera");
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
      resetFilters();
      hideFilters();

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
    $("#backToCamera").on("click",function(){
      $('#webcamjs').show();
      Webcam.attach( '#my_camera' );
      $('#editor_ui').hide();
      resetFilters();
      hideFilters();
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


    // clears the stickers, drawings & texts off upon clicking
    $('#clear').on('click', function(){
      // canvas.remove( canvas.getActiveObject() );
      canvas.forEachObject(function(obj){
        canvas.remove(obj);
      });
      // var objects = canvas._objects;
      // for (var i = 0; i < objects.length; i++) {
      //   canvas.remove( objects[i] );
      // }
    });

    // brings back the webcam
    $('#camera').on('click', function(){
      Webcam.attach( '#my_camera' );
      $('#webcamjs').show();
      $('#pre_take_buttons').show();
      $('#post_take_buttons').hide();
      $('#editor_ui').hide();
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
