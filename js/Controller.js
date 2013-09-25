var WEB_DIR = "http://taicome.com";
function HomeCtrl($scope, $rootScope, Question, $location, Answer, $routeParams)
{
	
	updateMenu('level');
	
	resetColor();
	
	$('#input-answer').focus();
	$scope.level = loadCurrentLevel();
	$scope.maxLevel = Number(loadMaxLevel());


	if($routeParams.level !=null && Number($routeParams.level) <= $scope.maxLevel)
		$scope.level = $routeParams.level;
	else 
		$location.path('/'+$scope.level);

	
	$rootScope.updateInviteShare();

	$rootScope.updateBadge('level', {level:$scope.maxLevel}, function(){
		$('#input-answer').focus();
	});	
	/* temp before directive can update */
	setTimeout(function(){
		if (typeof(FB) != 'undefined') {
			        FB.XFBML.parse();
			    }
	}, 100)
				
	/* end temp */

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
			{
				shakeAnswerBar();
				$scope.getHint();
			}
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
		$scope.shouldShowHint = !$scope.shouldShowHint;
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
	$scope.level = loadCurrentLevel();
	$scope.maxLevel = loadMaxLevel();
	$rootScope.updateBadge('win',{level: $scope.maxLevel}, function(){
		shareBadge($rootScope.GOLD_BADGE_IMG);
	});

	saveLevel($scope.level-1);
	$scope.replay = function()
	{
		localStorage.lastplayedlevel = 1;
		$scope.level = loadCurrentLevel();
		$location.path('/');
	}
}

function ShareCtrl($scope, $rootScope, $location, Suggest , Picture)
{
	updateMenu('share');
	$scope.question = {};
	if(!$rootScope.isSaveUser())
		getUserFromFacebookAPI();
	else
	{
		$scope.question.owner_name = $rootScope.user.name;
		$scope.question.owner_facebook_url = $rootScope.user.url;
	}
	resetColor();
	$scope.adjustImages = adjustImages;

	

	$scope.picIndex = 0;

	$scope.changeAlphaPics =function(alpha)
	{
		$('#pic-target-0').css('opacity', alpha);
		$('#pic-target-1').css('opacity', alpha);
		$('#pic-target-2').css('opacity', alpha);
	}

	$scope.selectPic = function(pic)
	{
		$scope.changeAlphaPics(0.4)
		if($scope.picIndex % 3 == 0)
			$scope.question.picture1 = pic
		if($scope.picIndex % 3 == 1)
			$scope.question.picture2 = pic
		if($scope.picIndex % 3 == 2)
			$scope.question.picture3 = pic
		var mod_target = ($scope.picIndex) % 3;
		$('#pic-target-'+mod_target).css('opacity', 1);
		$scope.picIndex ++
		$scope.adjustImages();
	}
	$scope.menu = [
		{name:'celeb', description:'คนดัง'},
		{name:'animal', description:'สัตว์'},
		{name:'action', description:'การกระทำ'},
		{name:'place', description:'สถานที่'},
		{name:'stuff', description:'สิ่งของ'},
		{name:'url', description:'ใส่รูปเองจาก url ภาพ'}
	];
	$scope.selecType = function(type)
	{
		$scope.changeAlphaPics(1);
		for(var i=0; i < $scope.menu.length; i++)
			$('#'+$scope.menu[i].name+'-menu').removeClass('active');
		$('#'+type+'-menu').addClass('active');
		if(type == 'url')
		{
			$('#picture-toolbox').show();
			$('#picture-helper').hide();
			return 'url';
		}else
		{
			$('#picture-toolbox').hide();
			$('#picture-helper').show();
			$scope.testPictures = Picture.query({type:type}, function(data){
				setTimeout(function(){
					var container = document.querySelector('#picture-helper');
					var msnry = new Masonry( container, {
					  // options
					  columnWidth: 0,
					  itemSelector: '.item'
					});
				}, 100)
				

			});	
		}		
	}



	$scope.clearPicture = function()
	{
		$scope.changeAlphaPics(1)
		$scope.question.picture1 = null;
		$scope.question.picture2 = null;
		$scope.question.picture3 = null;
	}

	$scope.togglePicture = function()
	{
		$scope.changeAlphaPics(1)
		$('.picture-helper').toggle();
	}


	$scope.getSenderUrl = function()
	{

		if(typeof($scope.question) != 'undefined' && learnRegExp($scope.question.twitter))
			return $scope.question.twitter;
		else if(typeof($scope.question) != 'undefined' && learnRegExp($scope.question.facebook))
			return  $scope.question.facebook;
		else
			return "#/share";
	}

	$scope.login = function()
	{
		if(typeof(FB) != "undefined")
		FB.login();
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
				if($scope.question.is_suggest)
					$rootScope.updateBadge('share', function(){
						$('#shareModal').modal();
					});	
				else
					$('#shareModal').modal();
				$scope.question ={};
			}
		})
	}
}

function ShareViewCtrl($scope, $rootScope, $location, Share, $routeParams)
{
	clearMenu();
	console.log('shareview');
	resetColor();
	$('#input-answer').focus();
	$scope.section_id = "share-section";
	$scope.question = {};
	if($scope.isSaveUser)
	{
		$scope.question.owner_name = $scope.user.name;
		$scope.question.owner_facebook_url = $scope.user.url;
	}
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
		$scope.shouldShowHint = !$scope.shouldShowHint;
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
			{
				shakeAnswerBar();		
				$scope.getHint();
			}
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
	$('#input-answer').focus();
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
		$scope.shouldShowHint = !$scope.shouldShowHint;
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
			{
				shakeAnswerBar();		
				$scope.getHint();
			}
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
				$scope.shouldShowHint = false;
				adjustImages();
				resetColor();
				/* temp before directive can update */
				setTimeout(function(){
					if (typeof(FB) != 'undefined') {
						        FB.XFBML.parse();
						    }
				}, 100)
							
				/* end temp */
			}
		});	
	}
}

function ProfileCtrl($scope, $rootScope, $location, Share)
{
	updateMenu('profile');
	resetColor()
	$scope.clear_level = Number(loadMaxLevel());
	$scope.max_level = 50
	$scope.badges = $rootScope.badges;
	$scope.progress = $scope.clear_level / $scope.max_level * 100;
	console.log('profile');
	if(!$rootScope.isSaveUser())
		getUserFromFacebookAPI("profile-section" ,function(){
			console.log('callback');
			if($rootScope.isSaveUser())
			$scope.questions = Share.query({facebook_url:$rootScope.user.url}, function(data){
				console.log(data);
			} );
			else
				console.log('none user');	
		});
	else
	{
		$scope.questions = Share.query({facebook_url:$rootScope.user.url}, function(data){
				console.log(data);
			} );
	}

	$scope.login = function()
	{
		if(typeof(FB) != "undefined")
			FB.login();
	}
	
	console.log($rootScope.badges)
	console.log($rootScope.user)

}