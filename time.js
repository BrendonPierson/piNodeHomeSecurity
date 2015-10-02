var timeModule = function(){

  console.log('Current Time: '+ offsetDate.toString());

  return {
    date: function() {
      var date = new Date().getTime();
      var offsetDate = new Date(date - (5 * 60 * 60 * 1000)); 
      return offsetDate.toString();
    },
    localTime: function(){
      var date = new Date().getTime();
      var offsetDate = new Date(date - (5 * 60 * 60 * 1000)); 
      return offsetDate.toLocaleTimeString();
    },
    dateInt: function() {
      var date = new Date().getTime();
      var offsetDate = new Date(date - (5 * 60 * 60 * 1000)); 
      return offsetDate.getTime();
    }
  }
}
   
  


module.exports = timeModule();