var timeModule = function(){
  var date = new Date().getTime();
  var offsetDate = new Date(date - (5 * 60 * 60 * 1000)); 

  console.log('Current Time: '+ offsetDate.toString());

  return {
    date: function() {
      return offsetDate.toString();
    },
    localTime: function(){
      return offsetDate.toLocaleTimeString();
    }
  }
}
   
  


module.exports = timeModule();