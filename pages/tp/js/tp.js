let arrZd = []; // массив зданий
let arr = []; //массив номеров зданий облучения [['2','3'],['1'],['1']]
let napr = []; // двумерный массив [name1, name2, rasst]; для кадра 4
let arrIP = []; // массив ИП, имеет свойства х и у, z (если горизонтальная плоскость (крыша), то z=1) - координаты точки Х 
let _stage = null; // ссылка на canvas_stage в 4 кадре

//для теста
napr = [['adr11','adr22', 2],['adr11','adr33', 2],['adr22','adr44', 2],['adr33','adr44', 2]];
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
        kadr4 ();
        //корректируем  расстояние в цифру
        napr.forEach((item, i) => {
            napr[i][2] = +napr[i][2].value;
        });

    });
} //kadr 3


//КАДР 4 - расчет каждого направления
function kadr4(){
    build_kadr_4();

    //функция анализа координат и размеров ИП и коорд. точки X
    let minX, minY; // минимальные значения x  и y  после перебора всех ИП и точки Х
    let maxX, maxY; //максимальные значения после перебора (либо точка Х, либо крайняя правая сторона ИП для х)
    let zonaW, zonaH; //размеры рабочей зоны zonaW = maxX - minX;
    let step, stepW, stepH; // масштаб
    
    
    //кнопка СХЕМА ИП - рисуем чертеж, считаем угл.коэфф. и интенсивность общую и для каждой ип
    bt_sh.addEventListener('click', ()=>{
        //если есть canvas то обновить (удалить)
       if (stage.querySelector("canvas")) stage.querySelector("canvas").parentNode.remove();

        //получение координат точки Х
        arrIP.x = +arrIP.ix.value;
        arrIP.y = +arrIP.iy.value;
        arrIP.z = +arrIP.iz.checked; //булевое значение - по умолчанию 0


        arrIP.forEach((ip, i)=>{
            ip.num = i+1; //добавляем свойство объекту ip - номер ИП
            
            //???? перевести во вторичную координатную систему

            ip.w = +ip.i_w.value;
            ip.h = +ip.i_h.value;
            ip.r = +ip.i_r.value;
            ip.x = +ip.i_x.value;
            ip.y = +ip.i_y.value;
            ip.a = +ip.i_а.value;
            
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

         zonaW = maxX - minX;
         zonaH = maxY - minY;
          
         switch(true) {
            case(zonaW < 5)  :  stepW = 100;  break;
            case(zonaW < 10) :  stepW = 50;   break;
            case(zonaW < 15) :  stepW = 30;   break;
            case(zonaW < 20) :  stepW = 25;   break;
            case(zonaW < 60) :  stepW = 10;   break;
            case(zonaW < 200) :  stepW = 5;   break;
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

        _stage = drawCanvas(zonaW*step *2 , zonaH*step*2); //добавляем canvas, возвращаем stage (createjs)
        _stage.step = step;
        _stage.xn = step*(0.5*zonaW - minX); //координаты 0,0 (!!!)      
        _stage.yn = step*(1.5*zonaH + minY);

        //присваиваем свойства для stage,  чтобы отрисовть
        /*
            //функция анализа координат и размеров ИП и коорд. точки X
            let minX, minY; // минимальные значения x  и y  после перебора всех ИП и точки Х
            let maxX, maxY; //максимальные значения после перебора (либо точка Х, либо крайняя правая сторона ИП для х)
            let zonaW, zonaH; //размеры рабочей зоны zonaW = maxX - minX;
            let step, stepW, stepH; // масштаб

        */
       ////////////////////////
       








        //методы приведены в build.js
        drawLine(_stage); //рисуем оси если есть 
        drawIP(_stage); // рисуем ИП - считаем / метод в build
        calcQ(_stage); // подсчитываем угловой коэфф. и q, размещаем информацию в канвасе
        
        /*
        данные для расчета: 
        размеры ИП                        arrIP
        точка Х                           arrIP.x 
        принимающая поверхность         +selectPP.value
        */
        
    })//кнопка схема расчета
   

    

}//кадр 4


//очистка массива arrIP? да наверное, обнулить arrIP.z











/*
1. проверка заполнения всех полей перед переходом к следующему кадру
2. в конце обнулить arrZd = [];

*/