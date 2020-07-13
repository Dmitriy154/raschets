//Объект участки
class Plot {
    sq = 10; //площадь участка
    gm = []; //горючие материалы участка
    Q = 0; //общая пожарная нагрузка участка
    q = 0; //удельная пожарная нагрузка участка
    bodyPost; 


constructor(num) {
    this.num = num; //номер участка

    let row_1 = cr(stage,'div','form-group row m-3 p-1 justify-content-center');
    let _card1 = cr(row_1, 'div', 'card col-9 p-0');
    let _header1 = cr(_card1, 'div','card-header container-fluid m-0');
        _header1.innerHTML += `Участок №${num}<img type="button" data-toggle="modal" data-target="#exampleModal" src="../../img/icons/question.png"></img>`;  

    this.bodyPost = cr(_card1, 'div','card-body p-1');
        let row_11 = cr(this.bodyPost,'div', 'form-group row p-1');
            let label_1 = cr(row_11, 'label', 'col-sm-6 col-form-label border-bottom text-right', "Площадь участка (хранения)");
                label_1.innerHTML += ", м<sup>2</sup>";
            let col_11 = cr(row_11, 'div', 'col-sm-4');
                let _sq = cr(col_11, 'input', 'form-control');
                    _sq.type = 'number';

            //площадь участка, обработка поля ввода
            _sq.addEventListener('input', (e)=> {
                
                if (e.target.value >= 10) {
                    this.sq = e.target.value;
                } else {
                    this.sq.sq = 10;
                }

                if(this.sq.Q >0)  sumPN(this.bodyPost); //расчет общей и удельной ПН 
            }); 

        let row_2 = cr(this.bodyPost,'div', 'row p-1 mx-auto text-center justify-content-center');

        //делаем список, формируем из базы данных
        //https://developer.snapappointments.com/bootstrap-select
            let formSpisok = cr(row_2, 'form');
                let df1 = cr(formSpisok, 'div', 'input-group mb-1');

                //Создаем select Выбор горючих материалов
                let select1 = cr(df1, 'select', 'selectpicker');
                    select1.dataset.width="360px";
                    select1.setAttribute('multiple', 'true');
                    select1.setAttribute('title', 'Выберите горючие материалы на участке:');
                    select1.setAttribute('data-live-search', 'true');

                //кнопка Добавить ГМ
                let btn_table = cr(df1, 'button', 'btn btn-outline-primary btn-sm ml-1', 'Добавить ГМ');
                    btn_table.type = 'button';

                //Кнопка Добавить другой ГМ
                let btn_table_other = cr(df1, 'button', 'btn btn-outline-secondary btn-sm ml-3', 'Добавить другой ГМ');
                    btn_table_other.type = 'button';
                    btn_table_other.setAttribute('title', 'Если вы не нашли в списке необходимый горючий материал, то добавьте в таблицу свои данные');
                    btn_table_other.dataset.toggle = 'tooltip';
                    btn_table_other.dataset.placement="top";

                //сортируем массив: создаем массив с распростр. веществами, сортир., соединяем
                let arrPop = [];

                //заполняем новый массив и удаляем объекты из старого, чтобы потом соединить их
                for (let i=0; i<tv.length; i++){
                    if (tv[i].prio>0) {
                        arrPop.push(tv[i]);
                        tv.splice(i,1);
                    };
                }

                //сортируем новый массив
                arrPop.sort((a,b) => {
                    return a.prio-b.prio;
                });
            
                //создаем массив из двух
                let arr = arrPop.concat(tv);

                // создание option в селекте
                arr.forEach((el) => {
                    if (el.Q_H) {
                        let opt = cr(select1, 'option', '', el.name);       
                        opt.dataset.subtext = el.Q_H;
                    }
                });


        //строка для таблицы
        let row_3 = cr(this.bodyPost,'div', 'row p-1 mx-auto text-center justify-content-center');
            let _table = cr(row_3, 'table', 'table table-border table-sm');
                let _thead = cr(_table, 'thead', 'thead-dark');
                    _thead.innerHTML = `
                        <tr>
                            <th>Наименование горючего материала (вещества)</th>
                            <th>Низшая теплота сгорания Q<sup>p</sup><sub>H</sub>, МДж/кг</th>
                            <th>Масса, кг</th>
                            <th>Пож. нагрузка горючего материала (вещества), МДж</th>                           
                        </tr>`
                let _tbody = cr(_table,'tbody');

        //строка для кнопки очистить таблицу
        let row_btn_clr_table = cr(this.bodyPost,'div', 'row p-1 mx-auto text-center justify-content-center');
            let btn_clr = cr(row_btn_clr_table, 'button', 'btn btn-outline-primary btn-sm', 'Очистить таблицу');
                btn_clr.type = 'button';

        //скрываем таблицу и кнопку "Очистить таблицу"
        _table.style = "display:none"; 
        btn_clr.style = "display:none";
           

//кнопка добавить другой ГМ
btn_table_other.addEventListener('click', () => {
    
    _table.style = "display:block";
    btn_clr.style = "display:block" ;
    
    //создаем строку и столбцы
    let _tr = cr(_tbody,'tr');
        let _td1 = cr(_tr, 'td');
        let _td2 = cr(_tr, 'td', 'align-middle');
        let _td3 = cr (_tr,'td','align-middle');
        let _td4 = cr(_tr, 'td','align-middle');

        _td1.innerHTML = `<input type="text" class="form-control text-center">`;
        _td2.innerHTML = `<input type="number" class="form-control text-center">`;
        _td3.innerHTML = `<input type="number" class="form-control text-center">`;

        _td2.addEventListener('input', (e)=> {
            if(e.target.value > 0 && _td3.lastChild.value) {
                _td4.textContent = Math.round(_td3.lastChild.value*e.target.value*100)/100;    //+num.toFixed(5)
            } else {
                _td4.textContent ='';
            }

            sumPN(_tbody); //расчет общей и удельной ПН
        });      
        
        _td3.addEventListener('input', (e)=> {
            if(e.target.value > 0 && _td2.lastChild.value) {
                _td4.textContent = Math.round(_td2.lastChild.value*e.target.value*100)/100;    //+num.toFixed(5)
            } else {
                _td4.textContent ='';
            }

            sumPN(_tbody); //расчет общей и удельной ПН
        });
        
        last_tr(this.bodyPost); //общая ПН и удельная ПН
});



//кнопка добавить в таблицу
btn_table.addEventListener('click', () => {

    //если выбран какой-либо материал, то создаем таблицу и заполняем ее
    if (select1.selectedIndex >= 0) {

        _table.style = "display:block";
        btn_clr.style = "display:block" ;

        // получаем все выбранные значения из select с multiple
        let selected = Array.from(select1.options)
        .filter(option => option.selected)
        .map(option => option.value);

        //получаем теплоту сгорания выбранных материалов
        let selected_t = Array.from(select1.options)
        .filter(option => option.selected)
        .map(option => option.dataset.subtext);

        //создаем строки и заполняем строки наименованиями горючих веществ
        selected.forEach((item, i)=> {

            let _tr = cr(_tbody,'tr');
                
                if(!arrPlot[0].gm.includes(item)) {
                    arrPlot[0].gm.push(item);//заполняем массив данных, которые заносятся в таблицу
                    let _td1 = cr(_tr, 'td', 'align-middle', item);
                    let _td2 = cr (_tr,'td', 'align-middle', selected_t[i]);
                    let _td3 = cr(_tr, 'td');
                        _td3.innerHTML = `<input type="number" class="form-control text-center">`;
                   
                        let _td4 = cr(_tr, 'td', 'align-middle');
                        
                    _td3.addEventListener('input', (e)=> {
                        if(e.target.value > 0) {
                            _td4.textContent = Math.round(selected_t[i]*e.target.value*100)/100;    //+num.toFixed(5)
                        } else {
                            _td4.textContent ='';
                        }

                        sumPN(_tbody); //расчет общей и удельной ПН
                    });    
                }
        });

        last_tr(this.bodyPost); //общая ПН и удельная ПН
    };
     
});



//кнопка "очистить таблицу"
btn_clr.addEventListener('click', () =>{
    _tbody.innerHTML = '';
    arrPlot[0].gm = [];
});


} //constructor

}//class



