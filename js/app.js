var app = angular.module('taicome', ['dataServices']).
		  config(['$routeProvider', function($routeProvider) {
		  $routeProvider.
		  	  when('/', {templateUrl: 'template/home.html',   controller: HomeCtrl}).
		  	  when('/random', {templateUrl: 'template/share-view.html',   controller: RandomCtrl}).
		  	  when('/share/create', {templateUrl:'template/share.html', controller:ShareCtrl}).
		  	  when('/share/:code', {templateUrl:'template/share-view.html', controller:ShareViewCtrl}).
		  	  when('/win', {templateUrl:'template/win.html', controller:WinCtrl}).
		  	  when('/:level', {templateUrl: 'template/home.html',   controller: HomeCtrl}).
              
              
		      otherwise({redirectTo: '/'});
		}]);
