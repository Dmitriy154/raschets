function build_kadr_1(){
    chK(1);
    let _stage1 = cr(stage,'form'); //_stage1 - скрываемая часть (кроме кнопок) _stage2 - таблица и т.д.
    _stage1.id = '_stage1';
 
    let divForm = cr(_stage1, 'div', 'container-xl');
        let row1 = cr(divForm, 'div', 'row mt-2'); 
            
            //населенный пункт расчета
            let div_city = cr(row1, 'div', 'col-2');
                city = cr(div_city, 'input', 'form-control');
                city.setAttribute('placeholder', 'Населен. пункт');
				city.value = "г. Гомель";
				city.title = 'Населенный пункт';
        
            //Примечание
            let div_note = cr(row1, 'div', 'col-10');
                let note = cr(div_note, 'textarea', 'form-control');
                note.setAttribute('rows', '1');
                note.setAttribute('placeholder', 'Примечание (наличие забора, защита элементов, пож. отсек)');
                note.id = 'note';

        //блок для зданий
        let divZd = cr(_stage1, 'div', 'container-lg p-0 divZd mt-2');
        divZd.id = 'divZd';  
        
        //строка для кнопок "Добавить здание" и "Продолжить расчет"
        let row_btns = cr(_stage1,'div','row justify-content-center row_btns_1');
            let btn_addZd = cr(row_btns, 'button', 'btn btn-primary btn-sm m-2', 'Добавить здание');
                btn_addZd.type = 'button';
                btn_addZd.id = 'btn_addZd';

            let btn_next1 = cr(row_btns, 'button', 'btn btn-success btn-sm m-2', 'Продолжить расчет');
                btn_next1.type = 'button'; 
                btn_next1.id = 'btn_next1'; 
}////////////////////////////////// 1


function build_kadr_2(){
    chK(2);

    let _stage2 = cr(stage,'div', 'container-xl');
        _stage2.id = '_stage2';

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
                    let _td2 = cr (_tr,'td', 'align-middle p-1', item.name);
                    
                    //поле ввода номеров облучаемых зданий
                    let _td3 = cr(_tr, 'td', 'align-middle pl-5 pr-5');
                        let _input = cr(_td3, 'input', 'form-control text-center');
                        _input.setAttribute('placeholder', 'ввод цифр через запятую');
                        
                        //если только 2 здания, то сразу ставим цифры и кликаем на продолжить расчет
                        if (arrZd.length == 2) {
                            if (i==0) _input.value = 2;
                            if (i==1) _input.value = 1;
                        }

                        //добавляем свойство классу Zd ссылка на inputNums - инпут с номерами зданий облучения
                        item.inputNums = _input;
                    
                    //значок крестик для удаления строк
                    let _td4 = cr(_tr, 'td', 'align-middle p-1 text-center');
                        let bt_close = cr(_td4, 'button', 'close w-100');
                            bt_close.setAttribute('aria-label', 'Close');
                            bt_close.type = 'button';
                            bt_close.innerHTML = `<span class="center" aria-hidden="true">&times;</span>`;

                        //вешаем слушатель на данный значок закрытия
                        bt_close.addEventListener('click', ()=> {
                            //удаляем текущую строку и элемент массива строим ЗАНОВО таблицу
                            arrZd.splice(i,1);
                            _stage2.remove();
                            kadr2();
                        });
            });


                    
    let row_btns = cr(_stage2,'div','row justify-content-center');    //кнопка далее - переход на кадр 3 "направления и расстояния"

    let btn_next1 = cr(row_btns, 'button', 'btn btn-success btn-sm m-2', 'Продолжить расчет');
        btn_next1.type = 'button'; 
        btn_next1.id = 'btn_next1';
}////////////////////////////////// 2 (номера облучаемых домов)


