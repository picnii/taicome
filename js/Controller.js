function HomeCtrl($scope, $rootScope, Question)
{
	$scope.level = loadCurrentLevel();
	$scope.question = Question.get({level:$scope.level});

	$scope.checkAnswer = function()
	{
		console.log($scope.answer);
		console.log($scope.question.answer);

		if($scope.question.answer == $scope.answer)
		{
			$scope.getNewQuestion();
		}
	}

	$scope.getNewQuestion = function()
	{
		$scope.level++;
		console.log($scope.level)
	}

	$scope.getHint = function()
	{

	}

}