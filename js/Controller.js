function HomeCtrl($scope, $rootScope, Question)
{
	$scope.level = loadCurrentLevel();
	$scope.shouldShowHint = false;
	$scope.question = Question.get({level:$scope.level},function(){


		adjustImages();
	});


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
		$scope.question = Question.get({level:$scope.level},function(){


			adjustImages();
		});
		$scope.shouldShowHint = false;
	}

	$scope.getHint = function()
	{
		//$scope.question.hint ใช้
		$scope.showHint = $scope.question.hint;
		$scope.shouldShowHint = true;
	}

	$scope.isShowHint = function()
	{
		if($scope.shouldShowHint)
			return "show";
		else
			return "hide";
	}

}