function build_kadr_3(){
    chK(3);
    let _stage3 = cr(stage,'div', 'container-xl');
        _stage3.id = '_stage3';

    //строка для таблицы
    let row_table = cr(_stage3,'div', 'row justify-content-center');
    let _table = cr(row_table, 'table', 'table table-sm mt-2 table-bordered');
            let _thead = cr(_table, 'thead', 'bg-light');
                _thead.innerHTML = ` 
                    <tr class="mx-auto">
                        <th class='align-middle text-center'>Здание №1</th>
                        <th class='align-middle text-center'>Здание №2</th>
                        <th style="width: 20%" class='align-middle text-center'>Расстояние, м</th>                  
                    </tr>`
                
            let _tbody = cr(_table,'tbody');
                _tbody.style = 'background-color: #fff';
                _tbody.id = '_tbody';

    //кнопка далее - переход на кадр 4
    let row_btns = cr(_stage3,'div','row justify-content-center');

    let btn_next1 = cr(row_btns, 'button', 'btn btn-success btn-sm m-2', 'Продолжить расчет');
        btn_next1.type = 'button';
        btn_next1.id = 'btn_next1'; 
}////////////////////////////////// 3 


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
        
        
    //заполняем массив napr (адрес1, адрес2, расст.)
    let arr = [_address1,_address2,_input];
    napr.push(arr);
} 


