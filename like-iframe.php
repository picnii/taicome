<?php
	$url = $_GET['url'];
?>
<html>
<head></head>
<body>
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=551880718216871";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
<fbLike class="fb-like" data-href="<?php echo $url; ?>" data-width="80" data-layout="box_count" data-show-faces="true" data-send="false"></fbLike>
</body>
