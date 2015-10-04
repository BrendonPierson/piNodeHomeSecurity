app.controller("TempGraphCtrl", 
  ["$scope", 
  "Auth",
  "$firebaseObject", 
  "$firebaseArray", 
  function($scope, Auth, $firebaseObject, $firebaseArray) {
  
  var ref = new Firebase("https://securepenning.firebaseio.com/conditionsLog");

  $scope.options = {};

  $scope.data = $firebaseArray(ref);

  $scope.data.$loaded().then(function(){
    $scope.data.forEach(function(row) {
      row.x = new Date(row.x + (5 * 60 * 60 * 1000));
    });
    console.log("condisitons data", $scope.data);
    $scope.options = {
      axes: {
        x: {type: 'date', key: '$id'},
        y: {type: 'linear', min: 0, max: 120, ticks: 5, innerTicks: true, grid: true},
        y2: {type: 'linear', min: 0, max: 100, ticks: 5}
      },
      margin: {
        left: 100
      },
      series: [
        {y: 'insideTemp', color: 'steelblue', thickness: '2px', label: 'Inside Temp'},
        {y: 'outsideTemp', color: 'black', thickness: '2px', label: 'Outside Temp'},
        {y: 'humidity', axis: 'y2', color: 'lightsteelblue', drawDots: true, dotSize: 2, label: 'Outside Humidity'}
      ],
      lineMode: 'linear',
      tension: 0.7,
      tooltip: {mode: 'scrubber', formatter: function(x, y, series) {return 'pouet';}},
      drawLegend: true,
      drawDots: true,
      hideOverflow: false,
      columnsHGap: 5
    }

  });
// $scope.data = [
//   {x: 0, value: 4, otherValue: 14},
//   {x: 1, value: 8, otherValue: 1},
//   {x: 2, value: 15, otherValue: 11},
//   {x: 3, value: 16, otherValue: 147},
//   {x: 4, value: 23, otherValue: 87},
//   {x: 5, value: 42, otherValue: 45}
// ];



  

}]);