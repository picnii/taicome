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
}