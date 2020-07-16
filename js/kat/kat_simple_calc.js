//Объект участки
class Plot {
    sq = 10; //площадь участка
    gm = []; //горючие материалы участка
    Q = 0; //общая пожарная нагрузка участка
    q = 0; //удельная пожарная нагрузка участка 
    H = 0; //минимальное расстояние до перекрытия
    value_Q = 0; //ссылка на ячейку Общей пожарной нагрузки
    value_q = 0;
    rowPost; // ссылка на row участка
    bodyPost; //ссылка на body участка

constructor(num) {
    this.num = num; //номер участка

    let row_1 = cr(stage,'div','form-group row m-3 p-1 justify-content-center');

    this.rowPost = row_1;

    let _card1 = cr(row_1, 'div', 'card col-9 p-0 border');
        let _header1 = cr(_card1, 'div','card-header container-fluid m-0');
            _header1.style = 'background-color: #bdbdbb';
       
        if(num == 1) {
            _header1.innerHTML += `Участок №${num}<img type="button" class='m-2' data-toggle="modal" data-target="#exampleModal" src="../../img/icons/question.png"></img>`;  
        } else {
            _header1.innerHTML += `Участок №${num}`; //для 2-го и др. участков кружок вопроса не нужно
        }


    let bodyPost = cr(_card1, 'div','card-body p-1');
        bodyPost.style = 'background-color: #fcffe0';
    this.bodyPost = bodyPost; //свойство объекта ссылается на переменную

        let row_11 = cr(bodyPost,'div', 'form-group row m-1');
            let label_1 = cr(row_11, 'label', 'col-sm-7 col-form-label text-right', "Площадь участка (хранения)");
                label_1.innerHTML += ", м<sup>2</sup>";
            let col_11 = cr(row_11, 'div', 'col-sm-2');
                let _sq = cr(col_11, 'input', 'form-control text-center');
                    _sq.type = 'number';

            //площадь участка, обработка поля ввода
            _sq.addEventListener('input', (e)=> {
                if (e.target.value >= 10) {
                    this.sq = e.target.value;
                } else {
                    this.sq = 10;
                }
                update(this);
            }); 

        let row_2 = cr(bodyPost,'div', 'row p-1 mx-auto text-center justify-content-center');

        //делаем список, формируем из базы данных
        //https://developer.snapappointments.com/bootstrap-select
            let formSpisok = cr(row_2, 'form');
                let df1 = cr(formSpisok, 'div', 'input-group mb-1');

                //Создаем select Выбор горючих материалов
                let select1 = cr(df1, 'select', 'selectpicker border');
                    select1.dataset.width="360px";
                    select1.setAttribute('multiple', 'true');
                    select1.setAttribute('title', 'Выберите горючие материалы на участке:');
                    select1.setAttribute('data-live-search', 'true');
                    
                //кнопка Добавить ГМ
                let btn_table = cr(df1, 'button', 'btn btn-outline-primary btn-sm ml-3', 'Добавить ГМ');
                    btn_table.setAttribute('title', 'Добавить горючий материал из списка');
                    btn_table.type = 'button';

                //Кнопка Добавить другой ГМ
                let btn_table_other = cr(df1, 'button', 'btn btn-outline-secondary btn-sm ml-3', 'Другой ГМ');
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

        //строка для таблицы 1
        let row_3 = cr(bodyPost,'div', 'row p-1 mx-auto text-center justify-content-center');
            let _table = cr(row_3, 'table', 'table table-border table-sm border mb-1');
                let _thead = cr(_table, 'thead', 'bg-light');
                    _thead.innerHTML = `
                        <tr>
                            <th class='align-middle'>Наименование горючего материала (вещества)</th>
                            <th class='align-middle'>Низшая теплота сгорания Q<sup>p</sup><sub>H</sub>, МДж/кг</th>
                            <th class='align-middle'>Масса, кг</th>
                            <th class='align-middle'>Пож. нагрузка горючего материала (вещества), МДж</th>                           
                        </tr>`
                let _tbody = cr(_table,'tbody');
                    _tbody.style = 'background-color: #fff';
        
        
        //строка для кнопки очистить таблицу
        let row_btn_clr_table = cr(bodyPost,'div', 'row m-1 mx-auto text-center justify-content-center');
            let btn_clr = cr(row_btn_clr_table, 'button', 'btn btn-outline-primary btn-sm', 'Очистить таблицу');
                btn_clr.type = 'button';

        //делаем отдельную таблицу для ОПН и УПН
        let row_tablePN = cr(bodyPost, 'div', 'row p-1 mt-2 mx-auto text-center justify-content-center');
            let _tablePN = cr(row_tablePN, 'table', 'table table-success table-border');
                let _tbodyPN = cr(_tablePN,'tbody', 'border');                  
                
                    let _trQ = cr(_tbodyPN,'tr');
                        let _td1 = cr(_trQ, 'td', 'align-middle');
                        _td1.innerHTML = `Общая пожарная нагрузка участка, МДж`;
                        _td1.style = "width:800px";

                        this.value_Q = cr(_trQ, 'td', 'align-middle table-warning table-border'); //ячейка со значением Q
                        this.value_Q.style = "width:250px";

                    let _trq = cr(_tbodyPN,'tr');
                        let _td11 = cr(_trq, 'td', 'align-middle');
                        _td11.innerHTML = `Удельная пожарная нагрузка участка, МДж/м<sup>2</sup>`;
                        _td11.style = "width:800px";

                        this.value_q = cr(_trq, 'td', 'align-middle table-warning table-border'); //ячейка со значением q
                        this.value_q.style = "width:250px";           

        //скрываем таблицу и кнопку "Очистить таблицу"
        _table.style = "display:none"; 
        _tablePN.style = "display:none";
        //если создана таблица с классом tablePN, то повторно не создавать
        //if (_body.querySelector('.tablePN') !== null) return;
        btn_clr.style = "display:none";
           
      
//кнопка добавить другой ГМ
btn_table_other.addEventListener('click', () => {
    
    _table.style = "display:block";
    _tablePN.style = "display:block"; 
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

            this.Q = sumPN(_tbody); //расчет общей и удельной ПН

            update(this);
        });      
        
        _td3.addEventListener('input', (e)=> {
            if(e.target.value > 0 && _td2.lastChild.value) {
                _td4.textContent = Math.round(_td2.lastChild.value*e.target.value*100)/100;    //+num.toFixed(5)
            } else {
                _td4.textContent ='';
            }

            this.Q = sumPN(_tbody); //расчет общей и удельной ПН

            update(this);
        });

});



