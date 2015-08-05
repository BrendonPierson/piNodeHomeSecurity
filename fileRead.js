var fs = require('fs');

var fileRead = function(file){

  fs.readFileSync(file,{encoding: "utf-8"}, function (err, logData) {
    
    
  // If an error occurred, throwing it will
    // display the exception and end our app.
    if (err) throw err;
    
  // logData is a Buffer, convert to string.
    var text = logData.toString();
  });
};

var content = fileRead('index.html');
console.log(content);

// var fs = require('fs');

// // Read the contents of the file into memory.
// fs.readFile('index.html', function (err, logData) {
  
// // If an error occurred, throwing it will
//   // display the exception and end our app.
//   if (err) throw err;
  
// // logData is a Buffer, convert to string.
//   var text = logData.toString();
//   console.log(text);
// });
