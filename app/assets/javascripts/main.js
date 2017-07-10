$(document).ready(function(){
  console.log("all good");

  // initialize the canvas, get the context as '2d'
  var $canvas = $('#my_canvas');
  var myContext = $canvas[0].getContext('2d');

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

  // define a function to save the sanpshot onto a canvas we placed on html page
  function take_snap_canvas(){
    Webcam.snap( function(data_uri, canvas, context){
      myContext.drawImage( canvas, 0, 0 );


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
  });


  // ==========================


  var canvas = this.__canvas = new fabric.Canvas('my_canvas', {
    isDrawingMode: true
  });


  $('#pencil').on('click', function() {
    canvas.freeDrawingBrush = new fabric[this.value + 'Brush'](canvas);
  });


}); // end of document ready
