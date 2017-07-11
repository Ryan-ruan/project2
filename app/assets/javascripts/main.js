

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
  // var imgElement = $('#my-image');
  // var imgInstance = new fabric.Image(imgElement, {
  //   left: 100,
  //   top: 100,
  //   angle: 30,
  //   opacity: 0.85
  // });
  // canvas.add(imgInstance);
  fabric.Image.fromURL('asset2.png', function(oImg) {
    canvas.add(oImg);
  });
  // var imgElement = $('#my-image');
  // var imgInstance = new fabric.Image(imgElement, {
  //   left: 100,
  //   top: 100,
  //   angle: 30,
  //   opacity: 0.85
  // });
  // canvas.add(imgInstance);
  // fabric.Image.fromURL('http://i.imgur.com/uBO2Not.png', function(oImg) {
  //   canvas.add(oImg);
  // });
  // canvas.setHeight(480);
  // canvas.setWidth(640);

  // define a function to save the sanpshot onto a canvas we placed on html page
  function take_snap_canvas(){
    Webcam.snap( function(data_uri){

      canvas.setBackgroundImage(data_uri, canvas.renderAll.bind(canvas));

      // canvas.renderAll.bind(canvas);

      console.log('canvas', canvas);
      console.log('URI', data_uri.substr(0, 50));
      console.log('---------------------------');
    });
  };


  // buttons for take snapshot, cancel pic preview and save the pic

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
  $('.menu .item').tab()

  // functions buttons
  $("#Camera").on("click",function(){
    $('#webcamjs').show();
    Webcam.attach( '#my_camera' );
    $('#editor_ui').hide();
    });


  // ---------- sticker tab - unicar -------------
  $('#sticker1').on('click', function() {
    fabric.Image.fromURL('http://i.imgur.com/OmwdQK3.png', function(oImg) {
      canvas.add(oImg);
    });

    canvas.add(imgInstance);
  });

  // ------------ text tab -- Lingxiao ------------
  // set font color and size
  var fillColour = $('#font-colour').val();
  var fontSize = $('#font-size').val();

  $('#font-colour').on('change', function(){
    fillColour = $(this).val();
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

  $('#brush').on('click', function() {
    // var canvas = this.__canvas = new fabric.Canvas('my_canvas', {
      canvas.isDrawingMode = true;
      // Use Pencil Brush for drawing
      canvas.freeDrawingBrush = new fabric['PencilBrush'](canvas);
      canvas.freeDrawingBrush.width = 10;
      canvas.freeDrawingBrush.color = 'black';
    });


  }

}); // end of document ready
