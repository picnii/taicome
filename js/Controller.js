var WEB_DIR = "http://taicome.com";
function HomeCtrl($scope, $rootScope, Question, $location, Answer, $routeParams)
{
	updateMenu('level');
	
	resetColor();
	console.log('home');
	$('#input-answer').focus();
	$scope.level = loadCurrentLevel();
	$scope.maxLevel = loadMaxLevel()
		if($routeParams.level !=null && $routeParams.level <= $scope.maxLevel)
		$scope.level = $routeParams.level;
	else 
		$location.path('/'+$scope.maxLevel);


	$scope.url = WEB_DIR + "/#/" + $scope.level;
	$scope.shouldShowHint = false;
	$scope.question = Question.get({level:$scope.level},function(data){
		
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
		Answer.answer({level:$scope.level, answer:$scope.answer}, function(data){
			if(data.answer)
			{
				$scope.getNewQuestion();
				$scope.answer = "";		
			}else
				shakeAnswerBar();
		})
		
	}

	$scope.checkAnswerType = function()
	{
		Answer.answer({level:$scope.level, answer:$scope.answer}, function(data){
			if(data.answer)
			{
				colorWin();
			}else
				resetColor();
		})
	}

	$scope.getNewQuestion = function()
	{
		$scope.level++;
		saveLevel($scope.level);
		saveMaxLevel($scope.level);
		/*console.log($scope.level);
		$scope.question = Question.get({level:$scope.level},function(){
			if($scope.question.status == "win")
					{
						$location.path('/win');
					}

			adjustImages();
		});*/
		$scope.shouldShowHint = false;
		doChangeQuestionAnimation(350);

		$rootScope.countlevel == $scope.level;
		$location.path('/'+$scope.level);
	}

	$scope.getHint = function()
	{
		//$scope.question.hint ใช้
		if($scope.question.hint != null && $scope.question.hint != "")
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

	$scope.isShowBack = function()
	{
		if($scope.level > 1)
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
	clearMenu();
	resetColor();
	$scope.test = $rootScope.test;
	//$location.path('/');
	adjustImages();
	
	$scope.replay = function()
	{
		localStorage.lastplayedlevel = 1;
		$scope.level = loadCurrentLevel();
		$location.path('/');
	}
}

function ShareCtrl($scope, $rootScope, $location, Suggest)
{
	updateMenu('share');
	resetColor();
	$scope.adjustImages = adjustImages;
	$scope.question = {};
	$scope.getSenderUrl = function()
	{

		if(typeof($scope.question) != 'undefined' && learnRegExp($scope.question.twitter))
			return $scope.question.twitter;
		else if(typeof($scope.question) != 'undefined' && learnRegExp($scope.question.facebook))
			return  $scope.question.facebook;
		else
			return "#/share";
	}

	$scope.send = function()
	{
		$scope.question.senderUrl = $scope.getSenderUrl();
		console.log($scope.question);
		Suggest.send({question:$scope.question}, function(data){
			console.log('test data');
			console.log(data);
			if(data.result)
			{
				$scope.url = WEB_DIR+"/#/share/"+data.code;
				$('#shareModal').modal();
			}
		})
	}
}

function ShareViewCtrl($scope, $rootScope, $location, Share, $routeParams)
{
	console.log('shareview');
	resetColor();
	$scope.section_id = "share-section";
	$scope.question = {};
	$scope.status = "Share";
	$scope.shouldShowHint = false;
	$scope.url = WEB_DIR +'/#/share/'+$routeParams.code;
	//tempQuesiton = RandomQuestion.get(function(data){})
	//random ==? $location.path('/');
	$tempQuestion = Share.get({code:$routeParams.code},function(data){
		console.log(data);
		$scope.question = data;
		$scope.question.pictures = [data.picture1, data.picture2, data.picture3];

		adjustImages();
	});

	$scope.getHint = function()
	{
		//$scope.question.hint ใช้
		if($scope.question.hint != null && $scope.question.hint != "")
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

	$scope.checkAnswer = function()
	{
	
			if($scope.answer == $scope.question.answer)
			{
				$scope.status = "เย้เยชนะแล้ว บอกต่อมุขนี้กับเพื่อนมั้ย";
				$('#shareModal').modal();
				$scope.answer = "";		
			}else
				shakeAnswerBar();		
	}

	$scope.checkAnswerType = function()
	{
	
			if($scope.answer == $scope.question.answer)
			{
				colorWin();
			}else
				resetColor();
	
	}

}

function RandomCtrl($scope, $rootScope, $location, RandomQuestion, $routeParams)
{
	updateMenu('home');
	console.log('shareview');
	resetColor();
	$scope.section_id = "random-section";
	$scope.question = {};
	$scope.status = "Share";
	$scope.shouldShowHint = false;
	
	$tempQuesiton = RandomQuestion.get(function(data){
	//random ==? $location.path('/');
		$scope.question = data;
		$scope.question.pictures = [data.picture1, data.picture2, data.picture3];
		$scope.url = WEB_DIR +'/#/share/'+data.code;
		adjustImages();
	});

	$scope.getHint = function()
	{
		//$scope.question.hint ใช้
		if($scope.question.hint != null && $scope.question.hint != "")
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

	$scope.checkAnswer = function()
	{
	
			if($scope.answer == $scope.question.answer)
			{
				$scope.answer = "";	
				$scope.random();
				resetColor();
			}else
				shakeAnswerBar();		
	}

	$scope.checkAnswerType = function()
	{
	
			if($scope.answer == $scope.question.answer)
			{
				colorWin();
			}else
				resetColor();
	
	}

	$scope.random = function()
	{
		$tempQuesiton = RandomQuestion.get(function(data){
	//random ==? $location.path('/');
			if($scope.question.id == data.id)
				$scope.random();
			else
			{
				$scope.question = data;
				$scope.question.pictures = [data.picture1, data.picture2, data.picture3];
				$scope.url = WEB_DIR +'/#/share/'+data.code;
				adjustImages();
				resetColor();
			}
		});	
	}
}
