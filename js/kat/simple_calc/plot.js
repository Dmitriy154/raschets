//Объект участок
class Plot {
    sq = 10; //площадь участка
    gm = []; //горючие материалы участка
    Q = 0; //общая пожарная нагрузка участка
    q = 0; //удельная пожарная нагрузка участка 
    H = false; //минимальное расстояние до перекрытия (false - для данного участка не требуется вводить H)
    value_Q = 0; //ссылка на ячейку Общей пожарной нагрузки
    value_q = 0;
    rowPost; // ссылка на container участка
    bodyPost; //ссылка на body участка
    userGM = false //есть ли материалы пользователя не из бд

constructor(num) {
    this.num = num; //номер участка

    let divPlot = cr(stage, 'div', 'container-xl')
        let row_1 = cr(divPlot,'div','form-group row m-2 p-2 justify-content-center');

    this.rowPost = divPlot;

    let _card1 = cr(row_1, 'div', 'card col-12 p-2 border');
        let _header1 = cr(_card1, 'div','card-header container-fluid m-0');
            _header1.style = 'background-color: #d4cbab';
       
        if(num == 1) {
            _header1.innerHTML += `Участок №${num}<img type="button" class='m-2' data-toggle="modal" data-target="#exampleModal" src="../../img/icons/question.png"></img>`;  
        } else {
            _header1.innerHTML += `Участок №${num}`; //для 2-го и др. участков кружок вопроса не нужно
        }


    let bodyPost = cr(_card1, 'div','card-body p-1');
        bodyPost.style = 'background-color: #fcf2ca';
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
                let btn_table = cr(df1, 'button', 'btn btn-primary btn-sm ml-3', 'Добавить ГМ');
                    btn_table.setAttribute('title', 'Добавить горючий материал из списка');
                    btn_table.type = 'button';

                //Кнопка Добавить другой ГМ
                let btn_table_other = cr(df1, 'button', 'btn btn-secondary btn-sm ml-3', 'Добавить другой ГМ');
                    btn_table_other.type = 'button';
                    btn_table_other.setAttribute('title', 'Если вы не нашли в списке необходимый горючий материал, то добавьте в таблицу свои данные');
                    btn_table_other.dataset.toggle = 'tooltip';
                    btn_table_other.dataset.placement="top";

                // создание option в селекте
                arrTV.forEach((el) => {
                    if (el.Q_H) {
                        let opt = cr(select1, 'option', '', el.name);       
                        opt.dataset.subtext = el.Q_H;
                    }
                });


        //строка для таблицы
        let row_3 = cr(bodyPost,'div', 'row p-1 ');
        let row_33 = cr(row_3, 'div', 'ml-3 mr-3 text-center justify-content-center');
            let _table = cr(row_33, 'table', 'table mb-1 table-bordered');
                let _thead = cr(_table, 'thead', 'bg-light');
                    _thead.innerHTML = `   
                       
                        <tr class="mx-auto">
                            <th class='align-middle'>Наименование горючего материала (вещества)</th>
                            <th class='align-middle'>Низшая теплота сгорания Q<sup>p</sup><sub>H</sub>, МДж/кг</th>
                            <th class='align-middle'>Масса, кг</th>
                            <th class='align-middle'>Пож. нагрузка горючего материала (вещества), МДж</th>                           
                        </tr>`
                  
                let _tbody = cr(_table,'tbody');
                    _tbody.style = 'background-color: #fff';
        
        
        //строка для кнопки очистить таблицу
        let row_btn_clr_table = cr(bodyPost,'div', 'row m-1 mx-auto text-center justify-content-center');
            let btn_clr = cr(row_btn_clr_table, 'button', 'btn btn-light border', 'Очистить таблицу');
                btn_clr.type = 'button';

        //делаем отдельную таблицу для ОПН и УПН
        let row_tablePN = cr(bodyPost, 'div', 'container p-1 mt-2 mx-auto text-center justify-content-center');
            
            let str_OPN = cr(row_tablePN, 'div', 'row mx-auto justify-content-center');
                cr(str_OPN, 'div', 'col-8 p-2 border bg-light', 'Общая пожарная нагрузка участка, МДж');
                this.value_Q = cr(str_OPN, 'div', 'col-2 p-2 border bg-light', '100'); //ячейка со значением Q

            let str_UPN = cr(row_tablePN, 'div', 'row mx-auto justify-content-center');
                cr(str_UPN, 'div', 'col-8 p-2 border bg-light').innerHTML = `Удельная пожарная нагрузка участка, МДж/м<sup>2</sup>`;
                this.value_q = cr(str_UPN, 'div', 'col-2 p-2 border bg-light'); //ячейка со значением q            
    
        //скрываем таблицу и кнопку "Очистить таблицу"
        _table.style = "display:none"; 
        row_tablePN.style = "display:none";

        //если создана таблица с классом tablePN, то повторно не создавать
        //if (_body.querySelector('.tablePN') !== null) return;

        btn_clr.style = "display:none";
           
      
//кнопка добавить другой ГМ
btn_table_other.addEventListener('click', () => {
    
    _table.style = "display:block";
    row_tablePN.style = "display:block";
    btn_clr.style = "display:block" ;
    
    this.userGM = true;

    //создаем строку и столбцы
    let _tr = cr(_tbody,'tr');
        let _td1 = cr(_tr, 'td');
        let _td2 = cr(_tr, 'td', 'align-middle');
        let _td3 = cr (_tr,'td','align-middle p-1');
        let _td4 = cr(_tr, 'td','align-middle');

        _td1.innerHTML = `<input type="text" class="form-control text-center">`;
        _td2.innerHTML = `<input type="number" class="form-control text-center">`;
        _td3.innerHTML = `<input type="number" class="form-control text-center">`;

        _td2.addEventListener('input', (e)=> {
            if(e.target.value > 0 && _td3.lastChild.value) {
                _td4.textContent = Math.round(_td3.lastChild.value*e.target.value*100)/100;   
            } else {
                _td4.textContent ='';
            }

            this.Q = sumPN(_tbody); //расчет общей и удельной ПН

            update(this);
        });      
        
        _td3.addEventListener('input', (e)=> {
            if(e.target.value > 0 && _td2.lastChild.value) {
                _td4.textContent = Math.round(_td2.lastChild.value*e.target.value*100)/100;    
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
        row_tablePN.style = "display:block";
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
                let _td1 = cr(_tr, 'td', 'align-middle p-1', item);
                let _td2 = cr (_tr,'td', 'align-middle p-1', selected_t[i]);
                let _td3 = cr(_tr, 'td', 'p-1');
                    _td3.innerHTML = `<input type="number" class="form-control text-center p-1">`;
                
                    let _td4 = cr(_tr, 'td', 'align-middle p-1');
                   
                    
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
        this.userGM = false
       console.log($('.selectpicker'));
        $('.selectpicker').selectpicker('deselectAll') //отменяем выбор элементов
    });


} //constructor

}//class
