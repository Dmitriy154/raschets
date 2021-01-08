<?php
require_once 'vendor/autoload.php';

$document = new \PhpOffice\PhpWord\TemplateProcessor('./files/template_dog_ry.docx');

$document->setValue('nomerD', $_POST['nomerD']);
$document->setValue('dateD', $_POST['dateD']);
$document->setValue('name', $_POST['name']);
$document->setValue('name_r', $_POST['name_r']);
$document->setValue('dolgn', $_POST['dolgn']);
$document->setValue('dolgn_r', $_POST['dolgn_r']);
$document->setValue('org', $_POST['org']);
$document->setValue('osnov', $_POST['osnov']);
$document->setValue('usluga', $_POST['usluga']);
$document->setValue('address', $_POST['address']);
$document->setValue('hours', $_POST['hours']);
$document->setValue('rekv', $_POST['rekv']);

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
	case 3: 
		$summa = '34,08 (тридцать четре рубля 08 копеек)'; 
		break;
	case 4: 
		$summa = '45,44 (сорок пять рублей 44 копейки)'; 
		break;
	case 5: 
		$summa = '56,80 (пятьдесят шесть рублей 80 копеек)'; 
		break;
	case 6: 
		$summa = '68,16 (шестьдесят восемь рублей 16 копеек)'; 
		break;
	case 7: 
		$summa = '79,52 (семьдесят девять рублей 52 копейки)'; 
		break;
	case 8: 
		$summa = '90,88 (девяносто рублей 88 копеек)'; 
		break;
	case 9: 
		$summa = '102,24 (сто два рубля 24 копейки)'; 
		break;
	case 10: 
		$summa = '113,60 (сто тринадцать рублей 60 копеек)'; 
		break;
	case 12: 
		$summa = '136,32 (сто тридцать шесть рублей 32 копейки)'; 
		break;
	case 14: 
		$summa = '159,04 (сто пятьдесят девять рублей 04 копейки)'; 
		break;
	case 16: 
		$summa = '181,76 (сто восемьдесят один рубль 76 копеек)'; 
		break;
	case 18: 
		$summa = '204,48 (двести четыре рубля 48 копеек)'; 
		break;
	case 22: 
		$summa = '249,92 (двести сорок девять рублей 92 копейки)'; 
		break;
	case 26: 
		$summa = '295,36 (двести девяносто пять рублей 36 копеек)'; 
		break;
	case 30: 
		$summa = '340,80 (триста сорок рублей 80 копеек)'; 
		break;
	case 34: 
		$summa = '386,24 (триста восемьдесят шесть рублей 24 копейки)'; 
		break;
	case 35: 
		$summa = '397,60 (триста девяносто семь рублей 60 копеек)'; 
		break;
	case 40: 
		$summa = '454,40 (четыреста пятьдесят четыре рубля 40 копеек)'; 
		break;
	case 45: 
		$summa = '511,20 (пятьсот одиннадцать рублей 20 копеек)'; 
		break;
	case 50: 
		$summa = '568,00 (пятьсот шестьдесят восемь рублей 00 копеек)'; 
		break;
	case 55: 
		$summa = '624,80 (шестьсот двадцать четыре рубля 80 копеек)'; 
		break;
	case 60: 
		$summa = '681,60 (шестьсот восемьдесят один рубль 60 копеек)'; 
		break;
	case 65: 
		$summa = '738,40 (семьсот тридцать восемь рублей 40 копеек)'; 
		break;
	case 70: 
		$summa = '795,20 (семьсот девяносто пять рублей 20 копеек)'; 
		break;
	case 75: 
		$summa = '852,00 (восемьсот пятьдесят два рубля 00 копеек)'; 
		break;
	case 80: 
		$summa = '908,80 (девятьсот восемь рублей 80 копеек)'; 
		break;
	case 85: 
		$summa = '965,60 (девятьсот шестьдесят пять рублей 60 копеек)'; 
		break;
	case 90: 
		$summa = '1022,40 (одна тысяча двадцать два рубля 40 копеек)'; 
		break;
	case 95: 
		$summa = '1079,20 (одна тысяча семьдесят девять рублей 20 копеек)'; 
		break;
	case 100: 
		$summa = '1136,00 (одна тысяча сто тридцать шесть рублей 00 копеек)'; 
		break;
	case 110: 
		$summa = '1249,60 (одна тысяча двести сорок девять рублей 60 копеек)'; 
		break;
	case 120: 
		$summa = '1363,20 (одна тысяча триста шестьдесят три рубля 20 копеек)'; 
		break;
	case 130: 
		$summa = '1476,80 (одна тысяча четыреста семьдесят шесть рублей 80 копеек)'; 
		break;
	case 140: 
		$summa = '1590,40 (одна тысяча пятьсот девяносто рублей 40 копеек)'; 
		break;
	case 150: 
		$summa = '1704,00 (одна тысяча семьсот четыре рубля 00 копеек)'; 
		break;
	case 160: 
		$summa = '1817,60 (одна тысяча восемьсот семнадцать рублей 60 копеек)'; 
		break;
	case 170: 
		$summa = '1931,20 (одна тысяча девятьсот тридцать один рубль 20 копеек)'; 
		break;
	case 180: 
		$summa = '2044,80 (две тысячи сорок четыре рубля 80 копеек)'; 
		break;
	case 190: 
		$summa = '2158,40 (две тысячи сто пятьдесят восемь рублей 40 копеек)'; 
		break;
	case 200: 
		$summa = '2272,00 (две тысячи двести семьдесят два рубля 00 копеек)'; 
		break;
	case 210: 
		$summa = '2385,60 (две тысячи триста восемьдесят пять рублей 60 копеек)'; 
		break;
	case 220: 
		$summa = '2499,20 (две тысячи четыреста девяносто девять рублей 20 '; 
		break;
}

$document->setValue('min', $min);
$document->setValue('sum', $sum);
$document->setValue('summa', $summa);

$outputFile = $_POST['nomerD'].' '. $_POST['org'].' '.$sum. '.docx'; // имя документа с учетом номера
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

