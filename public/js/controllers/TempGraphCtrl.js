app.controller("TempGraphCtrl", 
  ["$scope", 
  "Auth",
  "FBFactory",
  function($scope, Auth, fb) {
  
  // Data for the graph
  $scope.data = fb.getConditionsArr();

  // Change the number of x axes tix based on window size
  var numOfXTicks = jQuery(window).width()/200;

  // Options for the graph
  $scope.options = {
    axes: {
      x: {type: 'date', key: '$id', zoomable: true, ticks: numOfXTicks, ticksFormatter: function(val){return new Date(val).toDateString()}},
      y: {type: 'linear',min:0, innerTicks: true, grid: true, zoomable: true},
      y2: {type: 'linear', max:100}
    },
    margin: {
      // left: 100
    },
    series: [
      {y: 'insideTemp', color: "#17becf",  dotSize: 4, thickness: '4px', label: 'Inside Temp'},
      {y: 'outsideTemp', color: "#9467bd",  dotSize: 4, thickness: '4px', label: 'Outside Temp'},
      {y: 'humidity', axis: 'y2', color: "#bcbd22", thickness: '4px', label: 'Outside Humidity'}
    ],
    lineMode: 'linear',
    tension: 0.7,
    tooltip: {
      mode: 'scrubber', 
      formatter: function(x, y, series) {
        var date = new Date(parseInt(x));
        return date.toDateString() + " " + date.toLocaleTimeString() + ": " + series.label + " " + y;
      }
    },
    drawLegend: true,
    drawDots: false,
    hideOverflow: true,
  }

}]);