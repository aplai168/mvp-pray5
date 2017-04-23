const myApp = angular.module('sampleApp', []);
myApp.factory('Verse', ['$http', ($http) => {
  const url = 'http://labs.bible.org/api/?passage=random';
  return {
    get: () => $http.get(url),
  };
}]);
