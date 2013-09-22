angular.module('dataServices', ['ngResource']).
    factory('Question', function($resource){
  return $resource('service/index.php/question', {}, {
    get: {method:'GET', params:{level:'1'} }
  });
}).factory('Answer', function($resource){
  return $resource('service/index.php/question/answer', {}, {
    answer: {method:'GET', params:{level:'1',answer:''} }
  });
}).factory('Suggest', function($resource){
  return $resource('service/index.php/question/suggest', {}, {
    send: {method:'POST' }

  });
}).factory('Share', function($resource){
  return $resource('service/index.php/question/suggestView', {}, {
    get: {method:'GET' , params:{code:''}}

  });
}).factory('RandomQuestion', function($resource){
  return $resource('service/index.php/question/random', {}, {
    get: {method:'GET' }

  });
});