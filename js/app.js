var app = angular.module('taicome', ['dataServices','angulartics', 'angulartics.google.analytics']).
		  config(['$routeProvider', function($routeProvider) {
		  $routeProvider.
		  	  when('/', {templateUrl: 'template/home.html',   controller: HomeCtrl}).
		  	  when('/show', {templateUrl: 'template/show.html',   controller: ShowCtrl}).
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
		}).directive("fileDropzone", function($rootScope) {
			 var fnc =   function (scope, iElement, iAttrs) {
			 	var attrs = iAttrs;
			 	var element = iElement;
			 	 var checkSize, isTypeValid, processDragOverOrEnter, validMimeTypes;
			 	  processDragOverOrEnter = function(event) {
			 	  	  if (event != null) {
			            event.preventDefault();
			          }
			          console.log('over');
			          console.log(event.dataTransfer.effectAllowed )
			          event.dataTransfer.effectAllowed = 'copy';
			          console.log(event.dataTransfer)
			          return false;
			 	  }
			 	   validMimeTypes = attrs.fileDropzone;
        			checkSize = function(size) {
        				  var _ref;
				          if (((_ref = attrs.maxFileSize) === (void 0) || _ref === '') || (size / 1024) / 1024 < attrs.maxFileSize) {
				            return true;
				          } else {
				            alert("File must be smaller than " + attrs.maxFileSize + " MB");
				            return false;
				          }
        			}

        			isTypeValid = function(type) {
			          if ((validMimeTypes === (void 0) || validMimeTypes === '') || validMimeTypes.indexOf(type) > -1) {
			            return true;
			          } else {
			            alert("Invalid file type.  File must be one of following types " + validMimeTypes);
			            return false;
			          }
			        };
			        element.bind('dragover', processDragOverOrEnter);
        			element.bind('dragenter', processDragOverOrEnter);
        			element.bind('drop', function(event) {
			          var file, name, reader, size, type;
			          if (event != null) {
			            event.preventDefault();
			          }
			          reader = new FileReader();
			          reader.onload = function(evt) {
			            if (checkSize(size) && isTypeValid(type)) {
			              return scope.$apply(function() {
			                scope.file = evt.target.result;
			                if (angular.isString(scope.fileName)) {
			                  return scope.fileName = name;
			                }
			              });
			            }
			          };
			          
			          
			          console.log(event)
			          file = event.dataTransfer.files[0];
			          name = file.name;
			          type = file.type;
			          size = file.size;
			          reader.readAsDataURL(file);
			          return false;
			        });

			 };

			 return {link:fnc, restrict: 'EA', scope: {
				        file: '=',
				        fileName: '='
				      }
				    };
		}).directive("fileRead", [function () {
		    return {
		        scope: {
		            fileRead: "="
		        },
		        link: function (scope, element, attributes) {
		            element.bind("change", function (changeEvent) {
		                var reader = new FileReader();
		                reader.onload = function (loadEvent) {
		                	console.log(loadEvent)
		                	if(loadEvent.loaded / 1024 / 1024< 0.7)
		                	{
		                		scope.fileRead = loadEvent.target.result;
		                		scope.$apply(attributes.fileReadDone);
		                	}else
		                		alert("Your file is too large")

		                	//scope.fileRead = imagetocanvas( loadEvent.target.result, 100, 100 );
		                    

		                }
		                reader.readAsDataURL(changeEvent.target.files[0]);
		            });
		            
		        }
		    }
		}]);;

$(document).ready(function(){
	jQuery.event.props.push('dataTransfer');

});