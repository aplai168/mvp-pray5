const myApp = angular.module('sampleApp', ['ui.router', 'youtube-embed']);

myApp.controller('MainController', ['$scope', 'Prayers', 'Verse', 'Style', ($scope, Prayers, Verse, Style) => {
  $scope.colors = ['aqua', 'magenta', 'electric'];
  $scope.bible = {};
  $scope.bubble = {};

  // $scope.getColor = function getClass(idx, list) {
  //   return {
  //     special: idx > list.length / 2 - 1
  //   };
  // };

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
  $scope.submit = () => {
    if ($scope.formData.message !== undefined) {
      $scope.loading = true;
    }
    // $scope.formData.style = Style.getRandomStyle();
    Prayers.create($scope.formData)
    .success((data) => {
      $scope.loading = false;
      $scope.formData = {}; // clear our form so user can add
      // Prayers.update(data[data.length - 1]._id, { style: Style.getRandomStyle() })
      // .success((styleUpdate) => {
      //   console.log('updated', styleUpdate);
      // })
      // data.style = Style.getRandomStyle();
      // how to make it so that every generated prayer has a new style ?
      // console.log(data[data.length - 1], 'data is an array of objects');
      $scope.prayers = data;
      console.log($scope.prayers, 'prayerList')
    });
  };
  $scope.getVerse = () => {
    Verse.get()
    .success((data) => {
      $scope.bible.verse = data;
    });
  };
}]);

myApp.controller('PrayerModeCtrl', ['$scope', function($scope) {
  $scope.journalTime = false;
  $scope.worshipTime = false;
  // video id
  $scope.theBestVideo = 'https://www.youtube.com/watch?v=d5UHAOtAZPU';

}]);

myApp.factory('Prayers', ['$http', function ($http) {
  return {
    get: () => $http.get('/api/prayers'),
    create: prayerData => $http.post('/api/prayers', prayerData),
    delete: id => $http.delete(`/api/prayers/${id}`),
    update: (id, objectData) => $http.put(`/api/prayers/${id}`, objectData),
  };
}]);

myApp.factory('Verse', ['$http', ($http) => {
  const url = 'http://labs.bible.org/api/?passage=random&formatting=plain ';
  return {
    get: () => $http.get(url),
  };
}]);

myApp.factory('Style', [() => {
  const getColor = () => {
    const colors = ['#f4418c', '#4c41f4', '#42f4f1'];
    const index = Math.floor(Math.random() * 3);
    return colors[index];
  };
  const getRandomStyle = () => {
    return {
      'position': 'relative',
      'top': `${Math.floor(Math.random() * 100)}px`,
      'left': `${Math.floor(Math.random() * 100)}px`,
      'background': `${getColor()}`,
    };
  };
  return {
    getRandomStyle,
  };
}]);
