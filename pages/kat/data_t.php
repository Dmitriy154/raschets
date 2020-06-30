<!DOCTYPE html>
<html lang="en">

<head>
	<?php include ("../../blocks/head.html") ?><!-- CSS meta -->
	<title>Категории помещений</title>
</head>

<body style="background: url(../../img/fon_pesok.png)">
<main>
<!-- -->
 <div class="container-fluid">
	<div class="row">
		<div id="myTitle" class='col col-md-12 text-center bg-secondary text-white mt-0'>
			<h6>Справочные данные. Низшая теплота сгорания веществ и материалов</h6>
		</div>
	</div>

	<div class="row m-2">
		<div class="col-lg-2 mx-auto text-center">
			<a href="../../kat.php"><button class="btn btn-outline-primary">&#8592; Назад</button></a>
		</div>	
	</div>	
	
	<div class="row m-2">
		<div class="col-lg-4 mx-auto text-center" id="divData">
		</div>	
	</div>


	<div class="row m-2">
		<div class="col-lg-2 mx-auto text-center">
			<a href="../../kat.php"><button class="btn btn-outline-primary">&#8592; Назад</button></a>
		</div>	
	</div>	

 </div> <!--container-->
</main>


  <?php include ("../../blocks/scripts.html") ?><!--  Bootstrap -->
  
  <script src="../../js/kat/boot.js"></script>
  <script src="../../db/tv.js"></script> <!--подключаем данные -->
  <script src="../../js/kat/kat_data_t.js"></script>
  
</body>
</html>