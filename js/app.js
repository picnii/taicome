var app = angular.module('taicome', ['dataServices']).
		  config(['$routeProvider', function($routeProvider) {
		  $routeProvider.
		  	  when('/', {templateUrl: 'template/home.html',   controller: HomeCtrl}).
		  	  when('/share/create', {templateUrl:'template/share.html', controller:ShareCtrl}).
		  	  when('/share/:code', {templateUrl:'template/share-view.html', controller:ShareViewCtrl}).
		  	  when('/win', {templateUrl:'template/win.html', controller:WinCtrl}).
		  	  when('/:level', {templateUrl: 'template/home.html',   controller: HomeCtrl}).
              
              
		      otherwise({redirectTo: '/'});
		}]);
