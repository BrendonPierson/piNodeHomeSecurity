app.controller("TempGraphCtrl", 
  ["$scope", 
  "Auth",
  "$firebaseObject", 
  "$firebaseArray", 
  function($scope, Auth, $firebaseObject, $firebaseArray) {
  
  // var ref = new Firebase("https://securepenning.firebaseio.com/");

  // ref.on('value',function(snapshot){
  //   var rawData = snapshot.val();
  //   var outsideLog = rawData.outsideLog;
  //   var insideLog = rawData.tempLog;
  //   var data = [];

  //   for (var key in outsideLog) {
  //     data[data.length] = {
  //       x: outsideLog[key].time,
  //       y: 
  //     }
  //   };

  // });





  // $scope.outsideLog = $firebaseArray(outsideLog);
  // $scope.insideLog = $firebaseArray(tempLog);

  // $scope.outsideLog.$loaded().then(function(){
  //   $scope.data = $scope.outsideLog;
  // });
  // $scope.insideLog.$loaded().then(function(data){
  //   console.log("data", data);
  // });

//  new Dygraph(document.getElementById("graphDiv"),
//   [
//     [1,10,100],
//     [2,20,80],
//     [3,50,60],
//     [4,70,80]
//   ],
//   {
//     labels: [ "x", "A", "B" ]
//   }
// );

// $scope.data = [
//   {x: 0, value: 4, otherValue: 14},
//   {x: 1, value: 8, otherValue: 1},
//   {x: 2, value: 15, otherValue: 11},
//   {x: 3, value: 16, otherValue: 147},
//   {x: 4, value: 23, otherValue: 87},
//   {x: 5, value: 42, otherValue: 45}
// ];

$scope.options = {
  axes: {
    x: {type: 'date'},
    y: {type: 'linear', min: 0, max: 120, ticks: 5, innerTicks: true, grid: true},
    y2: {type: 'linear', min: 0, max: 100, ticks: [1, 2, 3, 4]}
  },
  margin: {
    left: 100
  },
  series: [
    {y: 'value', color: 'steelblue', thickness: '2px', type: 'area', striped: true, label: 'Pouet'},
    {y: 'otherValue', axis: 'y2', color: 'lightsteelblue', visible: false, drawDots: true, dotSize: 2}
  ],
  lineMode: 'linear',
  tension: 0.7,
  tooltip: {mode: 'scrubber', formatter: function(x, y, series) {return 'pouet';}},
  drawLegend: true,
  drawDots: true,
  hideOverflow: false,
  columnsHGap: 5
}


  

}]);