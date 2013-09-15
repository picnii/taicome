function HomeCtrl($scope, $rootScope, Question)
{
	$scope.level = loadCurrentLevel();
	$scope.question = Question.get({level:$scope.level}, function(data){

		console.log(data)
	});

	$scope.checkAnswer = function()
	{

	}

	$scope.getNewQuestion = function()
	{

	}

	$scope.getHint = function()
	{

	}

}