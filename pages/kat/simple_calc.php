<!DOCTYPE html>
<html lang="en">

<head>
	<?php include ("../../blocks/head.html") ?><!-- CSS meta -->
	<link rel="stylesheet" href="../../css/bootstrap-select.min.css">	

	<title>Категории помещений</title>
</head>

<body style="background: url(../../img/fon_pesok.png)">

<main>
<!-- -->
 <div class="container-fluid">
	<div class="row">
		<div id="myTitle" class='col col-md-12 text-center bg-secondary text-white mt-0'>
			<h6>Упрощенный расчет категории помещений по пожарной опасности (для определения катагорий В1-В4, Д)</h6>
		</div>
	</div>
	
	<div class="row m-2">	
		<div class="col-lg-10 mx-auto text-center" id="stage">
		</div>
	</div>

 </div> <!--container-->

<!-- Modal: УЧАСТКИ -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Справка</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>В помещении горючие материалы могут хранится на 1-ом и более участков. Минимальная площадь участка составляет 10 м<sup>2</sup>, 
		в т.ч. если площадь помещения менее 10 м<sup>2</sup>.</p> 
		<p>Если расстояние между участками хранения горючих материалов составляет менее 1 м, то необходимо рассматривать эти участки как один участок.</p>
		<p>Определение пожароопасной категории помещения осуществляется путем сравнения <strong>максимального</strong> значения удельной 
		временной пожарной нагрузки на любом из участков с табличными значениями для категорий В1-В4.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
      </div>
    </div>
  </div>
</div>


<!-- Modal: confirm -->
<div class="modal fade" id="modal_confirm_if" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Вопрос</h5>
        </button>
      </div>
      <div class="modal-body questionUser">
      </div>
      <div class="modal-footer">
		<button type="button" class="btn btn-success modal_confirm_if_yes" data-dismiss="modal">Да</button>
		<button type="button" class="btn btn-secondary modal_confirm_if_no" data-dismiss="modal">Нет</button>
      </div>
    </div>
  </div>
</div>


</main>
  <?php include ("../../blocks/scripts.html") ?><!--  Bootstrap -->
 	<script src="../../js/bootstrap-select.min.js"></script>

	<script src="../../db/tv.js"></script> <!--подключаем данные -->
	<script src="../../js/kat/boot.js"></script>
	<script src="../../js/kat/simple_calc/plot.js"></script>
	<script src="../../js/kat/simple_calc/main.js"></script>
 

</body>
</html>