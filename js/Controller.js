function HomeCtrl($scope, $rootScope, Question)
{
	$scope.level = loadCurrentLevel();
	$scope.question = Question.get({level:$scope.level},function(){


		adjustImages();
	});
	$scope.showHint = "ไม่มีคำใบ้จ้า";

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
	}

	$scope.getHint = function()
	{
		//$scope.question.hint ใช้
		$scope.showHint = "คำใบ้คืออะไร";
	}

	$scope.isShowHint = function()
	{
		//if(???)
		return "show";
		//return "hide";
	}

}