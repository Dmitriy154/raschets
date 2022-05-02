<?php
require_once 'vendor/autoload.php';

$tempDoc = new \PhpOffice\PhpWord\TemplateProcessor('./files/formula.docx');

//$phpWord = new \PhpOffice\PhpWord\PhpWord();
//$section = $phpWord->addSection();

//$fontStyle = new \PhpOffice\PhpWord\Style\Font();

//$section->addText('"Первый абзац" '. '(дополнение');
//$section->addText('Второй абзац бз кавычек' . '(Dmitriy Afanasov Григорьевич который)', array('name' => 'Tahoma', 'size' => 15) );

/*
$fontStyle->setBold(true);
$fontStyle->setName('Tahoma');
$fontStyle->setSize(13);
$myTextElement = $section->addText('"Третий абзац" (Theodor Roosevelt)');
$myTextElement->setFontStyle($fontStyle);


//список $section->addListItem($text, [$depth], [$fontStyle], [$listStyle], [$paragraphStyle]);
$listStyle = 'TYPE_BULLET_FILLED';
$section->addListItem('Первый', 0, null, null, array('spaceBefore' => 0, 'spaceAfter' => 0));
$section->addListItem('Второй', 0, null, null, array('spaceBefore' => 0, 'spaceAfter' => 0));
$section->addListItem('Четвертый', 0, null, null, array('spaceBefore' => 0, 'spaceAfter' => 0));

//таблица
$section->addText('Таблица');

$tableStyle = array(
    'borderColor' => '#000050',
    'borderSize'  => 2,
    'cellMargin'  => 25
);

$firstRowStyle = null;
$phpWord->addTableStyle('myTable', $tableStyle, $firstRowStyle);

$table = $section->addTable('myTable');
$rowStyle = array('borderBottomSize' => 14);

$table->addRow(null, $rowStyle);

$cellStyle = array('valign' => 'center'); //array

$table->addCell(2000, $cellStyle)->addText("ячейка 1");
$table->addCell(7000, $cellStyle)->addText("ячейка 2");
$table->addCell(2000, array('valign' => 'both'))->addText("ячейка 3");

$table->addRow(20, $rowStyle);
$table->addCell(2000, $cellStyle)->addText("ячейка 1");
$table->addCell(7000, $cellStyle)->addText("ячейка 2");
$table->addCell(2000, null)->addText("ячейка 3");

//png
//$section->addText('Вставка картинки');
//$section->addImage('upload/canvas0.png',array('align' => 'center', 'width' => 400));

//перенос строки, num - по умолч. 1 (количество строк переноса)
$section->addTextBreak(2); 

//разрыв страницы
$section->addPageBreak();
*/

$tempDoc->setValue('data', $tempDoc->cloneBlock('block_name', 1, true, false));
$tempDoc->setValue('d', '98765432');
$tempDoc->cloneBlock('main', 0); //удаляем ненужный блок

//вставляем строки в таблицу с необходимымии значениями
$values = [
    ['userId' => 1, 'walls' => 'блочные', 'hz' => '5,2', 'hk' => '3.0', 'prim' => 'реконструкция'],
    ['userId' => 2, 'walls' => 'кирпичные', 'hz' => '4,0', 'hk' => '3.0', 'prim' => ''],
	['userId' => 3, 'walls' => 'деревянные', 'hz' => '6,0', 'hk' => '', 'prim' => 'крыша плоская']
];
$tempDoc->cloneRowAndSetValues('userId', $values);

$tempDoc->saveAs('formulaSaved.docx');


// Saving the document as OOXML file...
//$objWriter = \PhpOffice\PhpWord\IOFactory::createWriter($phpWord, 'Word2007');
//$objWriter->save('word.docx');