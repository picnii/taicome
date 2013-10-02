
app.run(function($rootScope) {
	$rootScope.user = {};
	$rootScope.actionCount = 0;
	var badge_img_prefix_url = "images/";
	var badge_img_suffix_url ="-badge.png";
	var WEB_DIR = "http://taicome.com"
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

	$rootScope.isShowLogin = function(mode)
	{
		var condition = !$rootScope.isSaveUser();
		if(mode == 'inverse')
			condition = !condition
		if(condition)
			return "not-hide";
		else
			return "hide";
	}
	$rootScope.earnModal = {};
	$rootScope.showDialog = function(subject, image, content, delay, callback)
	{
		$rootScope.earnModal.subject = subject;
		$rootScope.earnModal.image = image;
		$rootScope.earnModal.content = content;
		console.log('show showDialog')
		$('#earnModal').modal();
		if(typeof(delay) != 'undefined')
			setTimeout(function(){
				$('#earnModal').modal('hide');
				if(typeof(callback) != 'undefined')
					callback();
			}, delay * 1000);
	}


	$rootScope.COPPER_BADGE_IMG = badge_img_prefix_url + 'copper' + badge_img_suffix_url;
	$rootScope.SILVER_BADGE_IMG = badge_img_prefix_url + 'silver' + badge_img_suffix_url;
	$rootScope.GOLD_BADGE_IMG = badge_img_prefix_url + 'gold' + badge_img_suffix_url;
	$rootScope.FAN_BADGE_IMG = badge_img_prefix_url + 'fan' + badge_img_suffix_url;
	$rootScope.THANKYOU_BADGE_IMG = badge_img_prefix_url + 'thankyou' + badge_img_suffix_url;

	var badge_case = [];
	badge_case['copper'] = {at:0, img:$rootScope.COPPER_BADGE_IMG, subject:"ไม่ธรรมดา", content:"ได้ Badge แรกไปแล้วไม่ธรรมดาอ๊ะ"}
	badge_case['silver'] = {at:0, img:$rootScope.SILVER_BADGE_IMG, subject:"วู้วว", content:"ผ่านมาขนาดนี้เอาเหรียญเงินไปเลยปะ"}
	badge_case['gold'] = {at:0, img:$rootScope.GOLD_BADGE_IMG, subject:"เมพพ", content:"กราบ.. กราบ.. กราบ.."}
	badge_case['fan'] = {at:1, img:$rootScope.FAN_BADGE_IMG, subject:"สุดยอดแฟนพันธุ์แท้", content:"เล่นครบทุกข้อแบบนี้ คุณเป็นสุดยอดแฟนพันธุ์แท้จริงๆ"}
	badge_case['thankyou'] = {at:2, img:$rootScope.THANKYOU_BADGE_IMG, subject:"ขอบคุณ", content:"ที่ช่วยให้ทายคำมีมุขให้เล่นมากขึ้น"}

	$rootScope.loadMedal = function(badgeUrl)
	{
		console.log('loadBadge')
		console.log(badgeUrl)
		switch(badgeUrl)
		{
			case $rootScope.COPPER_BADGE_IMG:
				return badge_case['copper'];
			break;
			case $rootScope.SILVER_BADGE_IMG:
				return badge_case['silver'];
			break;
			case $rootScope.GOLD_BADGE_IMG:
				return badge_case['gold'];
			break;
			case $rootScope.FAN_BADGE_IMG:
				return badge_case['fan'];
			break;
			case $rootScope.THANKYOU_BADGE_IMG:
				return badge_case['thankyou'];
			break;
		}
		return false;
	}

	$rootScope.earnBadge = function(badge, callback)
	{	
		if(typeof(badge_case[badge]) != 'undefined')
		{
			
			var target = badge_case[badge].at
			var img = badge_case[badge].img;
			console.log('target'+target)
			console.log('img'+img)
			console.log(typeof($rootScope.badges[target]) );
			console.log($rootScope.badges[target] )
			if(typeof($rootScope.badges[target]) == 'undefined' || $rootScope.badges[target] != img)
				if(FB)
					$rootScope.shareBadge(badge_case[badge].img);
				else
					$rootScope.showDialog(badge_case[badge].subject, badge_case[badge].img, badge_case[badge].content, 2, callback);
			else if(typeof(callback) != 'undefined')
				callback();
			$rootScope.badges[target] = img;
			$rootScope.saveBadge();
		}else
			return false;

	}

	$rootScope.saveBadge = function()
	{
		var badge_str = JSON.stringify($rootScope.badges);
		localStorage.badges = badge_str
	}

	$rootScope.loadBadge = function()
	{
		if (localStorage.badges)
			return JSON.parse(localStorage.badges);
		else
			return [];
	}
	$rootScope.badges= $rootScope.loadBadge();

	$rootScope.updateBadge = function(action, params)
	{
		console.log('badges')
		console.log(action)
		console.log(params)
		switch(action)
		{
			case 'level':
				if(params.level == 7 )
					$rootScope.earnBadge('copper');
				else if(params.level  == 25)
					$rootScope.earnBadge('silver');
			;
				break;
			case 'share':
			 	$rootScope.earnBadge('thankyou', params);
			 	break;
			;
			case 'win':
				if(params.level  == 51)	
			 		$rootScope.earnBadge('gold');
			 	break;
			;
		}
	}

	$rootScope.shareBadge = function(badgeUrl, force)
	{
		var badge = $rootScope.loadMedal(badgeUrl);
		var prefix = WEB_DIR +"/";
		//{at: 0, img: "images/gold-badge.png", subject: "เมพพ", content: "กราบ.. กราบ.. กราบ.."} 
		if(badge || typeof(force) != 'undefined')
			FB.ui(
			  {
			    method: 'feed',
			    name: 'ได้ Badge :'+ badge.subject,
			    link: 'http://www.taicome.com/',
			    picture: prefix+badge.img,
			    caption: 'ของเกมทายคำง่ายๆกับ taicome.com',
			    description: badge.content
			  },
			  function(response) {
			    if (response && response.post_id) {
			      console.log(response)
			    } else {
			      console.log('fail')
			    }
			  }
			);
	}

	$rootScope.encodeUrl = function(url)
	{
		return encodeURIComponent(url);
	}

	$rootScope.updateInviteShare = function(notInvite)
	{	
		$rootScope.actionCount++
		if($rootScope.actionCount % 9 == 0 && typeof(notInvite) == 'undefined')
			$rootScope.showDialog("ผมว่าคุณใช้ได้", "images/logo.png", "มาลองสร้างมุขของคุณเองกันเถอะ คุณสามารถสร้างมุขนี้แล้วส่งไปให้เพื่อนๆ<br/> คนที่คุณรู้จัก หรือแม้กระทั่งคนในเว็บก็ได้ หากพร้อมแล้ว.. <br/><a href='#/share/create' class='btn btn-info btn-large' data-dismiss='modal'>มาสร้างมุขกันเลย!</a>", 10, function(){
				$('#input-answer').focus();
			});
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
		baseHeight = Math.min(baseHeight, 200)
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


function getUserFromFacebookAPI(rootScope, callback) {
	if(typeof(FB)!= "undefined")
    FB.api('/me', function(response) {
    	console.log((typeof(rootScope) == 'undefined'))
    	if(typeof(rootScope) == 'undefined')
      		var scope = angular.element($("#owner-name")).scope();
      	else
      		var scope = angular.element($("body")).scope();
    	console.log('call success')  	
    	console.log(response)
    	console.log(scope)
      	if(typeof(scope) != "undefined" && typeof(response.name) != 'undefined' )
	      scope.$apply(function(){
	      	if(typeof(scope.question) != 'undefined')
	      	{
	      		scope.question.owner_name = response.name;
				scope.question.owner_facebook_url = response.link;	
	      	}
			console.log('test response')
			console.log(response)
			scope.saveUser(response.name ,  response.link );
			console.log('user')
			console.log(scope.user)
			if(typeof(callback) == 'function')
  				callback();
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

  function imagetocanvas( img, thumbwidth, thumbheight ) {
  	c  = document.createElement( 'canvas' ),
    cx = c.getContext( '2d' ),
    c.width = thumbwidth;
    c.height = thumbheight;
    
    cx.drawImage( 
      img, 0, 0, thumbwidth, thumbwidth 
    );
	return c.toDataURL();
  };