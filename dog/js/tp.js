function cr (_parent, _tagName, _class, _textContent) {
    let elem = document.createElement(_tagName);
    elem.className = _class;
    elem.textContent = _textContent;
    _parent.appendChild(elem);
    return elem; 
}

// КАДР 1 - исходные данные ///////////////////////

let _stage1 = cr(stage,'form'); //_stage1 - скрываемая часть (кроме кнопок) _stage2 - таблица и т.д.
    let divForm = cr(_stage1, 'div', 'container-xl');
        let row1 = cr(divForm, 'div', 'row'); 
            
            //населенный пункт расчета
            let div_city = cr(row1, 'div', 'col-sm-2 m-1 p-0');
                let _city = cr(div_city, 'input', 'form-control');
                _city.setAttribute('placeholder', 'Населенный пункт');          
        
        
            //адрес расчета
            let div_address = cr(row1, 'div', 'col-sm-4 m-1 p-0');
                let _address = cr(div_address, 'input', 'form-control');
                _address.setAttribute('placeholder', 'адрес (улица)');

            //Дата расчета
            let div_date = cr(row1, 'div', 'col-sm-2 m-1 p-0');
                let _date = cr(div_date, 'input', 'form-control');
                    _date.type = 'date';
            
            //расстояние до ПАСЧ
            let div_rast = cr(row1, 'div', 'col-sm-2 m-1 p-0');
                let _rast = cr(div_rast, 'input', 'form-control');
                    _rast.setAttribute('placeholder', 'Расст. до ПАСЧ, км');
            
            //чек в городе
            let _divNP = cr(row1, 'div', 'col mt-2 p-1');
                let _divNP2 = cr(_divNP, 'div', 'custom-control custom-radio');
                    _divNP2.innerHTML = `
                        <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input">
                        <label class="custom-control-label" for="customRadio1">в городе</label>
                    `;
       
        let row2 = cr(divForm, 'div', 'row');
            //Примечание
            let div_note = cr(row2, 'div', 'form-group w-100 mt-1 mb-2');
                let _note = cr(div_note, 'textarea', 'form-control');
                _note.setAttribute('rows', '1');
                _note.setAttribute('placeholder', 'Примечание для расчета (наличие забора, защита элементов)');


//создание зданий tp_zd
///////  создаем здание №1 ////////////////////
let arrZd = [];
let numZd = 1; //номер здания
arrZd[0] = new Zd(1, _stage1);


//строка для кнопок "Добавить здание" и "Продолжить расчет"
let row_btns = cr(_stage1,'div','row justify-content-center');
    let btn_addZd = cr(row_btns, 'button', 'btn btn-primary btn-sm m-2', 'Добавить здание');
        btn_addZd.type = 'button';

    let btn_next1 = cr(row_btns, 'button', 'btn btn-success btn-sm m-2', 'Продолжить расчет');
        btn_next1.type = 'button'; 

//обработчик для кнопки добавить здание
btn_addZd.addEventListener('click', ()=> {
    let newZd = new Zd(arrZd.length + 1, _stage1);
    arrZd[arrZd.length] = newZd;

    //вставляем здание перед кнопками
    row_btns.before(newZd.row_container_zd);
});

//обработчик для кнопки продолжить расчет
btn_next1.addEventListener('click', ()=> {
    //скрываем первый кадр, сцену
    _stage1.style = "display:none";
    kadr2 ();
});


//КАДР №2 - формируем таблицу, указываем направления ///////////////////////

