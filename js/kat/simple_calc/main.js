//переменные помещени
let nameP 
let sqP // площадь помещения
let l_pr = 26 // предельное расстояние

// Наименование помещения и Площадь помещения
let form1 = cr(stage,'form');
    let divForm = cr(form1, 'div', 'container-lg')
        let row_1 = cr(divForm, 'div', 'form-group row m-1 p-1 justify-content-center');
            let label_1 = cr(row_1, 'label', 'col-sm-3 col-form-label text-left', "Наименование помещения");
            let col_11 = cr(row_1, 'div', 'col-sm-3',);
                let input1 = cr(col_11, 'input', 'form-control');
                input1.type = 'text';
        let row_2 = cr(divForm, 'div', 'form-group row m-1 p-1 justify-content-center');
            let label_2 = cr(row_2, 'label', 'col-sm-3 col-form-label text-left');
            label_2.innerHTML = "Площадь помещения, м<sup>2</sup>";

            let col_21 = cr(row_2, 'div', 'col-sm-3',);
                let input2 = cr(col_21, 'input', 'form-control');
                input2.type = 'number';


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
let arrTV = arrPop.concat(tv);

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

//кнопка "На главную"
let _rowIndex = cr(stage,'div','row justify-content-center m-2');
let btn_index = cr(_rowIndex, 'button', 'btn btn-secondary btn-sm m-2', 'На главную');
    btn_index.type = 'button';
    btn_index.addEventListener('click', ()=> location.href = '../../kat.php');    

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
    //если пустая ячейка с минимальной высотой, то подсвечиваем ее
    //циклом пройтись по всем участкам и проверить plot.H и подсветить ее
    
    let mistake_H = false;

    arrPlot.forEach((plot) => {
        //=== т.к. если поставить ==, то '1' приравнивается к true ....
        if (plot.H === true) {
            plot.bodyPost.querySelector('div.div_h').classList.remove("bg-light");
            plot.bodyPost.querySelector('div.div_h').classList.add("bg-danger");
            mistake_H = true;
        } 
    })

    if (mistake_H) return;

    //скрываем все участки и кнопки
    arrPlot.forEach((plot) => {
        plot.rowPost.style = "display:none";
    });

    btn_addPlot.style = "display:none";
    btn_calc.style = "display:none";
    btn_back.style = "display:block";
    btn_index.style = "display:none";
    ////

    nameP = input1.value || 'не указано'
    sqP = +input2.value || '--'
    
    form1.style = 'display:none';
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
        plot.rowPost.style = "display:block";
    });

    btn_addPlot.style = "display:block";
    btn_calc.style = "display:block";
    btn_back.style = "display:none";
    btn_index.style = "display:block";

    //скрываем вывод
    $('div.rowPIN').remove();

    //два инпута восстанавливаем наименование и площадь помещения
    form1.style = 'display:block';
    
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

    if (((plot.Q > 2000 && plot.q > 200) || (plot.Q > 1000 && plot.q > 100 && plot.sq>10)) && !plot.bodyPost.querySelector('div.row_H')) {
           
        let row_H = cr(plot.bodyPost,'div','row row_H m-2 justify-content-center');
            let label = cr(row_H, 'div', 'col-8 col-form-label bg-white', "Укажите минимальное расстояние от поверхности пожарной нагрузки данного участка до перекрытия (расстояние от горючих материалов до потолка), м");
            let div_h = cr(row_H, 'div', 'col-2 d-flex flex-wrap align-content-center bg-light div_h');
                let _h = cr(div_h, 'input', 'form-control text-center');
                    _h.type = 'number';

                plot.H = true; //знать, что для участка необходимо ввести значение

                _h.title = getTitle(plot); //подсказка - пограничное значение H

            //обработчик поля ввода H
            _h.addEventListener('input', (e)=> {
                plot.H = e.target.value;
                if (plot.H == '') {
                    plot.H = true;
                }

                if(div_h.classList.contains("bg-danger")) {
                    div_h.className = 'col-2 d-flex flex-wrap align-content-center bg-light div_h'
                }

                update(plot); // повторяем обновление 
            });
                            
    }  
    
    if(plot.Q < 2000 && plot.q < 200 && plot.bodyPost.querySelector('div.row_H')){
        //удаляем div.row_H 
        plot.H = false;
        plot.bodyPost.querySelector('div.row_H').remove();
    }

}

