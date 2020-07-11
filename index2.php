<!DOCTYPE html>
<html lang="en">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0" />
  <title>Расчеты по ПБ</title>

  <!-- CSS  -->
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link href="css/materialize.css" type="text/css" rel="stylesheet" media="screen,projection" />
  <link href="css/style.css" type="text/css" rel="stylesheet" media="screen,projection" />
</head>

<body id="bodyk1">
  <nav class="light-blue lighten-1" role="navigation">
    <div class="nav-wrapper container"><a id="logo-container" href="#" class="brand-logo">Logo</a>
      <ul class="right hide-on-med-and-down">
        <li><a href="#">Navbar Link</a></li>
      </ul>

      <ul id="nav-mobile" class="sidenav">
        <li><a href="#">Navbar Link</a></li>
      </ul>
      <a href="#" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
    </div>
  </nav>

  <div class="container">
  
  
  <form id="form_submit" method="post" action="http://raschets.ru/php/file-handler1.php" enctype="multipart/form-data">
 
    <div class="row">
          <div class="input-field col s6">
            <i class="material-icons prefix">account_circle</i>
            <input id="i_fio" type="text" class="validate" name="fio">
            <label for="i_fio">Ф.И.О. заказчика</label>
          </div>
          <div class="input-field col s6">
            <i class="material-icons prefix">phone</i>
            <input id="i_phone" type="tel" class="validate" name="phone">
            <label for="i_phone">Контактный тел.</label>
          </div>
    </div>

    <div class="row">
          <div class="input-field col s6">
            <i class="material-icons prefix">home</i>
            <input id="i_address" type="text" class="validate" name="address">
            <label for="i_address">Адрес проживания</label>
          </div>
          <div class="input-field col s6">
            <i class="material-icons prefix">mail</i>
            <input id="i_email" type="tel" class="validate" name="email">
            <label for="i_email">Email (если есть)</label>
          </div>
    </div>

    <div class="row">
          <div class="input-field col s3">
            <input id="sn_passport" type="text" class="validate" name="sn_passport_name">
            <label for="sn_passport">Серия и номер паспорта</label>
          </div>
          <div class="input-field col s9">
            <input id="data_passport" type="tel" class="validate" name="data_passport_name">
            <label for="data_passport">Кем и когда выдан</label>
          </div>
    </div>		
	
    <div class="file-field input-field">
      <div class="btn">
        <span>Скан  паспорта</span>
        <input type="file" name="inputfile" multiple>
      </div>
      <div class="file-path-wrapper">
        <input class="file-path validate" type="text" placeholder="Загрузите две последние страницы паспорта">
      </div>
    </div>
	
    <div class="file-field input-field">
      <div class="btn">
        <span>Генеральн. план</span>
        <input type="file" name="upload_plan" id="idPhoto1">
      </div>
      <div class="file-path-wrapper">
        <input class="file-path validate" type="text" placeholder="Загрузите генеральный или ситуационный план (схема размещения зданий)">
      </div>
    </div>
	
	<div class="file-field input-field">
      <div class="btn">
        <span>Доп. материалы</span>
        <input type="file" name="upload_dopmat" id="idPhoto2">
      </div>
      <div class="file-path-wrapper">
        <input class="file-path validate" type="text" placeholder="Загрузите дополн. материалы (фасады зданий, планировка, тех. характеристики и проч.)">
      </div>
    </div>
	
	<!-- ЗДАНИЯ -->
	
	<fieldset>
		<legend>Здание 1</legend>
		
		<div class="row">
			  <div class="input-field col s5">
				<input id="nameBuilding" type="text" class="validate" name="nameBuilding_name">
				<label for="nameBuilding">Наименование здания (дом, сарай, гараж и др.</label>
			  </div>
			  <div class="input-field col s7">
				<input id="addressBuilding" type="tel" class="validate" name="addressBuilding_name">
				<label for="addressBuilding">Адрес здания (либо номер позиции)</label>
			  </div>
		</div>	
		
		<div class="row">
		
		  <div class="input-field col s5">
			<select>
			  <option value="" disabled selected>Укажите материал наружных стен</option>
			  <option value="1">Кирпич</option>
			  <option value="2">Блоки ПГС (шлакоблоки)</option>
			  <option value="3">Древесина</option>
			  <option value="4">Другой материал (указать в комментариях)</option>
			</select>
			<label>Mатериал стен</label>
		  </div>
		  
		  <div class="input-field col s7">
			<input id="hBuilding" type="tel" class="validate" name="hBuilding_name">
			<label for="hBuilding">Высота здания (до конька крыши), м</label>
		  </div>
		</div>	
		
		<div class="file-field input-field">
		  <div class="btn">
			<span>Фото здания</span>
			<input type="file" name="inputfile" multiple>
		  </div>
		  <div class="file-path-wrapper">
			<input class="file-path validate" type="text" placeholder="Загрузите одно или несколько фото здания">
		  </div>
		</div>
		
	</fieldset>	

	<div id="div_btn">
		<center>
			<a class="waves-effect waves-light btn" id="btn_add"><i class="material-icons left">add_circle</i>Добавить здание</a>
		</center>
	</div>
	
	
	<!-- //ЗДАНИЯ -->

    <div class="row">
        <div class="row">
          <div class="input-field col s12">
            <textarea id="textarea1" class="materialize-textarea" name="comment"></textarea>
            <label for="textarea1">Комментарии к заказу</label>
          </div>
        </div>
    </div>
    <button id="bt_submit" class="btn waves-effect waves-light" type="submit" name="action">Submit
      <i class="material-icons right">send</i>
    </button>
	
	</form>
	
	
  </div> <!--container-->


  <!--  Scripts-->
  <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
  <script src="js/materialize.js"></script>
  <script src="js/init.js"></script>
  <script src="js/myMain.js"></script>

</body>

</html>