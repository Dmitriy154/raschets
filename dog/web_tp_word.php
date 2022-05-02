<?php
require_once 'vendor/autoload.php';
$temp = new \PhpOffice\PhpWord\TemplateProcessor('./files/template_tp.docx');
use PhpOffice\PhpWord\Element\Table;

//$postData = file_get_contents('php://input'); // строка в формате JSON - {"city":"Minsk","prim":"Примечание"}

##### ДАТА
$_monthsList = array(".01." => "января", ".02." => "февраля", ".03." => "марта", ".04." => "апреля", ".05." => "мая", ".06." => "июня",".07." => "июля", ".08." => "августа", ".09." => "сентября",".10." => "октября", ".11." => "ноября", ".12." => "декабря");
$currentDate = date("\"d\".m.Y"); //текущая дата в формате "22".07.2015
$_mD = date(".m."); //для замены
$currentDate = str_replace($_mD, " ".$_monthsList[$_mD]." ", $currentDate);
##### /ДАТА ##### ***********

/*
echo count($_FILES['canvas_field']['name']); //количество картинок
var_dump($_FILES);
echo '<br/>****';
*/

$data = $_POST['data'];
$d = json_decode($data, true);

# ПЕРЕМЕННЫЕ РАСЧЕТА
$numZd = count($d['arrZd']); // количество зданий
$numNapr = count($d['napr']); // количество направлений
$ip = $_SERVER['REMOTE_ADDR'];
$nameFolder = date("d.m_H.i.s").'_'.$ip; //уникальное название для временных папок файлов и выходного файла doc


# ВСТАВКА ВСЕХ ЗНАЧЕНИЙ
$temp->setValues(array(	'city' 		=> $d['city'],   
						'prim' 		=> $d['prim'] == '' ? '' : 'Примечание: ' . $d['prim'],
						'field_date'=> $currentDate));

//$temp->setValue('city', $d['city']);  //вставка одного значения


//создаем и заполняем массив названий зданий для титульника
$arrNameBuild = [];	
for ($i = 0; $i < $numZd; $i++)
{	$arrNameBuild[$i] = ['nameBuild' => $d['arrZd'][$i][4]]; }
$temp->cloneRowAndSetValues('nameBuild', $arrNameBuild);
//$temp->cloneRow('userId', 2); //клонировать строку таблицы 2 раза проставляя #1 #2


//вставляем строки в таблицу исходных данных с необходимымии значениями
$arrBuildTable = [];	
for ($i = 0; $i < $numZd; $i++){	
	$arrBuildTable[$i] = [	'buildTable' => $d['arrZd'][$i][4],
							'walls' => $d['arrZd'][$i][2],
							'hz' => $d['arrZd'][$i][0],
							'hk' => $d['arrZd'][$i][1],
							'primBuild' => $d['arrZd'][$i][3]]; 
}
$temp->cloneRowAndSetValues('buildTable', $arrBuildTable);

### КАРТИНКА ИЗ КАНВАС ##############
// Загрузка файла и вывод сообщения
//$$$$$$$$$$ сделать папку с рандомным именем, чтобы не было конфлитка!!!!!!!
mkdir('uploadTP/'.$nameFolder);
$path = 'uploadTP/'.$nameFolder."/";

//все канвасы помещаются во временную папку
foreach ($_FILES["canvas_field"]["error"] as $key => $error) {
	if ($error == UPLOAD_ERR_OK) {
		$tmp_name = $_FILES["canvas_field"]["tmp_name"][$key];
		$name = $path . $_FILES["canvas_field"]["name"][$key];
		move_uploaded_file($tmp_name, "$name");
	}
}

$uploadFile = $uploadDir . '\\' . basename($_FILES['file']['name']);
move_uploaded_file($_FILES['file']['tmp_name'], $uploadFile);
##### КАРТИНКА ИЗ КАНВАС ************

//вставляем строки в таблицу РАСЧЕТЫ
$arrTable = [];	

for ($i = 0; $i < $numNapr; $i++){
	$condition = ''; // условие

	if ($d['napr'][$i][6] < $d['napr'][$i][5]) {
		$condition = $d['napr'][$i][6] . '&lt;' . $d['napr'][$i][5]  . ' - соблюдается';
	} else {
		$condition = $d['napr'][$i][6] . '&gt;' . $d['napr'][$i][5]  . ' - не соблюдается';
	}
		
	$arrTable[$i] = [	'n_id' => $i+1,
						'napr1' => $d['napr'][$i][0],
						'napr2' => $d['napr'][$i][1],
						'rasst' => $d['napr'][$i][2],
						'ip' => $d['napr'][$i][7],
						'pp' => $d['napr'][$i][8] . ' (' . $d['napr'][$i][5],
						'phi' => $d['napr'][$i][4],
						'q' => $d['napr'][$i][6],
						'condition' => $condition,
						'scheme' => '${image'.$i.'}'];
	
}

$temp->cloneRowAndSetValues('n_id', $arrTable);

for ($i = 0; $i < $numNapr; $i++){
	$temp->setImageValue('image'.$i, array('path' => $path.'canvas'.$i.'.png', 'width' => 350, 'height' => 350, 'ratio' => true));
}

//$outputFile = 'расчет_'.$nameFile.'.docx';
$outputFile = $path.'raschet.docx';

$temp->saveAs($outputFile);

// Имя скачиваемого файла
$downloadFile = $outputFile;

echo 'https://raschets.ru/dog/'.$downloadFile; //отдаем ссылку на файл

//file_download($downloadFile);
/* Отдача файла через PHP 

function file_download($file) {
  if (file_exists($file)) {
    if (ob_get_level()) {
      ob_end_clean();
    }

    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename=' .$file);
    header('Content-Transfer-Encoding: binary');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($file));
    readfile($file);
    return [
		'status' => 'success',
		'message' => 'Файл успешно отдан'
	];
  }else {
	return [
		'status' => 'error',
		'message' => 'Файл не найден'
	];
  }
}
*/