// Наименование помещения и Площадь помещения
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
//


//участок №1
let arrPlot = [];
arrPlot[0] = new Plot(1);
        


//последние две строки таблицы ОБЩАЯ и удельная ПН
function last_tr(_body) {
    //если создана таблица с классом tablePN, то повторно не создавать
    if (_body.querySelector('.tablePN') !== null) return;

    //делаем отдельную таблицу
    let row_tablePN = cr(_body, 'div', 'row p-1 mx-auto text-center justify-content-center');
        let _tablePN = cr(row_tablePN, 'table', 'table table-border table-sm tablePN');
            let _tbody = cr(_tablePN,'tbody');
                let _tr = cr(_tbody,'tr');

                    let _td1 = cr(_tr, 'td', 'align-middle');
                    _td1.innerHTML = `Общая пожарная нагрузка участка, МДж`;
                    _td1.setAttribute('colspan', '3');

                    let _td2 = cr(_tr, 'td', 'align-rigth');
                    _td2.textContent = arrPlot[0].Q;

                let _trq = cr(_tbody,'tr');
                    let _td11 = cr(_trq, 'td', 'align-middle');
                    _td11.innerHTML = `Удельная пожарная нагрузка участка, МДж/м<sup>2</sup>`;
                    _td11.setAttribute('colspan', '3');
                    let _td22 = cr(_trq, 'td', 'align-rigth');
                    _td22.textContent = arrPlot[0].q;

}



//суммируем общую пожарную нагузку
function sumPN(_tbody){
    let sum = _tbody.childNodes.length;

    this.Q = 0;
    this.q = 0;

    for(let i=0; i<sum; i++){
        //this.Q += Math.round(_tbody.childNodes[i].childNodes[3].textContent*100)/100;
    }
    
    //ячейка общая ПН
    
    //_tbody.childNodes[sum].childNodes[1].textContent = +arrPlot[0].Q.toFixed(2);

    //ячейка удельной ПН

    //_tbody.childNodes[sum+1].childNodes[1].textContent = +(arrPlot[0].Q/arrPlot[0].sq).toFixed(2);
}
 


//инициализируем мультисписок              
$('select').selectpicker();
            