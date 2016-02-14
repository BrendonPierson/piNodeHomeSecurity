app.factory("FBFactory",
  ["$firebaseObject",
  "$firebaseArray",
  function($firebaseObject, $firebaseArray) {

    var ref = new Firebase("https://securepenning.firebaseio.com")
    return {
      getAllDataObj: function(){
        return $firebaseObject(ref)
      },
      getConditionsArr: function(){
        return $firebaseArray(ref.child('conditionsLog'))
      },
      getRef: function(){
        return ref
      },
      getSecurity: function() {
        return $firebaseObject(ref.child('security'))
      }
    }
  }
])
