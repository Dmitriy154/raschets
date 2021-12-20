<?php
require_once 'vendor/autoload.php';
$temp = new \PhpOffice\PhpWord\TemplateProcessor('./files/template_tp.docx');

//$postData = file_get_contents('php://input'); // строка в формате JSON - {"city":"Minsk","prim":"Примечание"}
//$data = json_decode($postData, true); //массив данных -  $data['city']; //Minsk
//var_dump($_FILES); 
var_dump($_POST);
echo '</br>\n';
$data = $_POST['data'];
$d = json_decode($data, true);


echo $d['arrZd'][0][2]; //блочные

/*
echo $d['prim']; //Общее примечание
echo count($d['napr'][1][3]); //длина массива (если несколько ИП было)

array(1) { ["data"]=> string(539)"{
"city":"Гомель",
"prim":"заборов нет",
"arrZd":[[5.5,2.5,"блочные","реконструкция"],[3,0,"кирпичные",""]],
"napr":[
		["жилой дом, советская 1","гараж, советская 2",5,[{"num":1,"w":4,"h":2,"r":5,"x":0,"y":0,"a":0,"phi":0.09008}],0.085,13900,8245],
		["гараж, советская 2","жилой дом, советская 1",5,[{"num":1,"w":2,"h":2,"r":5,"x":0,"y":0,"a":0,"phi":0.04784},{"num":2,"w":1,"h":1,"r":5,"x":2,"y":2,"a":0,"phi":0.01006}],0.057,13900,5529]]}
"}
*/


//echo count($_FILES['canvas_field']['name']); //количество картинок
/*

// Загрузка файла и вывод сообщения
// $$$$$$$$$$ сделать папку с рандомным именем
mkdir('upload');
$path = "upload/";
//все канвасы помещаются во временную папку
foreach ($_FILES["canvas_field"]["error"] as $key => $error) {
	if ($error == UPLOAD_ERR_OK) {
		$tmp_name = $_FILES["canvas_field"]["tmp_name"][$key];
		$name = $path . $_FILES["canvas_field"]["name"][$key];
		move_uploaded_file($tmp_name, "$name");
	}
}
*/








/*
$document->setValue('nomerD', $_POST['nomerD']);
$document->setValue('hours', $_POST['hours']);

$hours = $_POST['hours'];
$min = $hours*60;
$sum = $hours*11.36;
$summa = 'summa';

switch ($hours) {
	case 1: 
		$summa = '11,36 (одиннадцать рублей 36 копеек)'; 
		break;
	case 2: 
		$summa = '22,72 (двадцать два рубля 72 копейки)'; 
		break;
	case 34: 
		$summa = '386,24 (триста восемьдесят шесть рублей 24 копейки)'; 
		break;
}

$document->setValue('min', $min);
$document->setValue('sum', $sum);
$document->setValue('summa', $summa);

$outputFile = $_POST['nomerD'].' '. $_POST['name'].' '.$sum. '.docx'; // имя документа с учетом номера
$document->saveAs($outputFile);

// Имя скачиваемого файла
$downloadFile = $outputFile;

// Контент-тип означающий скачивание
header("Content-Type: application/octet-stream");

// Размер в байтах
header("Accept-Ranges: bytes");

// Размер файла
header("Content-Length: ".filesize($downloadFile));

// Расположение скачиваемого файла
header("Content-Disposition: attachment; filename=".$downloadFile);  

// Прочитать файл
readfile($downloadFile);

//удаление файлов
unlink($outputFile);
*/



/*
$uploadFile = $uploadDir . '\\' . basename($_FILES['file']['name']);
move_uploaded_file($_FILES['file']['tmp_name'], $uploadFile);
$document->setImageValue('image', array('path' => $uploadFile, 'width' => 120, 'height' => 120, 'ratio' => false));
*/