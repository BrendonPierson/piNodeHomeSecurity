// Module provides functions for various date formats
var timeModule = function(){
  return {
    date: function() {
      var date = new Date().getTime();
      var offsetDate = new Date(date - (5 * 60 * 60 * 1000)); 
      return offsetDate.toString();
    },
    realDate: function() {
      return new Date().getTime();
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