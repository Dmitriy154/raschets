let data = {city:'', prim:''}; // объект с данными город, дата, примечание
let arrZd = []; // массив зданий
let arr = []; //массив номеров зданий облучения [['2','3'],['1'],['1']]
let napr = []; // двумерный массив [name1, name2, rasst, phi, q]; для кадра 4 и общего вывода
let arrIP = []; // массив ИП, имеет свойства х и у, z (если горизонтальная плоскость (крыша), то z=1) - координаты точки Х 
let _stage = null; // ссылка на canvas_stage в 4 кадре
let pointMaxX = {x:0, y:0, phi:0}; //точка с максимальным коэффициентом облученности
let create_ip; // в переменную скопируем функцию, т.к. функция внутри другой


kadr1();

//napr = [['adr11','adr22', 1]];
//kadr4();
//kadr5();



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
        //запоминаем населенный пункт и примечание
        if (city.value) data.city = city.value;
        if (note.value) data.prim = note.value;

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
    //добавляем в массив napr обратные направления
    //napr = [['adr11','adr22', 1],['adr11','adr33', 2],['adr22','adr33', 3]];

    let arr = []; //временный массив, в который вносим обратные направления
    let length = napr.length; // длина первоначального массива

    for (let i = 0; i < length; i++) { 
        arr.push(...napr[i*2]);
        [arr[0], arr[1]] = [arr[1], arr[0]];
        napr.splice(i*2+1, 0, arr);
        arr = [];
    }
    
    let naprCurrent = 0; // текущее направление
    build_kadr_4(naprCurrent);

    //функция анализа координат и размеров ИП и коорд. точки X
    let minX, minY; // минимальные значения x  и y  после перебора всех ИП и точки Х
    let maxX, maxY; //максимальные значения после перебора (либо точка Х, либо крайняя правая сторона ИП для х)
    let step; // масштаб
    
    
    //кнопка СХЕМА ИП - рисуем чертеж, считаем угл.коэфф. и интенсивность общую и для каждой ип
    bt_sh.addEventListener('click', ()=>{
        let error = false;          //если есть незаполненные поля
        searchPoint.count = 0;      //сброс счетчика функции для определения максимального Х

        //если есть canvas то обновить (удалить)
       if (stage.querySelector("canvas")) stage.querySelector("canvas").parentNode.remove();
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
         
         //ОПРЕДЕЛЯЕМ РАЗМЕРЫ КАНВАСА И ОСЕЙ
         let zonaW = maxX - minX; // в единицах
         let zonaH = maxY - minY;

         let zonaWW; //zona W с учетом оси X в единицах оси
         let zonaHH;

         let otstup = 1; //в единицах
         let x0, y0; //координаты (0;0) - в ед.

        //поиск zonaWW, zonaHH
        if (minX >= 0)             zonaWW = maxX; //в единицах оси
        if (minX < 0 && maxX > 0)  zonaWW = zonaW;
        if (maxX <= 0)             zonaWW = zonaW - maxX;

        if (minY >= 0)              zonaHH = maxY;
        if (minY < 0 && maxY > 0)   zonaHH = zonaH;
        if (maxY <= 0)              zonaHH = zonaH - maxY;

        //Линейная интерполяция: 
        //step меняется от 5 до 80, в зависимости от ширины (высоты) от 0.5 до 50
        step = 80 + (5-80)*(0.5 - (zonaWW > zonaHH ? zonaWW : zonaHH))/(0.5 - 60);

        let w_canvas = (zonaWW + 2*otstup)*step > 800 ? 800 : (zonaWW + 2*otstup)*step;
        let h_canvas = (zonaHH + 2*otstup)*step > 800 ? 800 : (zonaHH + 2*otstup)*step;

        if (w_canvas == 800) step = 800/(zonaWW + 2*otstup);
        if (h_canvas == 800) step = 800/(zonaHH + 2*otstup);

        //находим x0, y0 с учетом размеров канваса
        if (minX >= 0)              x0 = otstup;
        if (minX < 0 && maxX > 0)   x0 = otstup - minX;
        if (maxX <= 0)              x0 = w_canvas/step - otstup;


        if (minY >= 0)              y0 = h_canvas/step - otstup;
        if (minY < 0 && maxY > 0)   y0 = h_canvas/step - otstup + minY;
        if (maxY <= 0)              y0 = otstup;

        _stage = drawCanvas(w_canvas, h_canvas); //добавляем canvas, возвращаем stage (createjs)
        _stage.xn = x0*step;
        _stage.yn = y0*step;
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


    //кнопка СЛЕДУЮЩЕЕ НАПРАВЛЕНИЕ
    bt_nextN.addEventListener('click', ()=>{
        //сохраняем данные: направление, ИП, ПП, т.Х и картинку канвас
        napr[naprCurrent].ip = arrIP;
        napr[naprCurrent][3] = arrIP;
        napr[naprCurrent].phi = _stage.phi;
        napr[naprCurrent][4] = _stage.phi;
        napr[naprCurrent].pp = selectPP.value; //13900
        napr[naprCurrent][5] = selectPP.value; //13900
        napr[naprCurrent].q = _stage.q;
        napr[naprCurrent][6] = _stage.q;
        napr[naprCurrent].imgData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);


        //отслеживаем последнее направление и выводим "Далее"
        if (naprCurrent == (napr.length - 1)) {
            _stage4.remove();
            kadr5();
            return;
        }
        
        //подписываем следующее направление
        divNapr.innerHTML = `<h6>Направление расчета: 
        <span class="text-danger">${napr[naprCurrent+1][0]}</span> &#8594   <span class="text-primary">${napr[naprCurrent+1][1]}</span>. &nbsp
        <span class="text-success"> (${naprCurrent+2} из ${napr.length})</span> &nbsp Расстояние: <span class="text-info">${napr[naprCurrent+1][2]} м. </span></h6>`;
        naprCurrent ++;


        //очищаем все поля и убираем лишние ИП
        //ПП
        selectPP.selectedIndex = 0;  //выбираем древесина по умолчанию
        
        divForIp.innerHTML = ""; //удаляем в row для ип все ип
        arrIP = [];     //очищаем arrIP от предыдущих значений, если были. Разместить перед create_ip
        create_ip (divForIp); //делаем первую ип
        
        //обнуляем точку Х и флажок
        inputX_x.value = '';
        inputX_y.value = '';
        gorizontX.checked = false;

        //если есть canvas то обновить (удалить)
        if (stage.querySelector("canvas")) stage.querySelector("canvas").parentNode.remove();
        _stage = null; 
        
        bt_nextN.style.display = 'none'; //скрываем элемент

    }); //кнопка СЛЕДУЮЩЕЕ НАПРАВЛЕНИЕ ("ПРОДОЛЖИТЬ")

}//кадр 4