////РАСЧЕТ
function createPIN() {   
    //рассчитаем общую ПН
    let Q = 0
    let q = arrPlot[0].q
    let h = 0; // минимальное H для помещений категорий В2, В3!
    let arr_h = []
    let gmP = []  // наименования всех ГМ в помещении
    let kat = ''
    let S = 10; //максимальная площадь участка
    let fluid = false   // есть ли жидкости в помещении
    let l_pr = 12; //предельное расстояние
    let userGM = false //материалы пользователя

    arrPlot.forEach((plot) => {
        Q += plot.Q  
        if (q < plot.q) q = plot.q
        if(plot.H >0 || plot.H == 0) arr_h.push(+plot.H)  //т.к. plot.H = true занят другой логикой
        if(S < plot.sq) S = plot.sq //ищем максимальную площадь участка
        if (plot.userGM) userGM = true
  
        for(let mat of plot.gm){
            if(!gmP.includes(mat)) gmP.push(mat); //добавляем в общий массив гор. материал, если его нет
        }
        Q = _round(Q)
        q = _round(q)

    });

    h = Math.min(...arr_h); //извлекаем минимальное значение из массива

                        //проверка условия 5.3.2.............................
    let g_t = '';
    let odds = false; // 5.3.2, если true, то увеличиваем категорию
    let odds2 = false; //5.3.4 если true, то В4 иначе В3

    if(q>1400 && q<=2200) g_t = 2200
    if(q>200 && q<=1400) g_t = 1400

    odds = Q >= 0.64*g_t*h**2;

    console.log("Q="+Q+'; g_t ='+g_t+'; h ='+h);

                // проверка условия 5.3.4 ............................................

    if(Q>2000 && (q>100 && q<=200) && S<=10 && sqP<25) kat = "В3" //площадь не позволит соблюдать пред.расст.

    if(Q>2000 && (q>100 && q<=200) && S<=10) {
        //здесь условия соблюдения расстояний предельных
        //двойной цикличный поиск: ищем в массиве с ТГМ объекты с ГМ в помещении, ещем агрег.сост. - Жидкость
        for (name of gmP) {
            arrTV.forEach ((obj) => {
                if (name == obj.name) {
                    if(obj.as == 'f') fluid = true;
                }
            })
        }

        //вопросы пользователю (стандартное модальное окно)
        let h_b4 = prompt('Укажите минимальное расстояние от поверхности пожарной нагрузки в помещении до перекрытия (расстояние от горючих материалов до потолка), м');
        let user_fluid = false // имеется ли ГЖ в материалах полльзователя

        if (userGM) user_fluid = confirm('Имеются ли среди добавленных Вами веществ и материалов горючие жидкости, в т.ч. ЛВЖ? (если "да" - нажмите "ок", если "нет" - "отмена")')
          
        if (fluid || user_fluid) {
            if (h_b4>=11) l_pr=15; else l_pr = 26-h_b4;
        } else {
            if (userGM) {
                if (h_b4>=11) l_pr = 12; else l_pr = 12 + 11-h_b4;
            }
        }

        //если среди гор. материалов есть древесина, полиэтилен, хлопок
        if (gmP.includes('полиэтилен (пластмасса)')) {
            if (h_b4>=11) l_pr = 5; else l_pr = 5 + 11-h_b4;
        } else if (gmP.includes('древесина') ||  gmP.includes('древесно-волокнистая плита') ||  gmP.includes('древесно-стружечная плита') ||  gmP.includes('древесные опилки')) {
            if (h_b4>=11) l_pr = 6; else l_pr = 6 + 11-h_b4;
        } else if (gmP.includes('хлопок (ткань)') ||  gmP.includes('хлопок в тюках')) {
            if (h_b4>=11) l_pr = 8; else l_pr = 8 + 11-h_b4;
        } else {
            if (h_b4>=11) l_pr = 12; else l_pr = 12 + 11-h_b4;
        }

        //вызываем модальное окно с вопросом, соблюдается ли предельное расстояние
        $('#modal_confirm_if').modal('show')
        
        document.querySelector('.questionUser').innerHTML = `
            <p>Превышают ли расстояния между участками хранения горючих веществ и материалов в помещении <span class="font-weight-bold">${l_pr} м</span></p>`

        document.querySelector('.modal_confirm_if_yes').addEventListener('click', () => {
            odds2 = true
            kat = "В4"    
            cr(bodyPIN, 'p','',`Расстояния между участками храненияя горючих веществ и материалов превышает предельное расстояние для хранимых горючих материалов ${l_pr} м`)
            p_kat.innerHTML = `Категория помщения: <span class="font-weight-bold">${kat}</span>;`
        })
        
        document.querySelector('.modal_confirm_if_no').addEventListener('click', () => {
            odds2 = false
            kat = 'В3';
            cr(bodyPIN, 'p','',`Расстояния между участками храненияя горючих веществ и материалов меньше предельного расстояния для хранимых горючих материалов ${l_pr} м.`)
            p_kat.innerHTML = `Категория помщения: <span class="font-weight-bold">${kat}</span>;`

        })

    } //5.3.4


                // Выбор категории .............................

    if (q>2200 || ((q>1400 && q<=2200) && odds)) kat = 'В1';
    
    if (((q>1400 && q<=2200) && !odds) || ((q>200 && q<=1400) && odds)) kat = 'В2';
     
    if (((q>200 && q<=1400) && !odds) || ((q<200 && S>10 && Q>1000) && !odds2))  kat = 'В3';
    
    if (((q>100 && q<=200) && S<=10 && Q<=2000) || odds2) kat = 'В4';

    if(Q<=1000 && q<=100) kat = 'Д'

    if(kat == '') kat = 'не определена'

                            // структура вывода .........................

    let rowPIN = cr(stage, 'div', 'form-group row m-3 p-1 rowPIN');
        let cardPIN = cr(rowPIN, 'div', 'card col-9 p-0 border mx-auto');

            let headerPIN = cr (cardPIN, 'div', 'card-header container-fluid m-0', 'Результат расчета');
            headerPIN.style = 'background-color: #7dfa89';

            let bodyPIN = cr (cardPIN, 'div', 'card-body text-left');
            bodyPIN.style = 'background-color: #fcffe0';

    bodyPIN.innerHTML = `
    <p id='p_nameP'>Наименование помещения: <span class="font-weight-bold">${nameP}</span>;</p>
    <p id='p_sqP'>Площадь помещения: <span class="font-weight-bold">${sqP} м<sup>2</sup></span>;</p>
    <p id='p_Q'>Общая пожарная нагрузка в помещении составит: <span class="font-weight-bold">${Q} МДж</span>;</p>
    <p id='p_q'>Максимальная удельная пожарная нагрузка в помещении составит: <span class="font-weight-bold">${q} МДж/м<sup>2</sup></span>;</p>
    <p id='p_kat'>Категория помщения: <span class="font-weight-bold">${kat}</span>;</p>
    `;

    if (odds) {
        cr(bodyPIN, 'p').innerHTML = 'Соблюдается неравенство Q &ge; 0,64 &middot; g<sub>т</sub> &middot; H<sup>2</sup>'
    }

   // console.log('nameP: '+nameP+'; sqP: '+sqP+'; Q: '+Q+'; q: '+q+ '; s_уч_макс: '+S+'; kat: '+kat+'; odds: '+odds+'; odds2: '+odds2);
}

function getTitle(plot) {
    let H, gt=0, _text = '';

    if (plot.q>200 && plot.q<=1400) gt = 1400
    if (plot.q>1400 && plot.q<=2200) gt = 2200
    if (gt) H= Math.round(Math.sqrt(plot.Q/(0.64*gt))*100)/100;


    if(gt == 1400) _text = `Подсказка: если данное расстояние будет меньше ${H} м, то категория участка изменится на В2`
    if(gt == 2200) _text `Подсказка: если данное расстояние будет меньше ${H} м, то категория участка изменится на В1`
    console.log(_text);

    return _text;
}