function kadr2() {
    let _stage2 = cr(stage,'div', 'container-xl');

       //строка для таблицы
       let row_table = cr(_stage2,'div', 'row justify-content-center');
            let _table = cr(row_table, 'table', 'table table-sm mt-2 table-bordered');
                    let _thead = cr(_table, 'thead', 'bg-light');
                        _thead.innerHTML = ` 
                            <tr class="mx-auto">
                                <th class='align-middle'>№ Здания</th>
                                <th class='align-middle'>Краткое обозначение здания</th>
                                <th class='align-middle'>Номера облучаемых зданий</th>
                                <th class='align-middle'></th>                       
                            </tr>`
                        
                    let _tbody = cr(_table,'tbody');
                        _tbody.style = 'background-color: #fff';

            //заполняем таблицу
            arrZd.forEach((item, i)=> {
                let _tr = cr(_tbody,'tr');
                    let _td1 = cr(_tr, 'td', 'align-middle text-center', item.num);
                    let _td2 = cr (_tr,'td', 'align-middle p-1', item.address.value);
                    
                    //поле ввода номеров облучаемых зданий
                    let _td3 = cr(_tr, 'td', 'align-middle pl-5 pr-5');
                        let _input = cr(_td3, 'input', 'form-control text-center');
                        _input.setAttribute('placeholder', 'ввод цифр через запятую');
                        
                        //добавляем свойство классу Zd ссылка на inputNums - инпут с номерами зданий облучения
                        item.inputNums = _input;
                    
                    //значок крестик для удаления строк
                    let _td4 = cr(_tr, 'td', 'align-middle p-1 text-center');
                        let bt_close = cr(_td4, 'button', 'close');
                            bt_close.setAttribute('aria-label', 'Close');
                            bt_close.type = 'button';
                            bt_close.innerHTML = `<span class="center" aria-hidden="true">&times;</span>`;

                    //обработчики в строке таблицы

                        //обработчик input на ввод
                        _input.addEventListener('input', (e)=>{
                            //запрет ввода пробелов или удаляем сразу все пробелы при попытке ввода
                            _input.value = e.target.value.replace(/\s+/g,'').trim();
                            //запрет ввода букв и некоторых символов
                            _input.value = e.target.value.replace(/[/;*()A-Za-zА-Яа-яЁё]/,'');
                            //вместо точки пишем запятую
                            _input.value = e.target.value.replace(/[.]/g, ",");

                            //автоматическая вставка противоположных направлений
                            //массив с номерами домов облучения
                            let numbers = e.target.value.split(',');

                            numbers.forEach((num)=>{
                                num = +num; // переводим из строки в число
                                
                                //исключаем ошибки введенные номер здания - целое число и не превышает кол-во зданий
                                if (num>0 && (num <= arrZd.length) && Number.isInteger(num) && num !== (i+1)) {
                                    //console.log('i: '+i+ '; num: ' + num +'; numbers: '+numbers+'; arrZd[(num-1)].input.value = ' + arrZd[(num-1)].inputNums.value + '; arrZd.length = ' + arrZd.length);
                                    //проверка наличия обратного значения
                                    if (!arrZd[(num-1)].inputNums.value.split(',').includes(String(i+1))) {
                                       
                                        let str = ',' + (i+1);

                                        if(arrZd[(num-1)].inputNums.value !=='') {
                                            arrZd[(num-1)].inputNums.value += str;
                                        } else {
                                            arrZd[(num-1)].inputNums.value += (i+1);
                                        }
                                        
                                    }                               
                                } 
                            });

                        });


                        //вешаем слушатель на данный значок закрытия
                        bt_close.addEventListener('click', ()=> {
                            //удаляем текущую строку и элемент массива строим ЗАНОВО таблицу
                            arrZd.splice(i,1);
                            _stage2.remove();
                            kadr2();
                        });

            });

        //кнопка далее - переход на кадр 3 "направления и расстояния"
        let row_btns = cr(_stage2,'div','row justify-content-center');

            let btn_next1 = cr(row_btns, 'button', 'btn btn-success btn-sm m-2', 'Продолжить расчет');
                btn_next1.type = 'button';            
            
        //обработчик для кнопки продолжить расчет
        btn_next1.addEventListener('click', ()=> {
            //скрываем первый кадр, сцену
            _stage2.style = "display:none";
            let arr = [];

            arrZd.forEach((item, i)=> {
                arr.push(item.inputNums.value.split(','));   
            });

            kadr3 (arr);
        });
}; //kadr 2

function kadr3(arr) {

    let _stage3 = cr(stage,'div', 'container-xl');

    //строка для таблицы
    let row_table = cr(_stage3,'div', 'row justify-content-center');
    let _table = cr(row_table, 'table', 'table table-sm mt-2 table-bordered');
            let _thead = cr(_table, 'thead', 'bg-light');
                _thead.innerHTML = ` 
                    <tr class="mx-auto">
                        <th class='align-middle text-center'>Здание пожара, адрес</th>
                        <th class='align-middle text-center'>Облучаемое здание, адрес</th>
                        <th style="width: 20%" class='align-middle text-center'>Расстояние, м</th>                  
                    </tr>`
                
            let _tbody = cr(_table,'tbody');
                _tbody.style = 'background-color: #fff';

    //удалить из массива дубликаты !!!!!!!

    arr.forEach((item, i)=> {
        //item ['2', '3']

        item.forEach((_item)=>{ 
            //ищем обратную ссылку и удаляем ее из item
            if(arr[_item-1].includes(String(i+1))) arr[_item-1].splice(arr[_item-1].indexOf(String(i+1)),1);
        });
    });
   
    //заполняем таблицу 
    arr.forEach((item, i)=> {
        +item;
        let _address1; 
        let _address2;
        
        if(i==0){
            arr[0].forEach((item)=>{
                _address1 = arrZd[i].address.value;
                if(item>1)_address2 = arrZd[(item-1)].address.value;
                rasst_stroka(_address1, _address2);
            })        
        } else {
            arr[i].forEach((item)=>{
                //проверка на содержание в предыдущих строках

                _address1 = arrZd[i].address.value;
                _address2 = arrZd[(item-1)].address.value;
                rasst_stroka(_address1, _address2);
            })  
        }        
    });

    //cоздаем строку и заполняем адреса
    function rasst_stroka(_address1, _address2){
        let _tr = cr(_tbody,'tr');
        let _td1 = cr(_tr, 'td', 'align-middle text-center',_address1);
        let _td2 = cr (_tr,'td', 'align-middle text-center',_address2);
        //поле ввода расстояния между зданиями
        let _td3 = cr(_tr, 'td', 'align-middle pl-5 pr-5');
            let _input = cr(_td3, 'input', 'form-control text-center');
            _input.setAttribute('placeholder', 'расстояние');
            _input.type = 'number';   
    }


} //kadr 3


