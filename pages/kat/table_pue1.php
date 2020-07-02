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
			<h4 class='text-primary'>Таблица. Классификация взрывоопасных зон по ПУЭ</h4>
		</div>	
	</div>

	<!-- Талица -->
	<div class="row m-2">
		<div class="col-lg-10 mx-auto text-center">
			<table class="table table-bordered">
				<thead class='thead-dark'>
					<tr>
						<th scope="col">Класс взрывоопасных зон</th>
						<th scope="col" class="align-middle">Характеристика взрывоопасных зон</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">
							<h3>B-I</h3>
						</th>
						<td class="text-left">Пространство в помещениях, в которых выделяются ГГ (горючие газы) или пары ЛВЖ в таком количестве 
							и с такими свойствами, что они могут образовать с воздухом взрывоопасные смеси при нормальных 
							режимах работы, например при загрузке или разгрузке технологических аппаратов, хранении или переливании ЛВЖ,
							находящихся в открытых емкостях, и т. п.</td>
					</tr>
					<tr>
						<th scope="row">
							<h3>B-Ia</h3>
						</th>
						<td class="text-left">Пространство в помещениях, в которых при нормальной эксплуатации взрывоопасные смеси ГГ (независимо от нижнего
							 концентрационного предела воспламенения) или паров ЛВЖ с воздухом не образуются, а возможны только в результате
							аварий или неисправностей.</td>
					</tr>
					<tr>
						<th scope="row">
							<h3>B-Iб</h3>
						</th>
						<td class="text-left">Пространство в помещениях, в которых при нормальной эксплуатации взрывоопасные смеси ГГ или паров ЛВЖ с воздухом 
						не образуются, а возможны только в результате аварий или неисправностей и которые отличаются одной из следующих особенностей:
							<ol>
								<li>ГГ в этих зонах обладают высоким нижним концентрационным пределомоспламенения (15% и более) и резким запахом
								 при предельно допустимых концентрациях по ГОСТ 12.1.005-88 (например, машинные залы аммиачных компрессорных и 
								 холодильных абсорбционных установок);</li>
								<li>помещения производств, связанных с обращением газообразного водорода, в которых по условиям технологического
								 процесса исключается образование взрывоопасной смеси в объеме, превышающем 5% свободного объема помещения, имеют 
								 взрывоопасную зону только в верхней части помещения. Взрывоопасная зона  условно принимается от отметки 0,75 общей
								  высоты помещения, считая от уровня пола, но не выше кранового пути, если таковой имеется (например, помещения
								   электролиза воды, зарядные станции тяговых и статерных аккумуляторных батарей).</li>
							</ol>
							<p>Пункт 2 не распространяется на электромашинные помещения с турбогенераторами с водородным охлаждением при условии 
							обеспечения электромашинного помещения вытяжной вентиляцией с естественным побуждением; эти электромашинные помещения 
							имеют нормальную среду.</p>
							<p>К классу В-IБ относятся также зоны лабораторных и других помещений, в которых ГГ и ЛВЖ имеются в небольших количествах, 
							недостаточных для создания взрывоопасной смеси в объеме, превышающем 5% свободного объема помещения, и в которых работа с 
							ГГ и ЛВЖ производится без применения открытого пламени. Эти зоны не относятся к взрывоопасным, если работа с ГГ и ЛВЖ 
							производится в вытяжных шкафах или под вытяжными зонтами.</p>
						</td>
					</tr>
					<tr>
						<th scope="row">
							<h3>B-Iг</h3>
						</th>
						<td class="text-left">
							<p>Пространства у наружных установок: технологических установок, содержащих ГГ или ЛВЖ (за исключением наружных аммиачных
							 компрессорных установок, выбор электрооборудования для которых производится согласно 7.3.64 ПУЭ), надземных и подземных
							  резервуаров с ЛВЖ или горючими газами (газгольдеры), эстакад для слива и налива ЛВЖ, открытых нефтеловушек, 
							  прудов-отстойников с плавающей нефтяной пленкой и т. п.</p>
							<p>К зонам класса В-Iг также относятся:</p>
							<ul>
								<li>пространства у проемов за наружными ограждающими конструкциями помещений со взрывоопасными зонами классов В-I, В-Iа и В-II (исключение — проемы окон с заполнением стеклоблоками);</li>
								<li>пространства у наружных ограждающих конструкций, если на них расположены устройства для выброса воздуха из систем вытяжной вентиляции помещений со взрывоопасными зонами любого 
								класса или если они находятся в пределах наружной взрывоопасной зоны;</li>
								<li>пространства у предохранительных и дыхательных клапанов емкостей и технологических аппаратов с горючими газами и ЛВЖ.</li>
							</ul>
						</td>
					</tr>
					<tr>
						<th scope="row">
							<h3>B-II</h3>
						</th>
						<td class="text-left">Пространство в помещениях, в которых выделяются переходящие во взвешенное состояние горючие пыли
						 или волокна в таком количестве и с такими свойствами, что они способны образовать с воздухом взрывоопасные смеси при
						  нормальных режимах работы (например, при загрузке и разгрузке технологических аппаратов).</td>
					</tr>
					<tr>
						<th scope="row">
							<h3>B-IIa</h3>
						</th>
						<td class="text-left">Пространство в помещениях, в которых опасные состояния, указанные для зоны В-II, не имеют места 
						при нормальной эксплуатации, а возможны только в результате аварий или неисправностей.</td>
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