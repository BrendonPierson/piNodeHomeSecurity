requirejs.config({
  baseUrl: './scripts',
  paths: {
    "jquery": "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js",
    'firebase': '../../bower_components/firebase/firebase',
    'hbs': '../../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../../bower_components/bootstrap/dist/js/bootstrap.min'
  },
  shim: {
    'bootstrap': ['jquery'],
    'firebase': {
      exports: 'Firebase'
    }
  }
});
requirejs(
  ["jquery", "firebase", "hbs", "bootstrap"], 
  function($, _firebase, Handlebars, bootstrap) {

    var fbRef = new Firebase('https://securepenning.firebaseio.com/');

    function statusUpdate(data) {
      //populate songs div 
      require(['hbs!../../templates/status'],function(statusTemplate){
        $("#status").html(statusTemplate(data));
      });
    }



  fbRef.on("value", function(snapshot) {
    //every time the database changes this event fires //
    var data = snapshot.val(); 
    statusUpdate(data);
  });

  $('#armedhome').on('click', function() {
    //when button is clicked get request is made to 
    // /armedhere which should trigger watch function on 
    // the reed switches with no alarm delay
    $('#armedhome').text('Arming, no Delay');
    $.get('http://192.168.8.12:4730/armedNoDelay', function(data) {
      $(this).text('Armed No Delay');
    });
  });

  $('#armedaway').on('click', function() {
    //when button is clicked get request is made to 
    // /armedhere which should trigger watch function on 
    // the reed switches with no alarm delay
    $('#armedaway').text('Arming, With Delay');
    $.get('http://192.168.8.12:4730/armedWithDelay', function(data) {
      $(this).text('Armed With Delay');
    });
  });


  $("#disarm").on('click', function(){
    $.get('http://192.168.8.12:4730/disarm', function(data) {
      $(this).text('Disarmed');
    });
  })
};
