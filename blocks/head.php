<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link rel="icon" href="http://raschets.ru/img/icons/favicon.ico" type="image/x-icon" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0" />

<!-- CSS  -->
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">

<?php
		$path = '';	
		if ($_SERVER['DOCUMENT_ROOT'] == "C:/xampp/htdocs") {
			$path = "http://localhost/raschets/css/style.css";
		} else {
			$path = "http://raschets.ru/css/style.css";
		}
?>  
<link href=<?php echo $path  ?>   type="text/css" rel="stylesheet" media="screen,projection" />