function build_kadr_4(){
    chK(4);

    let _stage4 = cr(stage,'div', 'container-xl mt-2');
        _stage4.id = '_stage4';

        //НАПРАВЛЕНИЕ РАСЧЕТА И РАССТОЯНИЕ
        let divrow1 = cr(_stage4, 'div', 'row');
            let divcol11 = cr(divrow1, 'div', 'col');
            divcol11.id = 'divNapr';
            divcol11.innerHTML += `<h6>Направление расчета: 
            <span class="text-danger">${napr[0][0]}</span> &#8594   <span class="text-primary">${napr[0][1]}</span>. &nbsp
            <span class="text-success"> (1 из ${napr.length})</span> &nbsp  Расстояние: <span class="text-info">${napr[0][2]} м. </span></h6>`;

        //ПРИНИМАЮЩАЯ ПОВЕРХНОСТЬ
        let divrow2 = cr(_stage4, 'div', 'row');
            let divcol21 = cr(divrow2, 'div', 'col-sm-3 mt-auto');
                divcol21.innerHTML += `<h6>Принимающая поверхность:</h6>`;
            let divcol22 = cr(divrow2, 'div', 'col-sm-3');  
                divcol22.innerHTML += `
                <div>
                    <select class="form-control" id="selectPP">
                        <option value='13900'>Древесина</option>
                        <option value='15400'>Пластик</option>
                        <option value='17500'>Лакокрасочное покрытие</option>
                        <option value='17400'>Рулонная кровля</option>
                        <option value='13900'>Оцинкованное листовое железо (отделка древесины)</option>
                    </select>
                </div>
            `;

        //создаем строку ИЗЛУЧАЮЩИЕ ПОВЕРХНОСТИ
        let divrow3 = cr(_stage4, 'div', 'row');
        divrow3.id = 'divForIp';

        createIP(divrow3);  //создаем строку ИЗЛУЧАЮЩАЯ ПОВЕРХНОСТЬ, передаем строку, в которую будем помещать

        //Точка Х,чек для перп. или угловой поверхн-ти (вертикальная или гориз. площадка) и КНОПКА СХЕМА
        let divrow4 = cr(_stage4, 'div', 'row row_bt_sh p-1');
            let divcol41 = cr(divrow4, 'div', 'col-sm-2 mt-2');
                divcol41.innerHTML += `<h6>Точка Х: </h6>`;
            let divcol42 = cr(divrow4, 'div', 'col-sm-1 m-1 p-0'); 
                let inputX_x = cr(divcol42, 'input', 'form-control');
                    inputX_x.setAttribute('placeholder', 'x');
                    inputX_x.type = 'number';
                    inputX_x.id = 'inputX_x';
            let divcol43 = cr(divrow4, 'div', 'col-sm-1 m-1 p-0'); 
                let inputX_y = cr(divcol43, 'input', 'form-control');
                    inputX_y.setAttribute('placeholder', 'y');
                    inputX_y.type = 'number';
                    inputX_y.id = 'inputX_y';

            //плоскость точки Х (для угловых), например крыша
            let div_gorizont = cr(divrow4, 'div', 'form-check form-check-inlin col-sm-2 m-2 зд-3').innerHTML =`
                <input class="form-check-input" type="checkbox" id="gorizontX" value="0">
                <label class="form-check-label small" for="gorizontX">гориз. пл. (облуч. сверху)</label>
            `;

            let divcol44 = cr(divrow4, 'div', 'col-sm-3 justify-content-center ml-3 pt-1');
                let bt_sh = cr(divcol44, 'button', 'btn btn-outline-info', 'Схема ИП');
                    bt_sh.type = 'button';
                    bt_sh.id = 'bt_sh';
            

            //создаем строку для помещения canvas
            let divrow5 = cr(_stage4, 'div', 'row justify-content-center');
                divrow5.id = 'divrow5';       


            //строка для кнопки "Следующее направление"
            let divrow6 = cr(_stage4,'div','row justify-content-center');

            //кнопка "следующее направление и продолжить" (скрыта)
            let btn_nextN = cr(divrow6, 'button', 'btn btn-success btn-sm m-2', 'Продолжить');
                btn_nextN.type = 'button';
                btn_nextN.id = 'bt_nextN';
                btn_nextN.style.display = 'none'; //скрываем элемент

     

        //СТРОКА ИЗЛУЧАЮЩАЯ ПОВЕРХНОСТЬ --- добавляем ИП --- создаем объект ip
        function createIP(row3){
           let divrow3 = cr(row3, 'div', 'row m-0 p-0 mt-2');
            
            let div31 = cr(divrow3, 'div', 'col-sm-3 mt-auto mr-2');
                div31.innerHTML += `<h6>Излучающая поверхность: </h6>`;

            let div_w = cr(divrow3, 'div', 'col-sm-1 m-1 p-0');
                let input_w = cr(div_w, 'input', 'form-control');
                    input_w.setAttribute('placeholder', 'w');  
                    input_w.type = 'number';
            let div_h = cr(divrow3, 'div', 'col-sm-1 m-1 p-0');
                let input_h = cr(div_h, 'input', 'form-control');
                    input_h.setAttribute('placeholder', 'h');
                    input_h.type = 'number';
            let div_r = cr(divrow3, 'div', 'col-sm-1 m-1 p-0');
                let input_r = cr(div_r, 'input', 'form-control');
                    input_r.setAttribute('placeholder', 'r');
                    input_r.type = 'number';
            let div_x = cr(divrow3, 'div', 'col-sm-1 m-1 p-0');
                let input_x = cr(div_x, 'input', 'form-control');
                    input_x.setAttribute('placeholder', 'x');
                    input_x.type = 'number';
            let div_y = cr(divrow3, 'div', 'col-sm-1 m-1 p-0');
                let input_y = cr(div_y, 'input', 'form-control');
                    input_y.setAttribute('placeholder', 'y');
                    input_y.type = 'number';
            let div_a = cr(divrow3, 'div', 'col-sm-1 m-1 p-0');
                let input_а = cr(div_a, 'input', 'form-control');
                    input_а.setAttribute('placeholder', 'angle');
                    input_а.setAttribute('title', '0 - параллельно; 90 - перпендикулярно, 45 - под углом 45 град (не более 180)');
                    input_а.type = 'number';

            //копка добавить ИП       
            let div_bt = cr(divrow3, 'div', 'col-sm-1 m-1 p-0');
                let bt_ip = cr(div_bt, 'button', 'btn btn-info btn-sm mt-1 w-75', '+ИП');
                    bt_ip.type = 'button';

            //крестик удаление 
                let bt_close = cr(divrow3, 'button', 'close');
                    bt_close.setAttribute('aria-label', 'Close');
                    bt_close.type = 'button';
                    bt_close.innerHTML = `<span class="center" aria-hidden="true">&times;</span>`;
                
                
            //ИЗЛУЧАЮЩАЯ ПОВЕРХНОСТЬ
            let ip = {};
                ip.i_w = input_w;
                ip.i_h = input_h;
                ip.i_r = input_r;
                ip.i_x = input_x;
                ip.i_y = input_y;
                ip.i_а = input_а;
                arrIP.push(ip);
                
            //Добавить ИП
            bt_ip.addEventListener('click', (e)=>{
                e.currentTarget.hidden = true;
                createIP(row3);
            }); 

            //удаление ИП
            bt_close.addEventListener('click', (e)=>{
                if(arrIP.length == 1) return;
                let num = arrIP.indexOf(ip); //номер удаляемого объекта в массиве
                arrIP.splice(num, 1); // удаляем один объект в массиве
                
                /////если удаляется последняя добавленная ИП, то ищем предыдущую
                if (!bt_close.previousSibling.firstChild.hidden) bt_close.parentNode.previousSibling.querySelector('button.btn-info').hidden = false;

                bt_close.parentNode.remove();
                let clickEvent = new Event('click'); // создаем событие клика
                bt_sh.dispatchEvent(clickEvent); // имитируем клик на кнопку схема ИП для обновления данных
            });
        } // createIP() kadr 4    

        create_ip = createIP; //копируем функцию

}////////////////////////////////// 4


