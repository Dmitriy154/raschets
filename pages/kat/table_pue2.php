<!DOCTYPE html>
<html lang="en">

<head>
	<?php include ("../../blocks/head.php") ?><!-- CSS meta -->
	<title>Категории помещений</title>
</head>

<body style="background: url(../../img/fon_pesok.png)">
<main>
<!-- -->
 <div class="container-fluid">
	<div class="row">
		<div id="myTitle" class='col col-md-12 text-center bg-secondary text-white mt-0'>
			<h6>Расчет категории помещений по взрывопожарной и пожарной опасности в соответствии с ТКП 474-2013</h6>
		</div>
	</div>

	<div class="row m-2">
		<div class="col-lg-2 mx-auto text-center">
			<a href="../../kat.php"><button class="btn btn-outline-primary">&#8592; Назад</button></a>
		</div>	
	</div>	
	
	<div class="row m-2">
		<div class="col-lg-10 mx-auto text-center">
			<h4 class='text-primary'>Таблица. Классификация пожароопасных зон по ПУЭ</h4>
		</div>	
	</div>

	<!-- Талица -->
	<div class="row m-2">
		<div class="col-lg-10 mx-auto text-center">
			<table class="table table-bordered">
				<thead class='thead-dark'>
					<tr>
						<th scope="col">Классы пожароопасных зон</th>
						<th scope="col" class="align-middle">Характеристика пожароопасных зон</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">
							<h3>П-I</h3>
						</th>
						<td class="text-left">Пространство в помещениях, в которых обращаются ГЖ (горючие жидкости) с температурой вспышки выше 61 °С</td>
					</tr>
					<tr>
						<th scope="row">
							<h3>П-II</h3>
						</th>
						<td class="text-left">
						Пространство в помещениях, в которых имеется горючая пыль или волокна с нижним концентрационным пределом распространения
						 пламени более 65 г/м<sup>3</sup> к объему воздуха
						</td>
					</tr>
					<tr>
						<th scope="row">
							<h3>П-IIa</h3>
						</th>
						<td class="text-left">Пространство в помещениях, в которых обращаются твердые или волокнистые, не переходящие во взвешенное состояние, горючие вещества,
						материалы
						</td>
					</tr>
					<tr>
						<th scope="row">
							<h3>П-III</h3>
						</th>
						<td class="text-left">
						Пространство вне помещений, в которых обращаются горючие жидкости с температурой вспышки выше 61 °С или твердые, 
						в том числе и волокнистые, горючие материалы
						</td>
					</tr>
				</tbody>
			</table>
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
</body>
</html>