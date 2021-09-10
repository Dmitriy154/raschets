let city; //населенный пункт
let dateTP; // дата расчета
let arrZd = []; // массив зданий
let arr = []; //массив номеров зданий облучения [['2','3'],['1'],['1']]
let napr = []; // двумерный массив [name1, name2, rasst, phi, q]; для кадра 4 и общего вывода
let arrIP = []; // массив ИП, имеет свойства х и у, z (если горизонтальная плоскость (крыша), то z=1) - координаты точки Х 
let _stage = null; // ссылка на canvas_stage в 4 кадре
let pointMaxX = {x:0, y:0, phi:0}; //точка с максимальным коэффициентом облученности
let create_ip; // в переменную скопируем функцию, т.к. функция внутри другой


//для теста
napr = [['adr11','adr22', 2],['adr11','adr33', 3],['adr22','adr44', 4],['adr33','adr44', 5]];
//kadr1();
kadr4();

// КАДР 1 - исходные данные ///////////////////////
function kadr1() {
    build_kadr_1();
    //создание карточек для зданий tp_zd
    arrZd[0] = new Zd(1, _stage1);
    
    //обработчик для кнопки добавить здание
    btn_addZd.addEventListener('click', ()=> {
        let newZd = new Zd(arrZd.length + 1, _stage1);
        arrZd[arrZd.length] = newZd;
    }); 

    //обработчик для кнопки продолжить расчет
    btn_next1.addEventListener('click', ()=> {
        //запоминаем населенный пункт и дату расчета
        city = city.value;
        dateTP = dateTP.value;

        //заполняем свойства name (краткое обозначение зданий)
        arrZd.forEach(element => {
            element.name = element.tip.value + ', ' + element.address.value;
        });

        _stage1.remove(); //! удаляем узел id
        kadr2 ();
    });
} //kadr 1 - ввод исходных данных


//КАДР №2 - формируем таблицу, указываем направления номерами зданий облучения /////////
function kadr2() {
    build_kadr_2();
    
    arrZd.forEach((item, i)=> {
        let _input;
        _input = item.inputNums; 

        //обработчик input на ввод
        _input.addEventListener('input', (e)=>{      
            _input.value = e.target.value.replace(/\s+/g,'').trim();            //запрет ввода пробелов или удаляем сразу все пробелы при попытке ввода
            _input.value = e.target.value.replace(/[/;*()A-Za-zА-Яа-яЁё]/,'');  //запрет ввода букв и некоторых символов
            _input.value = e.target.value.replace(/[.]/g, ",");                 //вместо точки пишем запятую

            let numbers = e.target.value.split(','); //автоматическая вставка противоположных направлений. массив с номерами домов облучения
            
            numbers.forEach((num)=>{
                num = +num; // переводим из строки в число
                //исключаем ошибки введенные номер здания - целое число и не превышает кол-во зданий
                if (num>0 && (num <= arrZd.length) && Number.isInteger(num) && num !== (i+1)) {
                   // console.log('i: '+i+ '; num: ' + num +'; numbers: '+numbers+'; arrZd[(num-1)].input.value = ' + arrZd[(num-1)].inputNums.value + '; arrZd.length = ' + arrZd.length);
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
            }); //перебор numbers
           
        }); //слушатель input
    });

    //обработчик для кнопки продолжить расчет
    btn_next1.addEventListener('click', ()=> {
        _stage2.remove();
        kadr3 ();
    }); 
} /////kadr 2


// ввод расстояний для пар зданий
function kadr3() {
    build_kadr_3();

    arrZd.forEach((item, i)=> {
        arr.push(item.inputNums.value.split(','))
    });

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
            _address1 = arrZd[i].name;
            arr[0].forEach((item)=>{
                if(item>1) _address2 = arrZd[(item-1)].name;
                rasst_stroka(_address1, _address2);
            })        
        } else {
            arr[i].forEach((item)=>{
                _address1 = arrZd[i].name;//&
                _address2 = arrZd[(item-1)].name;
                rasst_stroka(_address1, _address2);
            })  
        }
    });

    //обработчик для кнопки продолжить расчет
    btn_next1.addEventListener('click', ()=> {
        _stage3.remove();
        //корректируем  расстояние в цифру
        napr.forEach((item, i) => {
            napr[i][2] = +napr[i][2].value;
        });

        kadr4 ();
    });
} //kadr 3


