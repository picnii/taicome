angular.module('dataServices', ['ngResource']).
    factory('Question', function($resource){
  return $resource('service/data.json', {}, {
    get: {method:'GET', params:{level:'1'} }
  });
});