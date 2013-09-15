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
		$scope.answer = ""
	}

	$scope.getNewQuestion = function()
	{
		$scope.level++;
		saveLevel($scope.level);
		console.log($scope.level);
		$scope.question = Question.get({level:$scope.level});
	}

	$scope.getHint = function()
	{
		//$scope.question.hint ใช้
		$scope.showHint = "คำใบ้คืออะไร";
	}

	$scope.isShowHint = function()
	{

		//return show;
		return "hide";
	}

}