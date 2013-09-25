var app = angular.module('taicome', ['dataServices','angulartics', 'angulartics.google.analytics']).
		  config(['$routeProvider', function($routeProvider) {
		  $routeProvider.
		  	  when('/', {templateUrl: 'template/home.html',   controller: HomeCtrl}).
		  	  when('/random', {templateUrl: 'template/share-view.html',   controller: RandomCtrl}).
		  	  when('/share/create', {templateUrl:'template/share.html', controller:ShareCtrl}).
		  	  when('/share/:code', {templateUrl:'template/share-view.html', controller:ShareViewCtrl}).
		  	  when('/win', {templateUrl:'template/win.html', controller:WinCtrl}).
		  	  when('/profile', {templateUrl: 'template/profile.html',   controller: ProfileCtrl}).
		  	  when('/:level', {templateUrl: 'template/home.html',   controller: HomeCtrl}).
              
              
		      otherwise({redirectTo: '/'});
		}]).directive("fbLogin", function($rootScope) {
			    return function (scope, iElement, iAttrs) {
			        if (FB) {
			            FB.XFBML.parse(iElement[0]);
			        }
			    };
			}).directive("fbLike", function($rootScope) {
			    return function (scope, iElement, iAttrs) {
			    	console.log('like directive')
  
			        if (FB) {
			            FB.XFBML.parse(iElement[0]);
			        }


			        iAttrs.$observe('dataHref', function(value) {
			        	console.log('change href')
					   FB.XFBML.parse(iElement[0]);
					});
			    };
			});

