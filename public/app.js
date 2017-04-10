const myApp = angular.module('sampleApp', []);

myApp.controller('MainController', ['$scope', 'Prayers', ($scope, Prayers) => {
  $scope.like = {};
  $scope.like.votes = 0;
  $scope.doVote = () => {
    if ($scope.like.userVotes === 1) {
      delete $scope.like.userVotes;
      $scope.like.votes -= 1;
    } else {
      $scope.like.userVotes = 1;
      $scope.like.votes += 1;
    }
  };

// for grabbing all the prayers
  $scope.formData = {};
  $scope.loading = true;
  Prayers.get()
  .success((data) => {
    $scope.prayers = data;
    $scope.loading = false;
  });
  // when creating the add form, send text to api
  $scope.createTodo = () => {
    if ($scope.formData.message !== undefined) {
      $scope.loading = true;
    }
    // prayerData will be returned
    Prayers.create($scope.formData)
    // if works, use get to get all the new todos
    .success((data) => {
      $scope.loading = false;
      $scope.formData = {}; // clear our form so user can add
      $scope.prayers = data; // assign our new list of prayers
    });
  };
}]);


myApp.factory('Prayers', ['$http', function ($http) {
  return {
    get: () => $http.get('/api/prayers'),
    create: prayerData => $http.post('/api/prayers', prayerData),
    delete: id => $http.delete(`/api/prayers/${id}`),
  };
}]);