//кнопка добавить в таблицу
btn_table.addEventListener('click', () => {

    //если выбран какой-либо материал, то создаем таблицу и заполняем ее
    if (select1.selectedIndex >= 0) {

        _table.style = "display:block";
        _tablePN.style = "display:block";
        btn_clr.style = "display:block";

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
                
            if(!this.gm.includes(item)) {
                let _tr = cr(_tbody,'tr');

                this.gm.push(item);//заполняем массив данных, которые заносятся в таблицу
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

                    this.Q = sumPN(_tbody); //расчет общей и удельной ПН

                    update(this);
                });    
            }
        });

    };
     
});

    //кнопка "очистить таблицу"
    btn_clr.addEventListener('click', () =>{
        _tbody.innerHTML = '';
        this.gm = [];
        this.Q = 0;
        this.H = 0;
        update(this);
    });


} //constructor

}//class


// Наименование помещения и Площадь помещения
let form1 = cr(stage,'form');
    let row_1 = cr(form1, 'div', 'form-group row m-1 p-1 justify-content-center');
        let label_1 = cr(row_1, 'label', 'col-sm-3 col-form-label text-left', "Наименование помещения");
        let col_11 = cr(row_1, 'div', 'col-sm-3',);
            let input1 = cr(col_11, 'input', 'form-control');
            input1.type = 'text';


    let row_2 = cr(form1, 'div', 'form-group row m-1 p-1 justify-content-center');
        let label_2 = cr(row_2, 'label', 'col-sm-3 col-form-label text-left');
        label_2.innerHTML = "Площадь помещения, м<sup>2</sup>";

        let col_21 = cr(row_2, 'div', 'col-sm-3',);
            let input2 = cr(col_21, 'input', 'form-control');
            input2.type = 'number';
//


///////  создаем участок №1 ////////////////////
let arrPlot = [];
let numPlot = 1; //номер участка
arrPlot[0] = new Plot(1);

//инициализируем мультисписок              
$('select').selectpicker();

//строка для кнопок "Добавить участок" и "Выполнить расчет категории помещения"
let row_btns = cr(stage,'div','row justify-content-center m-1');
    let btn_addPlot = cr(row_btns, 'button', 'btn btn-primary m-2', 'Добавить участок');
        btn_addPlot.type = 'button';

    let btn_calc = cr(row_btns, 'button', 'btn btn-success m-2', 'Выполнить расчет категории помещения');
        btn_calc.type = 'button';      

    
//обработчик для кнопки добавить участок
    btn_addPlot.addEventListener('click', ()=> {
        let newPlot = new Plot(arrPlot.length + 1);
        arrPlot[arrPlot.length] = newPlot;
        
        //вставляем участок перед кнопками
        row_btns.before(newPlot.rowPost);

        $('select').selectpicker();
    });


