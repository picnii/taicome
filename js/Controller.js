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
		$rootScope.addAttempt($scope.answer);
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
		$scope.attemptChange($scope.answer);
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
	$scope.question.is_suggest = true;
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

	$scope.convertFile = function()
	{
		console.log('change')
		//code here convert
		
	}

	$scope.doTest = function()
	{
		console.log($scope.test)
		console.log('testtest')
	}

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
		{name:'url', description:'ใส่รูปเองจาก url ภาพ'},
		{name:'file', description:'ใส่รูปเองจากเครื่อง(Chrome Only)'}
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
			$('#picture-toolbox-file').hide();
			
			return 'url';
		}else if(type == 'file'){
			$('#picture-toolbox').hide();
			$('#picture-helper').hide();
			$('#picture-toolbox-file').show();
			return 'file';
		}else
		{
			$('#picture-toolbox').hide();
			$('#picture-helper').show();
			$('#picture-toolbox-file').hide();
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
	$scope.selecType('celeb');
	$scope.question.picture1 = "data:image/jpeg;base64,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";
	$scope.question.picture2 = "data:image/jpeg;base64,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";
	$scope.question.picture3 = "data:image/jpeg;base64,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";
	$scope.adjustImages();
	$scope.changeAlphaPics(0.7);

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

function ShowCtrl($scope, $rootScope, $location, Share, Preview)
{
	$scope.question = {};
	$scope.question.owner_facebook_url ="https://facebook.com/modernduck";
	$scope.question.owner_name = "Sompop Kulapalanont";
	$scope.question.answer = "ต้มยำกุ้ง"
	$scope.question.pictures = [
		"data:image/jpeg;base64,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",
		"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQJasxBYtFjC2eXUOkmT2xx5Zbv2eaiqySQM3_6_jPgork6bULc",
		"data:image/jpeg;base64,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"
	];
	adjustImages();
	setTimeout(function(){
		html2canvas($(".show-joke")[0], {
		    onrendered: function(canvas) {
		        // canvas is the final rendered <canvas> element
		        //$('.render').append(canvas);
		        $scope.dataUrl = canvas.toDataURL();
		        var embedTag = "<img src='"+ $scope.dataUrl+"' />";
		        $('.render').append(embedTag);
		        $('.show-joke').hide();
		    }
		});

	},200)

	$scope.testShare = function()
	{
		console.log($scope.dataUrl);
		var tmpSentDatas = $scope.dataUrl.split("base64,");
		var sentData = tmpSentDatas[1];
		//console.log(sentData);
		//console.log(lengthInUtf8Bytes(sentData)/1000)
		Preview.upload({data:sentData}, function(data){

			var img_url = WEB_DIR+data.path;
			$rootScope.facebook.image = img_url;
			/*FB.ui(    {
			  method: 'stream.publish',
			 attachment: {
		        name: 'test name',
		        caption: 'Caption here.',
		        description: 'description here',
		        href: 'http://taicome.com',
		        media: [{'type': 'image', 'src': img_url, width: '150', height: '120', 'href': 'http://taicome.com'}]
		      },
			  message: "test si na"//,
			//  to: 165728180290260 
			 },    
			function (response) {
			    if (response && response.post_id) {
			      alert(response.post_id);
			    } else {

			    }    
			   }  
			);*/
		})/*
		$.post('service/index.php/picture/preview',{data:sentData},function(data){

			console.log(data);
		})*/
		
	}
	
}

function lengthInUtf8Bytes(str) {
  // Matches only the 10.. bytes that are non-initial characters in a multi-byte sequence.
  var m = encodeURIComponent(str).match(/%[89ABab]/g);
  return str.length + (m ? m.length : 0);
}