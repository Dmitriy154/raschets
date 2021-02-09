function build_kadr_1(){
    chK(1);
    let _stage1 = cr(stage,'form'); //_stage1 - скрываемая часть (кроме кнопок) _stage2 - таблица и т.д.
    _stage1.id = '_stage1';
 
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
        

        //блок для зданий
        let divZd = cr(_stage1, 'div', 'container-lg p-0 divZd');
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
                        <th class='align-middle text-center'>Здание пожара, адрес</th>
                        <th class='align-middle text-center'>Облучаемое здание, адрес</th>
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
    arrIP = []; //очищаем предыдущие значения, если они были

    let _stage4 = cr(stage,'div', 'container-xl mt-2');
        _stage4.id = '_stage4';

        //НАПРАВЛЕНИЕ РАСЧЕТА И РАССТОЯНИЕ
        let divrow1 = cr(_stage4, 'div', 'row');
            let divcol11 = cr(divrow1, 'div', 'col');
            let namerow = '';
            divcol11.innerHTML += `<h6>Направление расчета: 
            <span class="text-danger">${napr[0][0]}</span> &#8594   <span class="text-primary">${napr[0][1]}</span>. &nbsp
            Расстояние: <span class="text-info">${napr[0][2]} м</span>
            </h6>`;

        //ПРИНИМАЮЩАЯ ПОВЕРХНОСТЬ
        let divrow2 = cr(_stage4, 'div', 'row');
            let divcol21 = cr(divrow2, 'div', 'col-3 mt-auto');
                divcol21.innerHTML += `<h6>Принимающая поверхность:</h6>`;
            let divcol22 = cr(divrow2, 'div', 'col-3');  
                divcol22.innerHTML += `
                <div>
                    <select class="form-control" id="exampleFormControlSelect1">
                        <option value='1'>Древесина</option>
                        <option value='2'>Пластик</option>
                        <option value='3'>Лакокрасочное покрытие</option>
                        <option value='4'>Рулонная кровля</option>
                    </select>
                </div>
            `;

        //Точка Х и КНОПКА СХЕМА
        let divrow4 = cr(_stage4, 'div', 'row row_bt_sh p-1');
            let divcol41 = cr(divrow4, 'div', 'col-2 mt-auto');
                divcol41.innerHTML += `<h6>Точка Х: </h6>`;
            let divcol42 = cr(divrow4, 'div', 'col-sm-1 m-1 p-0'); 
                let inputX_x = cr(divcol42, 'input', 'form-control');
                    inputX_x.setAttribute('placeholder', 'x');  
            let divcol43 = cr(divrow4, 'div', 'col-sm-1 m-1 p-0'); 
                    let inputX_y = cr(divcol43, 'input', 'form-control');
                        inputX_y.setAttribute('placeholder', 'y');

            let divcol44 = cr(divrow4, 'div', 'col-sm-3 justify-content-center ml-3 pt-1');
                let bt_sh = cr(divcol44, 'button', 'btn btn-outline-info', 'Схема ИП');
                    bt_sh.type = 'button';
                    bt_sh.id = 'bt_sh';
            
            //координаты точки Х делаем как свойства массива arrIP
            arrIP.x = inputX_x;
            arrIP.y = inputX_y;

        createIP();  //создаем строку ИП
}////////////////////////////////// 4

function createIP(){
    
    let divrow3 = cr(_stage4, 'div', 'row pt-1');

        //поместить divrow3 до кнопки СХЕМА ИП
        divrow3.after(stage.querySelector('div.row_bt_sh'));

        let div31 = cr(divrow3, 'div', 'col-2 mt-auto');
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
                input_а.setAttribute('title', '0 - параллельно, 90 - перпендикулярно, 45 - под углом 45 град');
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
                bt_close.style.display = 'none';               
               
        //ИЗЛУЧАЮЩАЯ ПОВЕРХНОСТЬ
        let ip = {};
            ip.i_w = input_w;
            ip.i_h = input_h;
            ip.i_r = input_r;
            ip.i_x = input_x;
            ip.i_y = input_y;
            ip.i_а = input_а;
            arrIP.push(ip);
             

        bt_ip.addEventListener('click', ()=>{
            bt_ip.remove();
            bt_close.style.display = 'block';
            createIP();
        }); 

        bt_close.addEventListener('click', ()=>{
            let num = arrIP.indexOf(ip); //номер удаляемого объекта в массиве
            arrIP.splice(num, 1); // удаляем один объект в массиве
            bt_close.parentNode.remove();
        });
} // createIP() kadr 4

function drawCanvas(w, h){
let div_canvas = cr(_stage4,'div','row justify-content-center');
    let canvas = cr(div_canvas,'canvas');
        canvas.setAttribute('width', w);
        canvas.setAttribute('height', h);
        canvas.style = "border:1px solid #ccc;";
        canvas.id = 'canvas';

    let stage = new createjs.Stage("canvas");
    
    stage.w = w;
    stage.h = h;

    return stage;
}

function drawLine (stage){
    //w,h - размеры канвас, потом координаты сетки и осей
    let _w = x + _x; 
    let _h = y + _y;
    let xx = (stage.w - _w)/2;
    let yy = (stage.h - _h)/2;

    console.log('_w, _h, xx, yy = '+_w +', '+ _h +', '+  xx +', '+ yy);
    console.log('stage.w = '+ stage.w);

    //рисуем сетку


    //рисуем координатные оси
    let line = new createjs.Shape();
    stage.addChild(line);
    line.graphics.setStrokeStyle(1).beginStroke("#000");

    line.graphics.moveTo(xx+_x, yy);
    line.graphics.lineTo(xx+_x, stage.h-yy);

    line.graphics.moveTo(xx, yy+y);
    line.graphics.lineTo(stage.w-xx, yy+y);    

    line.graphics.endStroke();
    stage.update();  

}

/*
function drawIP(stage, num, w, h, r, x, y) {

	let _border = new createjs.Shape();
	_border.graphics.beginStroke("red").drawRect(0, 0, 100, 100);
	_border.x = 100;
	_border.y = 100;
    stage.addChild(_border);
    
	let ip = new createjs.Shape();
	ip.graphics.beginFill("#e0e0e0").drawRect(0, 0, 100, 100);
	ip.x = 100;
	ip.y = 100;
	stage.addChild(ip);
	
	let pointX = new createjs.Shape();
	pointX.graphics.beginFill("Red").drawCircle(0, 0, 2);
	pointX.x = 150;
	pointX.y = 150;
	stage.addChild(pointX);
	
	let text = new createjs.Text("ИП №1", "9x Arial", "#004DFF");
	text.x = 120;
	text.y = 120;
	//text.textBaseline = "alphabetic";
	stage.addChild(text);
	
	stage.update();
}
*/