function build_kadr_5(){
    chK(5);

    let _stage5 = cr(stage,'div', 'container-xl mt-2');
        _stage5.id = '_stage5';
  
        let divrow1 = cr(_stage5, 'div', 'row');
            let div_title = cr(divrow1, 'div', 'col-10 alert alert-primary justify-content-center');
                let title = cr(div_title, 'h5', '', 'Отчет по расчёту интенсивности теплового излучения при пожаре между зданиями');
        
        let divrow2 = cr(_stage5, 'div', 'row justify-content-center');
            let title2 = cr(divrow2, 'h6', '', 'Исходные данные:');

        //таблица с исходными данными. ЗАГОЛОВОК
        let divrow3 = cr(_stage5, 'div', 'row');
            let divTable = cr(divrow3, 'div', 'col');
                divTable.id = 'divTable';

            divTable.innerHTML = `
                <div class="row">
                    <div class="col-4 border text-center pt-3 bg-light">
                        <p class="font-weight-bold text-break small">Здание</p>
                    </div>
                    <div class="col-2 border text-center pt-3 bg-light">
                        <p class="font-weight-bold small">Материал стен</p>
                    </div>
                    <div class="col-2 border text-center pt-2 bg-light">
                        <p class="font-weight-bold text-break small">Высота здания/крыши</p>
                    </div>		
                    <div class="col-2 border text-center pt-2 bg-light">
                        <p class="font-weight-bold text-break small">Доп. информация</p>
                    </div>	
                </div>         
            `

            // заполняем строки таблицы "Исходные данные"
            arrZd.forEach((item, i)=> {
                let _row = cr(divTable, 'div', 'row');
                    let _div1 = cr(_row, 'div', 'col-4 border bg-white text-center bg-white', item.name);                
                    let _div2 = cr(_row, 'div', 'col-2 border bg-white text-center bg-white', item.walls.value);
                    let _div3 = cr(_row, 'div', 'col-2 border bg-white text-center bg-white', item.h.value + ' / ' + item.hk.value);
                    let _div4 = cr(_row, 'div', 'col-2 border bg-white text-center bg-white', item.info.value); 
            });

            //если есть общее примечание, то вставляем
            if(data.prim) {
                let _row = cr(divTable, 'div', 'row mt-2', 'Примечание: ' + data.prim);
            }

            //РАСЧЕТ
            let divrow4 = cr(_stage5, 'div', 'row justify-content-center mt-2');
                let title4 = cr(divrow4, 'h6', '', 'Результаты расчета:');
                

            let divrow5 = cr(_stage5, 'div', 'row justify-content-center');
         
            //выделяем направления
            
            napr.forEach((el, i)=>{
                let _row1 = cr(divrow5, 'div', 'row container-fluid');

                    let _col11 = cr(_row1, 'div', 'col-4 font-weight-bold', 'Здание пожара ---> облучаемое здание:')
                    let _col12 = cr(_row1, 'div', 'col-6 border bg-white', el[0] + ' ---> ' + el[1]);

                let _row2 = cr(divrow5, 'div', 'row container-fluid');
                    let _col21 = cr(_row2, 'div', 'col-4 font-weight-bold', 'Расстояние между зданиями:')
                    let _col22 = cr(_row2, 'div', 'col-2 border-left bg-white', el[2] + ' м');
                    let _col23 = cr(_row2, 'div', 'col-4 border-right bg-white');
                
                let _row3 = cr(divrow5, 'div', 'row container-fluid');
                    let _col31 = cr(_row3, 'div', 'col-4 font-weight-bold', 'Излучающ. поверхность(и): ');
                    let _col32 = cr(_row3, 'div', 'col-6 pr-5 border bg-white');

                let _row4 = cr(divrow5, 'div', 'row container-fluid');
                    let _col41 = cr(_row4, 'div', 'col-4 font-weight-bold', 'Принимающая поверхность (материал): ');
                    let _col42 = cr(_row4, 'div', 'col-6 border bg-white');
                
                let _row6 = cr(divrow5, 'div', 'row container-fluid');
                    let _col61 = cr(_row6, 'div', 'col-4 font-weight-bold', 'Интенсивность теплового излучения:');
                    let _col62 = cr(_row6, 'div', 'col-2 border-left bg-white');
                    let _col63 = cr(_row6, 'div', 'col-4 border-right bg-white');

                let _row7 = cr(divrow5, 'div', 'row container-fluid');
                    let _col71 = cr(_row7, 'div', 'col-4 font-weight-bold', 'Условие безопасности расстояния:');
                    let _col72 = cr(_row7, 'div', 'col-6 border bg-white');

                let _row8 = cr(divrow5, 'div', 'row container-fluid');
                   _row8.innerHTML = `<hr>`;

                //заполняем поле ИП
                _col32.textContent = strIP(el.ip);
                
                //заполняем поля ПП
                if (el.pp == 15400) _col42.textContent = 'Пластик';
                if (el.pp == 17500) _col42.textContent = 'Лакокрасочное покрытие';
                if (el.pp == 17400) _col42.textContent = 'Рулонная кровля';
                if (el.pp == 13900) _col42.textContent = 'Древесина';
                
                //массив napr дополняет свойствами "строка ип с размерами" и "принимающая поверхность" для передаче серверу
                el[7] = _col32.textContent;
                el[8] = _col42.textContent;

                //заполняем поле интенсивность
                _col62.innerHTML =`${el.q} Вт/м<sup>2</sup>`;

                //условие безопасности
                let sign = ' < '; //знак равенства
                let proviso = 'соблюдается'; // условие безопасности

                if (el.q > +el.pp) {
                    sign = ' > ';
                    proviso = 'не соблюдается';
                } else if (el.q == +el.pp){
                    sign = ' = ';
                    proviso = 'не соблюдается';              
                } else {
                    sign = ' < ';
                    proviso = 'соблюдается';   
                }
                
                _col72.textContent = ` ${el.q} ${sign} ${+el.pp} - ${proviso}`;
            }); //foreach   
            
            //кнопка - подробный отчет (word)
            let divrow6 = cr(_stage5, 'div', 'row justify-content-center m-1');
                let btn_new = cr(divrow6, 'button', 'btn btn-info', 'Новый расчет');
                btn_new.id = 'btn_new';
   
            //кнопка - подробный отчет (word)
            let divrow7 = cr(_stage5, 'div', 'row justify-content-center m-1');
                let btn_word = cr(divrow7, 'button', 'btn btn-info', 'Подробный отчет (word)');
                btn_word.id = 'btn_word';
} //////////5
