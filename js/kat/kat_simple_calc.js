//переменные участков
let sq = []; //площадь хранения участков
let tb = []; //таблицы участков


let form1 = cr(stage,'form');
    let row_1 = cr(form1, 'div', 'form-group row m-3 p-1 justify-content-center');
        let label_1 = cr(row_1, 'label', 'col-sm-3 col-form-label border-bottom text-right', "Наименование помещения");
        let col_11 = cr(row_1, 'div', 'col-sm-3',);
            let input1 = cr(col_11, 'input', 'form-control');
            input1.type = 'text';


    let row_2 = cr(form1, 'div', 'form-group row m-3 p-1 justify-content-center');
        let label_2 = cr(row_2, 'label', 'col-sm-3 col-form-label border-bottom text-right');
        label_2.innerHTML = "Площадь помещения, м<sup>2</sup>";

        let col_21 = cr(row_2, 'div', 'col-sm-3',);
            let input2 = cr(col_21, 'input', 'form-control');
            input2.type = 'number';
  

//участки
let row_3 = cr(stage,'div','form-group row m-3 p-1 justify-content-center');
    let _card1 = cr(row_3, 'div', 'card col-9 p-0');
        let _header1 = cr(_card1, 'div','card-header container-fluid m-0', "Участок №1 ");
        _header1.innerHTML += '<img type="button" data-toggle="modal" data-target="#exampleModal" src="../../img/icons/question.png"></img>';  

        let _body1 = cr(_card1, 'div','card-body p-1');
            let row_31 = cr(_body1,'div', 'form-group row m-2 p-1');
                let label_3 = cr(row_31, 'label', 'col-sm-6 col-form-label border-bottom text-right', "Площадь участка (хранения)");
                    label_3.innerHTML += ", м<sup>2</sup>";
                let col_31 = cr(row_31, 'div', 'col-sm-6');
               sq[0] = cr(col_31, 'input', 'form-control');
               sq[0].type = 'number';
            
            let row_32 = cr(_body1,'div', 'row p-1 mx-auto text-center justify-content-center');


                //https://developer.snapappointments.com/bootstrap-select
                let formSpisok = cr(row_32, 'form');
                formSpisok.innerHTML = `
                <div class="input-group mb-3">
                    

                    <select id="select1" class="selectpicker form-control" multiple data-live-search="true" title="Выберите горючие материалы на участке:">
                        <option data-subtext="13.8">Древесина</option>
                        <option data-subtext="47.14">Полиэтилен</option>
                        <option data-subtext="13.4">Бумага</option>
                        <option data-subtext="33,0">Резина</option>
                        <option data-subtext="25,1">Бензин</option>
                        <option>Другиеr</option>
                    </select>
                          
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" id="btn_table">Добавить</button>
                    </div>

                </div>
                `;
                //строка для таблицы
                let row_33 = cr(_body1,'div', 'row p-1 mx-auto text-center justify-content-center');
                    let _table = cr(row_33, 'table', 'table table-border');
                        let _thead = cr(_table, 'thead', 'thead-dark');
                        _thead.innerHTML = `
                            <tr>
                                <th>Наименование горючего материала (вещества)</th>
                                <th>Низшая теплота сгорания Q<sup>p</sup><sub>H</sub>, МДж/кг</th>
                                <th>Масса, кг</th>
                                <th>Общая пож. нагрузка участка, МДж</th>                           
                            </tr>
                        `
                       
                

//кнопка добавить в таблицу
btn_table.addEventListener('click', () => {
    
    // получаем все выбранные значения из select с multiple
    let selected = Array.from(select1.options)
    .filter(option => option.selected)
    .map(option => option.value);
    console.log(selected);

    //получаем теплоту сгорания выбранных материалов
    let selected_t = Array.from(select1.options)
    .filter(option => option.selected)
    .map(option => option.dataset.subtext);
    //console.log(selected_t);

    //создаем таблицу если есть выбранные варианты https://bootstrap-4.ru/docs/4.5/content/tables/#borderless-table
    //tr - строка, td - столбец
        
    //cr(cr(_table, 'tr'), 'td');


    selected.forEach((item, i)=> {
        let _tr = cr(_table,'tr');
            let _td2 = cr(_tr, 'td', '', item);
            let _td3 = cr (_tr,'td', '', selected_t[i]);
    });


    //узнаем количество строк selected.length
    for (let i=0; i<selected.length; i++ ) {
    }
});



                
                
//инициализируем мультисписок              
$('select').selectpicker();
            




/*
<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
  <label class="form-check-label" for="defaultCheck1">
    Default checkbox
  </label>
</div>
*/

/*
var expanded = false; 
function showCheckboxes() { var checkboxes = document.getElementById("checkboxes"); 
if (!expanded) { 
    checkboxes.style.display = "block"; expanded = true; 
} else { checkboxes.style.display = "none"; expanded = false; } 
} 

.multiselect { width: 200px; } .selectBox { position: relative; } .selectBox select { width: 100%; font-weight: bold; } .overSelect { position: absolute; left: 0; right: 0; top: 0; bottom: 0; } #checkboxes { display: none; border: 1px #dadada solid; } #checkboxes label { display: block; } #checkboxes label:hover { background-color: #1e90ff; } 
<form> <div class="multiselect"> <div class="selectBox" onclick="showCheckboxes()"> <select> <option>Select an option</option> </select> <div class="overSelect"></div> </div> <div id="checkboxes"> <label for="one"> <input type="checkbox" id="one" />First checkbox</label> <label for="two"> <input type="checkbox" id="two" />Second checkbox</label> <label for="three"> <input type="checkbox" id="three" />Third checkbox</label> </div> </div> </form> 

*/


//https://stackoverflow.com/questions/17714705/how-to-use-checkbox-inside-select-option