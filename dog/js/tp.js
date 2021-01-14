function cr (_parent, _tagName, _class, _textContent) {
    let elem = document.createElement(_tagName);
    elem.className = _class;
    elem.textContent = _textContent;
    _parent.appendChild(elem);
    return elem; 
}

let _stage1 = cr(stage,'form'); //_stage1 - скрываемая часть (кроме кнопок) _stage2 - таблица и т.д.
    let divForm = cr(_stage1, 'div', 'container-xl');
        let row1 = cr(divForm, 'div', 'row'); 
            
            //адрес расчета
            let div_address = cr(row1, 'div', 'col-sm-6 input-group m-1 p-0').innerHTML = `
                <div class="input-group-prepend">
                    <span class="input-group-text">Адрес расчета</span>
                </div>
                <input type="text" class="form-control">
            `;

            //Дата расчета
            let div_date = cr(row1, 'div', 'col-sm-2 m-1 p-0');
                let _date = cr(div_date, 'input', 'form-control');
                    _date.type = 'date';
            
            //расстояние до ПАСЧ
            let div_rast = cr(row1, 'div', 'col-sm-2 m-1 p-0');
                let _rast = cr(div_rast, 'input', 'form-control');
                    _rast.setAttribute('placeholder', 'Расст. до ПАСЧ, км');
            
            //чек в населенном пункте
            let _divNP = cr(row1, 'div', 'col mt-2 p-1');
                let _divNP2 = cr(_divNP, 'div', 'custom-control custom-radio');
                    _divNP2.innerHTML = `
                        <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input">
                        <label class="custom-control-label" for="customRadio1">в нас. пункте</label>
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
});
