//Объект участки
const Plot = function (options) {
    this.sq = options.sq
    this.tb = options.tb
}


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
  


//участок №1
const plot_1 = new Plot({sq:'', tb:''});

let row_3 = cr(stage,'div','form-group row m-3 p-1 justify-content-center');
    let _card1 = cr(row_3, 'div', 'card col-9 p-0');
        let _header1 = cr(_card1, 'div','card-header container-fluid m-0', "Участок №1 ");
        _header1.innerHTML += '<img type="button" data-toggle="modal" data-target="#exampleModal" src="../../img/icons/question.png"></img>';  

        let _body1 = cr(_card1, 'div','card-body p-1');
            let row_31 = cr(_body1,'div', 'form-group row p-1');
                let label_3 = cr(row_31, 'label', 'col-sm-6 col-form-label border-bottom text-right', "Площадь участка (хранения)");
                    label_3.innerHTML += ", м<sup>2</sup>";
                let col_31 = cr(row_31, 'div', 'col-sm-4');
               plot_1.sq = cr(col_31, 'input', 'form-control');
               plot_1.sq.type = 'number';
            
            let row_32 = cr(_body1,'div', 'row p-1 mx-auto text-center justify-content-center');


                //https://developer.snapappointments.com/bootstrap-select
                let formSpisok = cr(row_32, 'form');
                formSpisok.innerHTML = `
                <div class="input-group mb-1">
                    

                    <select id="select1" class="selectpicker" data-style="btn-primary" data-width="360px" multiple data-live-search="true" title="Выберите горючие материалы на участке:">
                        <option data-subtext="13.8">Древесина</option>
                        <option data-subtext="47.14">Полиэтилен</option>
                        <option data-subtext="13.4">Бумага</option>
                        <option data-subtext="33,0">Резина</option>
                        <option data-subtext="25,1">Бензин</option>
                        <option>Другиеr</option>
                    </select>
                          
                    <div class="input-group-append ml-1">
                        <button class="btn btn-outline-primary" type="button" id="btn_table">Добавить</button>
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
                        let _tbody = cr(_table,'tbody');

                //строка для кнопки очистить таблицу
                let row_btn_clr_table = cr(_body1,'div', 'row p-1 mx-auto text-center justify-content-center');
                    let btn_clr = cr(row_btn_clr_table, 'button', 'btn btn-outline-primary', 'Очистить таблицу');
                        btn_clr.type = 'button';

                 //скрываем таблицу и кнопку "Очистить таблицу"
                _table.style = "display:none"; 
                btn_clr.style = "display:none";    
                


//кнопка добавить в таблицу
btn_table.addEventListener('click', () => {

    //если выбран какой-либо материал, то создаем таблицу и заполняем ее
    if (select1.selectedIndex >= 0) {

        _table.style = "display:block";
        btn_clr.style = "display:block";

        // получаем все выбранные значения из select с multiple
        let selected = Array.from(select1.options)
        .filter(option => option.selected)
        .map(option => option.value);

        //получаем теплоту сгорания выбранных материалов
        let selected_t = Array.from(select1.options)
        .filter(option => option.selected)
        .map(option => option.dataset.subtext);

        //создаем строки и заполняем строки
        selected.forEach((item, i)=> {
            let _tr = cr(_tbody,'tr');
                let _td2 = cr(_tr, 'td', '', item);
                let _td3 = cr (_tr,'td', '', selected_t[i]);
        });

        //узнаем количество строк selected.length
        for (let i=0; i<selected.length; i++ ) {
        }



    }
  
btn_clr.addEventListener('click', () =>{
    _tbody.innerHTML = '';
});




    //создаем таблицу если есть выбранные варианты https://bootstrap-4.ru/docs/4.5/content/tables/#borderless-table
    //tr - строка, td - столбец
        
    //cr(cr(_table, 'tr'), 'td');





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