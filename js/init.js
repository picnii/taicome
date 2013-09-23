app.run(function($rootScope) {
	$rootScope.user = {};
	$rootScope.saveUser = function(username, url)		  
	{
		$rootScope.user.name = username;
		$rootScope.user.url = url;
	}

	$rootScope.isSaveUser = function()
	{
		if(typeof($rootScope.user.name) == 'undefined' || typeof($rootScope.user.url) == 'undefined')
			return false
		else
			return true;
	}

	$rootScope.isShowLogin = function()
	{
		if(!$rootScope.isSaveUser())
			return "show";
		else
			return "hide";
	}


});


function loadCurrentLevel()
{
if (localStorage.lastplayedlevel)
  {
  localStorage.lastplayedlevel=Number(localStorage.lastplayedlevel);
  }
else
  {
  localStorage.lastplayedlevel=1;
  }
	return localStorage.lastplayedlevel;
}

function saveLevel(level)
{
	localStorage.lastplayedlevel = level;
}

function adjustImages()
{
	//$($('.guess.image img')[0]).height(150) adjust
	//$($('.guess.image img')[0]).height() get height
	//$('.guess.image img') array of pictures
	setTimeout(function(){
		var runNumber = 0;
		var baseHeight = 2000000;
		while(runNumber<$('.guess.image img').length)
		{
			var pictureHeight = $($('.guess.image img')[runNumber]).height();
			if(pictureHeight< baseHeight)
			{
				baseHeight = pictureHeight;
			}
			runNumber++;
		}
		var runNumber_2 = 0;
		if(baseHeight <=0 )
			baseHeight = 180;
		baseHeight = Math.min(baseHeight, 250)
		while(runNumber_2<('.guess.image img').length)
		{
			$($('.guess.image img')[runNumber_2]).height(baseHeight);
			runNumber_2++;
		}
	}, 100);
	
}

function shakeAnswerBar()
{
	$('#fail-sound')[0].play();
	$('.answer-bar input').animate({marginLeft:"+=25"}, 75).animate({marginLeft:"-=25"},75).animate({marginLeft:"+=25"}, 75).animate({marginLeft:"-=25"},75).animate({marginLeft:"+=25"}, 75).animate({marginLeft:"-=25"},75).animate({marginLeft:"+=25"}, 75).animate({marginLeft:"-=25"},75)
}

function doChangeQuestionAnimation(millisec)
{
	$('#coverall').fadeIn(millisec/2).fadeOut(millisec/2);
}

function updateMenu(name)
{
	clearMenu();	
	$('#'+name+'-li').addClass('active');
}

function clearMenu()
{
	$('.navbar li').removeClass('active');
}

function learnRegExp(){
  return /((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(learnRegExp.arguments[0]);
} 

function colorWin()
{
	$('#pass-sound')[0].play();
	$('body').css({background:'#9EF0B1'});
	$('#bg-cover').css({background:'#D6F5E1'});
}

function resetColor()
{
	$('body').css({background:'#eee'});
	$('#bg-cover').css({background:'#eee'});
}


function getUserFromFacebookAPI() {
	if(typeof(FB)!= "undefined")
    FB.api('/me', function(response) {
    	console.log(response)
      var scope = angular.element($("#owner-name")).scope();
      if(typeof(scope) != "undefined")
      scope.$apply(function(){

		scope.question.owner_name = response.name;
		scope.question.owner_facebook_url = response.link;
		scope.saveUser(scope.question.owner_name , scope.question.owner_facebook_url );
		});
    });
}

function getUserFromTwitterAPI()
{
	$.post('https://api.twitter.com/1.1/users/show.json?screen_name=npop',function(data){
		console.log(data);
	})
}

function saveMaxLevel(level)
{
	if(level > localStorage.maxLevel)
	{
		localStorage.maxLevel = level;
	}
}
function loadMaxLevel()
{
	if (localStorage.maxLevel)
  	{
  		localStorage.maxLevel=Number(localStorage.maxLevel);
  		
  	}else
  	{
  		localStorage.maxLevel=1;
  	}
	return localStorage.maxLevel;
}