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

    // Need to set an ID for the video element for trackingjs
    $('video').attr('id', 'webcam_video');

    // var $testcanvas = $('<canvas id="track-canvas" width="640" height="480">');
    // $( '#my_camera' ).prepend($testcanvas);

    var trackCanvas = document.getElementById('track-canvas');
    console.log('canvas:', trackCanvas);
    var context = trackCanvas.getContext('2d');


    ///////////// start tracking code
    var img = document.createElement('img');
    img.src = '/assets/luke.png';
    console.log(img.src);



      var tracker = new tracking.ObjectTracker('face');
       tracker.setInitialScale(4);
       tracker.setStepSize(0.5);
       tracker.setEdgesDensity(0.1);
       tracking.track('#webcam_video', tracker, { camera: true });
       tracker.on('track', function(event) {
         context.clearRect(0, 0, trackCanvas.width, trackCanvas.height);
         event.data.forEach(function(rect) {
          //  context.strokeStyle = '#a64ceb';
          //  context.strokeRect(trackCanvas.width - rect.x - rect.width, rect.y, rect.width, rect.height);
          //  context.font = '11px Helvetica';
          //  context.fillStyle = "#fff";
          //  context.fillText('x: ' + (trackCanvas.width - rect.x - rect.width) + 'px', rect.x + rect.width + 5, rect.y + 11);
          //  context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);

          context.drawImage(img, trackCanvas.width - rect.x - rect.width - 10, rect.y, rect.width * 1.2, rect.height * 1.2);
         });
       });






    ////////////////////// end tracking code

    canvas = this.__canvas = new fabric.Canvas('my_canvas', {
      width: 640,
      height: 480,

    });

    // define a function to save the sanpshot onto a canvas we placed on html page
    function take_snap_canvas(){
      Webcam.snap( function(data_uri){
        canvas.setBackgroundImage(data_uri, canvas.renderAll.bind(canvas));
      });

      console.log(canvas.backgroundImage);
      applyFabricFilters();
      canvas.backgroundImage.applyFilters(canvas.renderAll.bind(canvas));

    }

    var applyFabricFilters = function(){
      if (filters.grayscale) {

        var filter = new fabric.Image.filters.Grayscale({
          grayscale: 500
        });

        canvas.backgroundImage.filters.push(filter);
        // canvas.backgroundImage.applyFilters(canvas.renderAll.bind(canvas));
      }

      if (filters.brightness) {

        var filter = new fabric.Image.filters.Brightness({
          brightness: 300
        });
        canvas.backgroundImage.filters.push(filter);
        // canvas.backgroundImage.applyFilters(canvas.renderAll.bind(canvas));
      }

      if (filters.saturate) {

        var filter = new fabric.Image.filters.Saturate({
          saturate: 300
        });
        canvas.backgroundImage.filters.push(filter);
        // canvas.backgroundImage.applyFilters(canvas.renderAll.bind(canvas));
      }

      if (filters.sepia) {

        var filter = new fabric.Image.filters.Sepia();
        canvas.backgroundImage.filters.push(filter);
        // canvas.backgroundImage.applyFilters(canvas.renderAll.bind(canvas));
      }

      if (filters.contrast) {

        var filter = new fabric.Image.filters.Contrast({
          contrast: 100
        });
        canvas.backgroundImage.filters.push(filter);
        // canvas.backgroundImage.applyFilters(canvas.renderAll.bind(canvas));
      }
    }


    var unselectedClass = 'basic';

    // filters object for translation
    var filters = {};


    // apply css Filters (live preview)
    var applyFilters = function (filters, id) {
      var $elem = $(id);
      var css_val = '';
      for(var key in filters){
        console.log(filters);
        var val = filters[key];
        if(val.length){
           css_val += key + '(' + val + ')';
        }
      }
        console.log(css_val);
      $elem.css('filter', css_val);
    }

    // var resetFilters = function(){
    //   $('.filters_buttons').children().addClass("basic");
    //   $('#my_camera').css('filter','');
    // };
    //
    // var hideFilters = function () {
    //   $('#filters_button').show();
    //   $('.filters_buttons').hide();
    // };
    //
    // // toggle filter options buttons
    // $('#filters_button button').on('click', function(){
    //   $('#filters_button').hide();
    //   $('.filters_buttons').show();
    // });

    // reset all the filters in preview
    $('#Reset').on('click', function(){
      resetFilters();
    });


    // click buttons to apply css filters in live preview

    // $('#Blur').on('click', function(){
    //   $(this).toggleClass(unselectedClass);
    //   if( $(this).hasClass(unselectedClass) ){
    //     filters.blur ='0';
    //   } else {
    //     filters.blur = "3px";  // {css: '3px', fabric: '100'}
    //   }
    //   applyFilters(filters, "#my_camera");
    // });
    //


    $('#myFilter').on('change', function(){
      var value = $(this).val();
      $('label').text(value);
      $(this).toggleClass(unselectedClass);
      console.log(this);
      if( $(this).hasClass(unselectedClass) ){
        filters.grayscale = '0%';
      } else {
        filters.grayscale = "100%";
      }
      console.log(filters);
      applyFilters(filters, "#my_camera");
    });

    // $('#BnW').on('click', function(){
    //   $(this).toggleClass(unselectedClass);
    //   console.log(this);
    //   if( $(this).hasClass(unselectedClass) ){
    //     filters.grayscale = '0%';
    //   } else {
    //     filters.grayscale = "100%";
    //   }
    //   console.log(filters);
    //   applyFilters(filters, "#my_camera");
    // });

    $('#Bright').on('click', function(){
      $(this).toggleClass(unselectedClass);
      if( $(this).hasClass(unselectedClass) ){
        filters.brightness = '100%';
      } else {
        filters.brightness = "300%";
      }
      applyFilters(filters, "#my_camera");
    });

    // $('#Hue').on('click', function(){
    //   $(this).toggleClass(unselectedClass);
    //   if( $(this).hasClass(unselectedClass) ){
    //     filters["hue-rotate"] = '0deg';
    //   } else {
    //     filters["hue-rotate"] = "180deg";
    //   }
    //   applyFilters(filters, "#my_camera");
    // });


    $('#Saturate').on('change', function(){
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









    // ======== buttons for camera view ============

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
      resetFilters();
      hideFilters();


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
      canvas.forEachObject(function(obj){
        canvas.remove(obj);
      });
      Webcam.attach( '#my_camera' );
      $('#webcamjs').show();
      $('#pre_take_buttons').show();
      $('#post_take_buttons').hide();
      $('#editor_ui').hide();
      resetFilters();
      hideFilters();
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

  // =================================================================
  // following code runs when on posts#show page (posts/:id), for like button



  if( $('body.posts.show').length ){

    console.log("We're on posts#show page(posts/:id)");








  } // will only execute on posts/new page



}); // end of document ready