//обработчик для кнопки "выполнить расчет категории помещения"
btn_calc.addEventListener('click', ()=> {
    //скрываем все участки и кнопки
    arrPlot.forEach((plot) => {
        plot.rowPost.style = "display:none";
    });

    btn_addPlot.style = "display:none";
    btn_calc.style = "display:none";
    btn_back.style = "display:block";
    ////

    //card - вывод
    createPIN();
});


//добавляем кнопку назад к участкам 
let btn_back = cr(stage, 'button', 'btn btn-outline-primary m-auto mt-2 mb-2');
    btn_back.innerHTML = '&#8592 Назад к участкам';
    btn_back.type = 'button';
    btn_back.style = "display:none";

btn_back.addEventListener('click', ()=> {
    arrPlot.forEach((plot) => {
        plot.rowPost.style = "display:flex";
    });

    btn_addPlot.style = "display:block";
    btn_calc.style = "display:block";
    btn_back.style = "display:none";

    //скрываем вывод
    $('div.rowPIN').remove();
    
});


//////////////////////////  МЕТОДЫ  ///////////////////////////////

//суммируем общую пожарную нагузку Q и q
function sumPN(_tbody){
    let sum = _tbody.childNodes.length; //количество строк таблицы без заголовка 
    let Q = 0;

    for(let i=0; i<sum; i++){
        Q += Math.round(_tbody.childNodes[i].childNodes[3].textContent*100)/100;
    }

    return Q;
}

//общий обработчик для input
function update(plot) {
    plot.q = plot.Q/plot.sq;

    plot.value_Q.textContent = +plot.Q.toFixed(2);
    plot.value_q.textContent = Math.round((plot.Q/plot.sq)*100)/100;


    //создаем поле "минимальная высота H" если известны Q и q и условии кат. Д, а также не создан div.row_H

    if (plot.Q > 1000 && plot.q > 100 && !plot.bodyPost.querySelector('div.row_H')) {
         
        let row_H = cr(plot.bodyPost,'div', 'form-group row p-1 mx-auto border row_H');
        row_H.style = 'background-color: #fff';  
        let label = cr(row_H, 'label', 'col-sm-9 col-form-label ', "Укажите минимальное расстояние от поверхности пожарной нагрузки данного участка до перекрытия (расстояние от горючих материалов до потолка), м");
        let _h = cr(row_H, 'input', 'form-control col-sm-2 m-auto text-center');
            _h.type = 'number';

            //обработчик поля ввода H
            _h.addEventListener('input', (e)=> {
                plot.H = e.target.value;
                update(plot); // повторяем обновление 
            });
                            
    }  
    
    if(plot.Q < 1000 && plot.q < 100 && plot.bodyPost.querySelector('div.row_H')){
        //удаляем div.row_H 
        plot.H = 0;
        plot.bodyPost.querySelector('div.row_H').remove();
    }
}

function createPIN() {
    let rowPIN = cr(stage, 'div', 'form-group row m-3 p-1 rowPIN');
        let cardPIN = cr(rowPIN, 'div', 'card col-9 p-0 border mx-auto');

            let headerPIN = cr (cardPIN, 'div', 'card-header container-fluid m-0', 'Результат расчета');
            headerPIN.style = 'background-color: #7dfa89';
            let bodyPIN = cr (cardPIN, 'div', 'card-body text-left');
            bodyPIN.style = 'background-color: #fcffe0';
    
    //рассчитаем общую ПН
    let Q = 0;
    let q = arrPlot[0].q;
    let h = 0; // минимальное H
    let arr_h = [];
    let kat = '';

    arrPlot.forEach((plot) => {
        Q += plot.Q;  
        if (q < plot.q) q = plot.q;
        if(plot.H >0) arr_h.push(+plot.H);
        Q = _round(Q);
        q = _round(q);
    });

    h = Math.min(...arr_h); //извлекаем минимальное значение из массива

    //расчет категории помещения 

    //проверка условия 5.3.2 
    let g_t;
    if(1400<q<=2200) g_t = 2200;
    if(200<q<=1400) g_t = 1400;

    console.log('g_t = ' + g_t);

    let odds = Q >= 0.64*g_t*h**2;

    console.log(odds);
    

    bodyPIN.innerHTML = `
    <p>Общая пожарная нагрузка в помещении составит: <span class="font-weight-bold">${Q} МДж</span>;</p>
    <p>Максимальная удельная пожарная нагрузка в помещении составит: <span class="font-weight-bold">${q} МДж/м<sup>2</sup></span>;</p>
    <p>Категория помщения: <span class="font-weight-bold">${kat}</span>;</p>
    `;
}






//проверка условия 5.3.2
function uslv (Q, q, H) {

}




