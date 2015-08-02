$('button').on('click', function() {
  //when button is clicked get request is made to 
  // /armedhere which should trigger watch function on 
  // the reed switches with no alarm delay
  $('#armedhome').text('Arming, no Delay');
  $.get('http://localhost:8088/trigger', function(data) {
    $('button').text('Armed No Delay');
  });
});


// need to create data persistence for armed state