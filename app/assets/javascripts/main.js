$(document).ready(function(){

  console.log("all good");

  Webcam.set({
  		width: 640,
  		height: 480,
  		dest_width: 640,
  		dest_height: 480,
  		image_format: 'jpeg',
  		jpeg_quality: 90,
  		force_flash: false,
  		flip_horiz: true,
      // unfreeze_snap: false,
  		fps: 45
  	});


  Webcam.attach( '#my_camera' );


  function take_snapshot() {
		Webcam.snap( function(data_uri) {
			document.getElementById('my_result').innerHTML = '<img src="'+data_uri+'"/>';
		});
	};

  function take_sanp_canvas(){
    Webcam.snap( function(){


    }, $('#my_canvas'))
  };

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
    take_snapshot();
    // take_sanp_canvas();

    $('#pre_take_buttons').show();
    $('#post_take_buttons').hide();
  });


});