//КАДР 5 - вывод
function kadr5(){
    
    build_kadr_5();

    btn_new.addEventListener('click',() => {
        //обнуляем
        data = null; // объект с данными город, дата, примечание
        arrZd = []; // массив зданий
        arr = []; //массив номеров зданий облучения [['2','3'],['1'],['1']]
        napr = []; // двумерный массив [name1, name2, rasst, phi, q]; для кадра 4 и общего вывода
        arrIP = []; // массив ИП, имеет свойства х и у, z (если горизонтальная плоскость (крыша), то z=1) - координаты точки Х 
        _stage = null; // ссылка на canvas_stage в 4 кадре
        _stage5.remove();
        kadr1();
    });

    //ДВУМЕРНЫЙ МАССИВ h, hk, walls, prim для сервера
    let arrZdPhp = [];

    arrZd.forEach((zd, i) => {
        arrZdPhp[i] = [];
        arrZdPhp[i][0] = +arrZd[i].h.value;
        arrZdPhp[i][1] = +arrZd[i].hk.value;
        arrZdPhp[i][2] = arrZd[i].walls.value;
        arrZdPhp[i][3] = arrZd[i].info.value;
    });

    data.arrZd = arrZd;
    data.napr = napr;

    console.log(napr);
    console.log(arrZdPhp);

    btn_word.addEventListener('click',async() => {

        let fd = new FormData();
		//в переменную добавляем json, потом его декодируем и профит
		fd.append('data', JSON.stringify(data));

        //цикл по созданию блоб для всех канвас и добавляем в форму
        for (let i=0; i < napr.length; i++) {
            let blob = await ImageDataToBlob(napr[i].imgData);
            let name = 'canvas' + i + '.png';
            fd.append('canvas_field[]', blob, name);
        }

		let response = await fetch('https://raschets.ru/dog/web_tp_word.php', {
		method: 'POST',
		body: fd
		});
          
        //let result = await response.json();
        //console.log(result);
    });
} // кадр 5


/*
1. console.log(pointMaxX);  //ВКЛЮЧИТЬ ПОСЛЕ ВСЕХ ТЕСТОВ!!!! методы 299
2. в полях высота здания и крыши "," и "." автозамена
3. возможность краткой записи д - жилой дом, б-баня, г-гараж, с -сарай, х - хоз. постройка
*/