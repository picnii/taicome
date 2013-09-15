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
		$($('.guess.image img')[0]).height(baseHeight);
		$($('.guess.image img')[1]).height(baseHeight);
		$($('.guess.image img')[2]).height(baseHeight);

	}, 100);
	
}

function shakeAnswerBar()
{

}

function doChangeQuestionAnimation(millisec)
{
	$('#coverall').fadeIn(millisec/2).fadeOut(millisec/2);

}