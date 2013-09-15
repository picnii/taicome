angular.module('dataServices', ['ngResource']).
    factory('Question', function($resource){
  return $resource('http://localhost/taicome/service/index.php/question', {}, {
    get: {method:'GET', params:{level:'1'} }
  });
});