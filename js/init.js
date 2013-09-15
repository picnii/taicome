app.run(function($rootScope) {
		  

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
		while(runNumber_2<('.guess.image img').length)
		{
		$($('.guess.image img')[runNumber_2]).height(baseHeight);
		runNumber_2++;
		}
	}, 100);
	
}

function shakeAnswerBar()
{
	$('.answer-bar input').animate({marginLeft:"+=25"}, 75).animate({marginLeft:"-=25"},75).animate({marginLeft:"+=25"}, 75).animate({marginLeft:"-=25"},75).animate({marginLeft:"+=25"}, 75).animate({marginLeft:"-=25"},75).animate({marginLeft:"+=25"}, 75).animate({marginLeft:"-=25"},75)
}

function doChangeQuestionAnimation(millisec)
{
	$('#coverall').fadeIn(millisec/2).fadeOut(millisec/2);

}