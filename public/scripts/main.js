$('#armedhome').on('click', function() {
  //when button is clicked get request is made to 
  // /armedhere which should trigger watch function on 
  // the reed switches with no alarm delay
  $('#armedhome').text('Arming, no Delay');
  $.get('http://localhost:4730/armedNoDelay', function(data) {
    $(this).text('Armed No Delay');
  });
});

$('#armedaway').on('click', function() {
  //when button is clicked get request is made to 
  // /armedhere which should trigger watch function on 
  // the reed switches with no alarm delay
  $('#armedaway').text('Arming, With Delay');
  $.get('http://localhost:4730/armedWithDelay', function(data) {
    $(this).text('Armed With Delay');
  });
});


$("#disarm").on('click', function(){
  $.get('http://localhost:4730/disarm', function(data) {
    $(this).text('Disarmed');
  });
})
// need to create data persistence for armed state