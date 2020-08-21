<!DOCTYPE html>
<html lang="en">

<head>
	<?php include ("blocks/head.php") ?><!-- CSS meta -->
	<title>Категории помещений</title>
</head>

<body style="background: url(img/fon_pesok.png)">
<main>
<?php include ("blocks/menu.html") ?><!-- МЕНЮ -->

<!-- -->
 <div class="container-fluid">
	<div class="row">
		<div id="myTitle" class='col col-md-12 text-center bg-secondary text-white mt-0'>
			<h6>Расчет категории помещений по взрывопожарной и пожарной опасности в соответствии с ТКП 474-2013</h6>
		</div>
		<div id="stage" class="container-lg m-auto"></div>
	</div><!-- row cards-->
 </div> <!--container-->
</main>

  <?php include ("blocks/scripts.html") ?><!--  Bootstrap, yandex metrika-->
  <script src="js/kat/boot.js"></script>
  <script src="js/kat/kat_main.js"></script>
</body>
</html>