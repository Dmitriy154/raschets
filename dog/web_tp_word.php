<?php
require_once 'vendor/autoload.php';

$document = new \PhpOffice\PhpWord\TemplateProcessor('./files/template_dogfiz_tp.docx');

$document->setValue('nomerD', $_POST['nomerD']);
$document->setValue('dateD', $_POST['dateD']);
$document->setValue('name', $_POST['name']);
$document->setValue('address1', $_POST['address1']);
$document->setValue('address2', $_POST['address2']);
$document->setValue('hours', $_POST['hours']);
$document->setValue('passport1', $_POST['passport1']);
$document->setValue('passport2', $_POST['passport2']);
$document->setValue('passport3', $_POST['passport3']);
$document->setValue('tel', $_POST['tel']);

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



/*
$uploadFile = $uploadDir . '\\' . basename($_FILES['file']['name']);
move_uploaded_file($_FILES['file']['tmp_name'], $uploadFile);
$document->setImageValue('image', array('path' => $uploadFile, 'width' => 120, 'height' => 120, 'ratio' => false));
*/