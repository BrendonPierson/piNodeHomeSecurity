$('button').on('click', function() {
  //when button is clicked get request is made to 
  // /armedhere which should trigger watch function on 
  // the reed switches with no alarm delay
  $('#armedhome').text('Arming, no Delay');
  $.get('http://192.168.8.100/armedhere', function(data) {
    $('button').text('Armed No Delay');
  });
});


// need to create data persistence for armed state