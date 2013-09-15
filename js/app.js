var app = angular.module('taicome', ['dataServices']).
		  config(['$routeProvider', function($routeProvider) {
		  $routeProvider.
		  	  when('/', {templateUrl: 'template/home.html',   controller: HomeCtrl}).
                 when('/win', {templateUrl:'template/win.html', controller:WinCtrl}).
		      otherwise({redirectTo: '/'});
		}]);
