function HomeCtrl($scope, $rootScope, Question, $location)
{
	$scope.level = loadCurrentLevel();
	$scope.shouldShowHint = false;
	$scope.question = Question.get({level:$scope.level},function(data){
		console.log(data);
		console.log($scope.question);
		if($scope.question.status == "win")
		{
			$location.path('/win');
		}
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
			$scope.answer = "";
		}else
		{
			shakeAnswerBar();
		}
		
	}

	$scope.getNewQuestion = function()
	{
		$scope.level++;
		saveLevel($scope.level);
		console.log($scope.level);
		$scope.question = Question.get({level:$scope.level},function(){
			if($scope.question.status == "win")
					{
						$location.path('/win');
					}

			adjustImages();
		});
		$scope.shouldShowHint = false;
		doChangeQuestionAnimation(350);

		$rootScope.countlevel == $scope.level;
	}

	$scope.getHint = function()
	{
		//$scope.question.hint ใช้
		if($scope.question.hint != null)
		{
			$scope.showHint = $scope.question.hint;
		}else
		{
			$scope.showHint =  "ไม่มีคำใบ้จ้า";
		}
		$scope.shouldShowHint = true;
	}

	$scope.isShowHint = function()
	{
		if($scope.shouldShowHint)
			return "show";
		else
			return "hide";
	}

	$scope.replay = function()
	{
		localStorage.lastplayedlevel = 0;
		$scope.level = loadCurrentLevel();
		$scope.getNewQuestion();
	}

	$scope.test = function()
	{
		$rootScope.test = "yes";
		$location.path('/win');
	}

}

function WinCtrl($scope, $rootScope, $location)
{
	$scope.test = $rootScope.test;
	//$location.path('/');
	adjustImages();
	
	$scope.replay = function()
	{
		localStorage.lastplayedlevel = 0;
		$scope.level = loadCurrentLevel();
		$scope.getNewQuestion();
	}
}