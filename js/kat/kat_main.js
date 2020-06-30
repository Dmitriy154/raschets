let str_1 = cr(stage, 'div', 'row m-3 p-1');
let col_11 = cr(str_1, 'div', 'col-lg-6 mx-auto');

//list
let list_1 = cr(col_11, 'ul', 'list-group hover shadow p-1 mb-1 bg-white rounded');
list_1.innerHTML = `
    <a href="pages/kat/terms.php"><li class="list-group-item list-group-item-action" id='li_termin'>Термины и определения</li></a>
    <a href="pages/kat/general.php"><li class="list-group-item list-group-item-action" id='li_polog'>Общие положения</li></a>
    <a href="pages/kat/table.php"><li class="list-group-item list-group-item-action" id='li_table'>Категории помещений (таблицы)</li></a>
    <a href="pages/kat/method_a.php"><li class="list-group-item list-group-item-action" id='li_method_a'>Методика расчета взрывоопасной категории</li></a>
    <a href="pages/kat/method_b.php"><li class="list-group-item list-group-item-action" id='li_method_b'>Методика расчета пожароопасной категории</li></a>
    <a href="pages/kat/example.php"><li class="list-group-item list-group-item-action" id='li_example'>Примеры определения категорий помещений</li></a>
    <a href="pages/kat/data_i.php"><li class="list-group-item list-group-item-action" id='li_data_ind'>Справочник. Индивидуальные вещества</li></a>
    <a href="pages/kat/data_t.php">	<li class="list-group-item list-group-item-action" id='li_data_tepl'>Справочник. Низшая теплота сгорания  веществ и материалов</li></a>
    <a href="pages/kat/table_pue1.php"><li class="list-group-item list-group-item-action" id='li_data_pue_1'>Классы взрывоопасных зон по ПУЭ</li></a>
    <a href="pages/kat/table_pue2.php"><li class="list-group-item list-group-item-action" id='li_data_pue_2'>Классы пожароопасных зон по ПУЭ</li></a>
    
`

list_1.id = 'list_1';

let str_2 = cr(stage, 'div', 'row m-3 p-1');
let col_21 = cr(str_2, 'div', 'col-lg-4 mx-auto');
let bt_1 = cr(col_21, 'button', 'btn btn-primary btn-lg btn-block', 'Приступить к расчету');

let str_3 = cr(stage, 'div', 'row m-3 p-1');
let col_31 = cr(str_3, 'div', 'col-lg-4 mx-auto');
let bt_2 = cr(col_31, 'button', 'btn btn-secondary btn-lg btn-block', 'Упрощенный расчет для категории В1-В4, Д');

bt_1.addEventListener('click', ()=> alert('Данный раздел находится в разработке'));
bt_2.addEventListener('click', ()=> location.href = 'pages/kat/simple_calc.php');



