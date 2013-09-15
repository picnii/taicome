function HomeCtrl($scope, $rootScope, Question)
{
	$scope.level = loadCurrentLevel();
	$scope.question = Question.get({level:2}, function(data){

		console.log(data)
	});

	$scope.checkAnswer = function()
	{
		console.log($scope.question.answer)
	}

	$scope.getNewQuestion = function()
	{

	}

	$scope.getHint = function()
	{

	}

}