//КАДР 4 - расчет каждого направления
function kadr4(){
    
    let naprCurrent = 0; // текущее направление
    build_kadr_4(naprCurrent);

    //функция анализа координат и размеров ИП и коорд. точки X
    let minX, minY; // минимальные значения x  и y  после перебора всех ИП и точки Х
    let maxX, maxY; //максимальные значения после перебора (либо точка Х, либо крайняя правая сторона ИП для х)
    let step, stepW, stepH; // масштаб
    
    
    //кнопка СХЕМА ИП - рисуем чертеж, считаем угл.коэфф. и интенсивность общую и для каждой ип
    bt_sh.addEventListener('click', ()=>{
        let error = false;          //если есть незаполненные поля
        searchPoint.count = 0;      //сброс счетчика функции для определения максимального Х

        //если есть canvas то обновить (удалить)
       if (stage.querySelector("canvas")) stage.querySelector("canvas").parentNode.remove();
       console.log(_stage);
       _stage = null;

        //получение координат точки Х
        arrIP.x = +inputX_x.value;
        arrIP.y = +inputX_y.value;
        arrIP.z = +gorizontX.checked; //булевое значение - по умолчанию 0

        arrIP.forEach((ip, i)=>{
            ip.num = i+1; //добавляем свойство объекту ip - номер ИП

            ip.w = +ip.i_w.value;
            ip.h = +ip.i_h.value;
            ip.r = +ip.i_r.value;
            ip.x = +ip.i_x.value;
            ip.y = +ip.i_y.value;
            ip.a = +ip.i_а.value;

            //если есть пустые w, h, r - то return
            if (!(ip.w && ip.h && ip.r)) {
                error = true;
            }

            if (i==0){
                if (arrIP.x > ip.x) minX = ip.x; else minX = arrIP.x;
                if (arrIP.y > ip.y) minY = ip.y; else minY = arrIP.y;
                if (arrIP.x > (ip.x + ip.w)) maxX = arrIP.x; else maxX = (ip.x + ip.w);
                if (arrIP.y > (ip.y + ip.h)) maxY = arrIP.y; else maxY = (ip.y + ip.h);
            } else {
                if(ip.x < minX) minX = ip.x;
                if(ip.y < minY) minY = ip.y;
                if(maxX < (ip.x + ip.w)) maxX = ip.x + ip.w;
                if(maxY < (ip.y + ip.h)) maxY = ip.y + ip.h;
            }
         });//перебор объектов arrIP

         if (error) {
             alert ('Заполните все поля');
             btn_nextN.style.display = 'none'; // кнопка следующее направление исчезает
             return;
         }
         
         let zonaW = maxX - minX;
         let zonaH = maxY - minY;
         let zonaWW; //zona W с учетом оси y
         let zonaHH;
         let otstup = 50; //в пикселях
         let x0, y0; //координаты (0;0) - в пикселях

         let w_canvas = zonaW*step*2; ////////////////////////////////////////////////СТОП ТУТ
         let h_canvas = 300;
 
         //x0 - 3 варианта/ w_canvas в пикселях
         if (minX >= 0) {
            x0 = otstup;
            zonaWW = maxX; //в единицах оси
         }
         if (minX < 0 && maxX > 0) {
            x0 = otstup - minX*step;
            zonaWW = zonaW;
         }
         if (maxX <= 0) {
            x0 = w_canvas - otstup;
            zonaWW = zonaW - minX;
        }

        console.log(zonaWW);
 
         //y0 - 3 варианта/ w_canvas в пикселях
         if (minY >= 0) y0 = h_canvas - otstup;
         if (minY < 0 && maxY > 0) y0 = otstup + maxY*step;
         if (maxY <= 0) y0 = otstup;

         switch(true) {
            case(zonaW < 5)  :  stepW = 100;  break;
            case(zonaW < 10) :  stepW = 70;   break;
            case(zonaW < 15) :  stepW = 50;   break;
            case(zonaW < 20) :  stepW = 40;   break;
            case(zonaW < 60) :  stepW = 20;   break;
            default: alert('ошибка ввода');   break;
        }

        switch(true) {
            case(zonaH < 3)  :  stepH = 100;  break;
            case(zonaH < 6) :   stepH = 50;   break;
            case(zonaH < 10) :  stepH = 30;   break;
            case(zonaH < 15) :  stepH = 20;   break;
            case(zonaH < 25) :  stepH = 15;   break;
            case(zonaH < 100) :  stepH = 5;   break;
            default: alert('ошибка ввода');  break;
        }

        if(stepW > stepH) step = stepH; else step = stepW; //масштаб

        console.log('step = '+ step);

        _stage = drawCanvas(w_canvas, h_canvas); //добавляем canvas, возвращаем stage (createjs)
        _stage.xn = x0;
        _stage.yn = y0;
        _stage.step = step;
        _stage.minX = minX;
        _stage.minY = minY;
        _stage.maxX = maxX;
        _stage.maxY = maxY;
        _stage.zonaH = zonaH;
        _stage.zonaW = zonaW;

        drawIP(_stage); // рисуем оси, рисуем ИП - считаем / метод в build - рисуем точку Х и точку с макс. значением угл. коэфф.
        calcQ(_stage); // подсчитываем угловой коэфф. и q, размещаем информацию в канвасе

        //кнопка "Следующее направление" (перемещаем после канвас и делаем видимой)
        bt_nextN.style.display = ''; //делаем видимой      
    }); //кнопка схема расчета

    bt_nextN.addEventListener('click', ()=>{

        //сохраняем данные: направление, ИП, ПП, т.Х и картинку канвас
        napr[naprCurrent].pp = selectPP.value; //13900
        napr[naprCurrent].ip = arrIP;
        napr[naprCurrent].phi = _stage.phi;
        napr[naprCurrent].q = _stage.q;
        napr[naprCurrent].imgData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);

        //подписываем следующее направление
        naprCurrent ++;

        divNapr.innerHTML = `<h6>Направление расчета: 
        <span class="text-danger">${napr[naprCurrent][0]}</span> &#8594   <span class="text-primary">${napr[naprCurrent][1]}</span>. &nbsp
        Расстояние: <span class="text-info">${napr[naprCurrent][2]} м</span>
        </h6>`;
        
        //очищаем все поля и убираем лишние ИП
        
        //ПП
        selectPP.selectedIndex = 0;  //выбираем древесина по умолчанию
        
        divForIp.innerHTML = ""; //удаляем в row для ип все ип
        create_ip (divForIp); //делаем первую ип
        
        //обнуляем точку Х и флажок
        inputX_x.value = '';
        inputX_y.value = '';
        gorizontX.value = '0'
 
        arrIP = [];     //очищаем arrIP от предыдущих значений, если были
        //canvas.getContext('2d').putImageData(imgData, x, y)
        //console.log(canvas);
        console.log(napr);

        console.log('текущее направление ' + naprCurrent);

        //отслеживаем последнее направление и выводим "Далее"
        if (naprCurrent == napr.length) console.log('последнее');

         //_stage4.remove();
         //kadr5();
    }); //кнопка СЛЕДУЮЩЕЕ НАПРАВЛЕНИЕ

}//кадр 4


