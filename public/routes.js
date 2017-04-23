angular.module('sampleApp')
  .config(function ($stateProvider,
    $urlRouterProvider
  ) {
    $stateProvider
      .state('nav', {
        url: '/',
        views: {
          'nav': {
            templateUrl: 'views/nav.html',
            controller: 'MainController',
          },
          'home': {
            templateUrl: 'views/home.html',
            controller: 'MainController',
          },
        },
      })
      .state('prayerMode', {
        url: '/prayerMode',
        templateUrl: 'views/prayerMode.html',
        controller: 'PrayerModeCtrl',
      });

    $urlRouterProvider.otherwise('start');
  });
