angular.module("TestProcess", ['ui.sortable']).controller("MainController", function($scope, $http, $interval){
  // var baseURL = "http://localhost:3000/"
  var baseURL = "https://test-process-server.herokuapp.com/"
  $scope.pullRequests = [];
  $scope.options = [true, false]
  $scope.getData = _getData
  $scope.changeStatus = _changeStatus

  _getData();

  $interval(_getData, 1000 * 60)

  $scope.sortableOptions = {
    stop: function(e, ui) {
      for (var index in $scope.pullRequests) {
       $scope.pullRequests[index].priority = $scope.pullRequests.length - index;
      }
      $http.post(baseURL+"changedPriority", $scope.pullRequests).then(function(res){
      }, function(err){
        console.log(err)
      })
    }
  };

  function _changeStatus(update){
    $http.put(baseURL+"pullRequest/"+update.id,update).then(function(res){
    }, function(err){
      console.log(err)
    })
  }

  function _getData(){
    $http.get(baseURL+"openedPullRequests").then(function(res){
      $scope.pullRequests = res.data
    }, function(err){
      console.log(err)
    })
  
  }

});