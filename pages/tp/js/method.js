//стройка блоков
function cr (_parent, _tagName, _class, _textContent) {
    let elem = document.createElement(_tagName);
    elem.className = _class;
    elem.textContent = _textContent;
    _parent.appendChild(elem);
    return elem; 
}


//номер кадра
function chK(num){
    myTitle.textContent = 'Кадр № ' + num;
}

//расчет φ : параметры w,h,r
//ПАРАЛЛЕЛЬНО
function phi_0 (w,h,r) {
    let a = h/r;
    let b = w/r;
    let phi =  1/(2*Math.PI)*(a/Math.sqrt(1+a*a)*Math.atan(b/Math.sqrt(1+a*a)) + b/Math.sqrt(1+b*b)*Math.atan(a/Math.sqrt(1+b*b)));
    return +phi.toFixed(5);
}

//ПЕРПЕНДИКУЛЯРНО
function phi_90 (w,h,r){
    let a = h/r;
    let b = w/r;
    let phi =  1/(2*Math.PI)*(Math.atan(a) - 1/Math.sqrt(1+b*b)*Math.atan(a/Math.sqrt(1+b*b)));
    return +phi.toFixed(5); 
}

//ПОД УГЛОМ
function phi_a (w,h,r,angle){
    let a = h/r;
    let b = w/r;

    let cos = Math.cos(angle*Math.PI/180);
    let sin = Math.sin(angle*Math.PI/180);


    let bbcos = Math.sqrt(1+b*b-2*b*cos);
    let asin = Math.sqrt(a*a+sin*sin);

    let phi =  1/(2*Math.PI)*(Math.atan(a) - (1-b*cos)/bbcos*Math.atan(a/bbcos) + a*cos/asin*(Math.atan((b-cos)/asin) + Math.atan(cos/asin)));
 
    return +phi.toFixed(5); 
}

//расчет коэфф. для одной ИП!
function rectXY (x1, x2, x3, y1, y2, y3, r, a) {
    if (a<0 || a>=180) return alert ('не верно введен угол изучающей поверхности');

    let w1, w2, w3, w4, h1, h2, h3, h4;
    // Зоны (сверху -вниз): 765 812 934

    //не может быть при параллельном расположении т.Х в горизонтальной плоскости
    if (a == '0' && arrIP.z) return alert ('Ошибка. При параллельном расположении точка Х в вертикальной плоскости');

    //в ИП, в т.ч. на границах и в углу (ТОЛЬКО ДЛЯ ПАРАЛЛЕЛЬНОГО РАСПОЛОЖЕНИЯ!), для других - только на сторонах, но не внутри
    if (!(x3<x1 || x3>x2 || y3<y1 || y3>y2)) {
        //console.log('зона 1');

        if (a == '0') {
            w1 = w3 = x3-x1; w2 = w4 = x2-x3;  h1 = h2 = y2-y3; h3 = h4 = y3-y1;
            return phi_0(w1, h1,r) + phi_0(w2, h2,r) + phi_0(w3, h3,r) + phi_0(w4, h4,r);
        }

    }

    //Для остальных случаев
    if(x3>=x2 && y3<y2 && y3>y1) {
        //console.log('зона 2');
        w13 = w24 = x3-x1; w3 = w4 = x3-x2; h13 = h3 = y2-y3; h24 = h4 = y3-y1;
        if (a == '0') return phi_0(w13, h13,r) + phi_0(w24, h24,r) - phi_0(w3, h3,r) - phi_0(w4, h4,r);
        if (a == '90' && !arrIP.z) return phi_90(w13, h13,r) + phi_90(w24, h24,r) - phi_90(w3, h3,r) - phi_90(w4, h4,r);
        if (a == '90' && arrIP.z) return phi_90(h13, w13,r) - phi_90(h3, w3,r);
        if (!arrIP.z) return phi_a(w13, h13,r,a) + phi_a(w24, h24,r,a) - phi_a(w3, h3,r,a) - phi_a(w4, h4,r,a);
        if (arrIP.z) return phi_a(h13, w13,r,a) - phi_a(h3, w3,r,a);
    }

    if (x3>x1 && x3<x2 && y3<=y1) {
        //console.log('зона 3');
        w13 = w3 = x3-x1; w24 = w4 = x2-x3; h13 = h24 = y2-y3; h3 = h4 = y1 - y3;
        if (a == '0') return phi_0(w13, h13,r) + phi_0(w24, h24,r) - phi_0(w3, h3,r) - phi_0(w4, h4,r);
        if (!arrIP.z) return alert('Ошибка, программа не учитывает сторону облучения (слева, справа). Выберите горизонтальную плоскость или измените данные точки Х или ИП');
        if (a == '90') return phi_90(h13, w13,r) + phi_90(h24, w24,r) - phi_90(h3, w3,r) - phi_90(h4, w4,r);
        return phi_a(h13, w13,r,a) + phi_a(h24, w24,r,a) - phi_a(h3, w3,r,a) - phi_a(h4, w4,r,a);
  
    }

    if (x3>=x2 && y3<=y1){
       //console.log('зона 4');    
        w1234 = w34 = x3 - x1; w24 = w4 = x3 - x2; h1234 = h24 = y2 - y3; h34 = h4 = y1 - y3;
        if (a == '0') return phi_0(w1234, h1234,r) - phi_0(w34, h34,r) - phi_0(w24, h24,r) + phi_0(w4, h4,r);
        if (a == '90' && !arrIP.z) return phi_90(w1234, h1234,r) - phi_90(w34, h34,r) - phi_90(w24, h24,r) + phi_90(w4, h4,r);
        if (a == '90' && arrIP.z) return phi_90(h1234, w1234,r) - phi_90(h34, w34,r) - phi_90(h24, w24,r) + phi_90(h4, w4,r);
        if (!arrIP.z) return phi_a(w1234, h1234,r,a) - phi_a(w34, h34,r,a) - phi_a(w24, h24,r,a) + phi_a(w4, h4,r,a);
        if (arrIP.z) return phi_a(h1234, w1234,r,a) - phi_a(h34, w34,r,a) - phi_a(h24, w24,r,a) + phi_a(h4, w4,r,a);         
    }

    if (x3>=x2 && y3>=y2){
        //console.log('зона 5'); 
        
        w1234 = w34 = x3 - x1; w24 = w4 = x3 - x2; h1234 = h24 = y3 - y1; h34 = h4 = y3 - y2;
        if (a == '0') return phi_0(w1234, h1234,r) - phi_0(w34, h34,r) - phi_0(w24, h24,r) + phi_0(w4, h4,r);
        if (a == '90' && arrIP.z) return alert ('Ошибка, программа учитывает облучение принимающей поверхности СВЕРХУ. Измените данные точки Х или ИП');
        if (a == '90') return phi_90(w1234, h1234,r) - phi_90(w34, h34,r) - phi_90(w24, h24,r) + phi_90(w4, h4,r);
        if (!arrIP.z) return phi_a(w1234, h1234,r,a) - phi_a(w34, h34,r,a) - phi_a(w24, h24,r,a) + phi_a(w4, h4,r,a);
        if(confirm('Происходит ли облучение принимающей поверхности?'))return phi_a(h1234, w1234,r,a) - phi_a(h34, w34,r,a) - phi_a(h24, w24,r,a) + phi_a(h4, w4,r,a); else return alert('Принимающая поверхность не находится в зоне облучения');
    }

    if (x3>x1 && x3<x2 && y3>=y2){
        //console.log('зона 6');

        w13 = w3 = x3-x1; w24 = w4 = x2-x3; h13 = h24 = y3-y1; h3 = h4 = y3 - y2;
        if (a == '0') return phi_0(w13, h13,r) + phi_0(w24, h24,r) - phi_0(w3, h3,r) - phi_0(w4, h4,r); 
        if (!arrIP.z) return alert('Ошибка, программа не учитывает сторону облучения (слева, справа). Выберите горизонтальную плоскость или измените данные точки Х или ИП');
        if (a == '90' && arrIP.z) return alert ('Ошибка, программа учитывает облучение принимающей поверхности СВЕРХУ. Измените данные точки Х или ИП');
        //для случая если ПП находится в гор. плоскости и выше ИП - учитывать будет ли облучение в зависимости от расстояния, смещения и угла
        if(confirm('Происходит ли облучение принимающей поверхности?'))return phi_a(h13, w13,r,a) + phi_a(h24, w24,r,a) - phi_a(h3, w3,r,a) - phi_a(h4, w4,r,a); else return alert('Принимающая поверхность не находится в зоне облучения'); 

    }

    if (x3<=x1 && y3>=y2){
        //console.log('зона 7');

        w1234 = w34 = x2 - x3; w24 = w4 = x1 - x3; h1234 = h24 = y3 - y1; h34 = h4 = y3 - y2;
        if (a == '0') return phi_0(w1234, h1234,r) - phi_0(w34, h34,r) - phi_0(w24, h24,r) + phi_0(w4, h4,r);
        if (a == '90' && arrIP.z) return alert ('Ошибка, программа учитывает облучение принимающей поверхности СВЕРХУ. Измените данные точки Х или ИП');
        if (a == '90') return phi_90(w1234, h1234,r) - phi_90(w34, h34,r) - phi_90(w24, h24,r) + phi_90(w4, h4,r);
        if (!arrIP.z) return phi_a(w1234, h1234,r,a) - phi_a(w34, h34,r,a) - phi_a(w24, h24,r,a) + phi_a(w4, h4,r,a);
        if(confirm('Происходит ли облучение принимающей поверхности?'))return phi_a(h1234, w1234,r,a) - phi_a(h34, w34,r,a) - phi_a(h24, w24,r,a) + phi_a(h4, w4,r,a); else return alert('Принимающая поверхность не находится в зоне облучения'); 
    }

    if (x3<=x1 && y3>y1 && y3<y2){
        //console.log('зона 8');

        w13 = w24 = x2-x3; w3 = w4 = x1-x3; h13 = h3 = y3-y1; h24 = h4 = y2-y3;
        if (a == '0') return phi_0(w13, h13,r) + phi_0(w24, h24,r) - phi_0(w3, h3,r) - phi_0(w4, h4,r);
        if (a == '90' && !arrIP.z) return phi_90(w13, h13,r) + phi_90(w24, h24,r) - phi_90(w3, h3,r) - phi_90(w4, h4,r);
        if (a == '90' && arrIP.z) return phi_90(h24, w24,r) - phi_90(h4, w4,r);
        if (!arrIP.z) return phi_a(w13, h13,r,a) + phi_a(w24, h24,r,a) - phi_a(w3, h3,r,a) - phi_a(w4, h4,r,a);
        if (arrIP.z) return phi_a(h24, w24,r,a) - phi_a(h4, w4,r,a);
    }

    if (x3<=x1 && y3<=y1){
        //console.log('зона 9');

        w1234 = w34 = x2 - x3; w24 = w4 = x1 - x3; h1234 = h24 = y2 - y3; h34 = h4 = y1 - y3;
        if (a == '0') return phi_0(w1234, h1234,r) - phi_0(w34, h34,r) - phi_0(w24, h24,r) + phi_0(w4, h4,r);
        if (a == '90' && !arrIP.z) return phi_90(w1234, h1234,r) - phi_90(w34, h34,r) - phi_90(w24, h24,r) + phi_90(w4, h4,r);
        if (a == '90' && arrIP.z) return phi_90(h1234, w1234,r) - phi_90(h34, w34,r) - phi_90(h24, w24,r) + phi_90(h4, w4,r);
        if (!arrIP.z) return phi_a(w1234, h1234,r,a) - phi_a(w34, h34,r,a) - phi_a(w24, h24,r,a) + phi_a(w4, h4,r,a);
        if (arrIP.z) return phi_a(h1234, w1234,r,a) - phi_a(h34, w34,r,a) - phi_a(h24, w24,r,a) + phi_a(h4, w4,r,a);                
    }

    if (a !== '0') return alert('не размещайте точку Х в ИП, программа не учитывает сторону облучения');

}

//метод добавления текста в canvas
function addTextToCanvas (text, x, y, style, color) {
    let t;
    if (style && color ) {
        t = new createjs.Text(text, style, color);
    } else {
        //стиль по умолчанию
        t = new createjs.Text(text, "13x Arial", "#000");
    }
    t.x = x;
    t.y = y;
    _stage.addChild(t);
}

//рисуем линии в канвасе
function drawLine (x1, y1, x2, y2, width, color){
    // width - толщина линии;  color - цвет #000
    let line = new createjs.Shape();
    _stage.addChild(line);
    line.graphics.setStrokeStyle(width).beginStroke(color);
    line.graphics.moveTo(x1, y1);
    line.graphics.lineTo(x2, y2);
    line.graphics.endStroke();
}

function drawCanvas(w, h){
    w<150 ? w=150 : w=w;
    h<150 ? h=150 : h=h;

    let div_canvas = cr(divrow5,'div','row justify-content-center');
        div_canvas.id = 'div_canvas';

    let canvas = cr(div_canvas,'canvas');
        canvas.setAttribute('width', w);
        canvas.setAttribute('height', h);
        canvas.style = "border:1px solid #ccc; background: #fff";
        canvas.id = 'canvas';

    let stage = new createjs.Stage("canvas");
    
    stage.w = w;
    stage.h = h;

    return stage;
}

//рисуем ИП, оси, точку Х и рассчитываем коэффициента угловой облученности, точку с макс. излучением
function drawIP(stage) {

    //определяем общий коэффициент облученности для сцены
    stage.phi = 0;

    arrIP.forEach((ip, i, arr)=>{
        let rectIP = new createjs.Shape();
        rectIP.graphics.beginStroke("red").beginFill("#e0e0e0").drawRect(0, 0, ip.w*stage.step, ip.h*stage.step);
        rectIP.x = stage.xn + ip.x*stage.step;
        rectIP.y = stage.yn - ip.y*stage.step - ip.h*stage.step;
        stage.addChild(rectIP);

        //расположение ИП (подпись), определяем свойство phi для ip
        let rasp = "под углом " + ip.a; //(парал., перп., под углом ...)
        if (ip.a == '0') rasp = "паралл.";
        if (ip.a == '90') rasp = "перп.";

        ip.phi = +rectXY(ip.x, ip.x + ip.w, arr.x, ip.y, ip.y + ip.h, arr.y, ip.r, ip.a).toFixed(3);

        stage.phi += ip.phi;
        stage.phi = Math.round(stage.phi*1000)/1000;

        let name = 'ИП №'+ +(i+1) + ' ' + rasp;
        let text = new createjs.Text(name, "9x Arial", "#004DFF");
        text.x = rectIP.x + 7;
        text.y = rectIP.y + 7;
        ip.text = text;
        stage.addChild(ip.text);

        let phi = 'φ = ' + ip.phi;
        let text2 = new createjs.Text(phi, "9x Arial", "#004DFF");
        text2.x = rectIP.x + 7;
        text2.y = rectIP.y + 18;
        ip.text2 = text2;
        stage.addChild(ip.text2);

        
        //подпись ИП (первая точка) и риска. Проверка на перекрытие!!!!
        // по Х (условие if чтобы не дублировать 0)
        if (rectIP.x !== 0) {
            addTextToCanvas(ip.x, rectIP.x, stage.yn-12); 
            drawLine(rectIP.x, stage.yn+3, rectIP.x, stage.yn-3, 1, '#090');
        }
        if ((ip.x+ip.w) !== 0){
            addTextToCanvas(ip.x+ip.w, rectIP.x + ip.w*stage.step, stage.yn-12); 
            drawLine(rectIP.x + ip.w*stage.step, stage.yn+3, rectIP.x + ip.w*stage.step, stage.yn-3, 1, '#090');
        }

        //по Y
        if (ip.y !== 0){
            addTextToCanvas(ip.y, stage.xn+3, stage.yn - ip.y*stage.step-5); 
            drawLine(stage.xn-3, stage.yn - ip.y*stage.step, stage.xn+3, stage.yn - ip.y*stage.step, 1, '#090');
        }

        if ((ip.y+ip.h) !== 0){
            addTextToCanvas(ip.y+ip.h, stage.xn+3, rectIP.y -5);
            drawLine(stage.xn-3, rectIP.y, stage.xn+3, rectIP.y, 1, '#090');   
        }
    }); //перебор всех ИП

    //рисуем координатные оси
    drawLine(stage.xn, 0, stage.xn, stage.h, 1, '#0f1');
    drawLine(0, stage.yn, stage.w, stage.yn, 1, '#0f1');

    addTextToCanvas('0', stage.xn - 8, stage.yn + 4); //ноль

    //рисуем точку X
    let pointX = new createjs.Shape();
    pointX.graphics.beginFill("Red").drawCircle(0, 0, 4);
    pointX.x = stage.xn + arrIP.x*stage.step;
    pointX.y = stage.yn - arrIP.y*stage.step;
    stage.addChild(pointX);
    //точка Х
    addTextToCanvas("Х", pointX.x + 6, pointX.y - 9, "bold 18px Arial", "#f00")

    //ищем точку с максимальным угловым коэффициентом
    //находим центр зоны расчета и определяем шаг (50%)
    let cx = stage.zonaW/2;
    let cy = stage.zonaH/2;
    let step = (stage.maxX-cx)*0.3; //процент 30%, постепенно уменьшается
    //делаем измерение в 5 точках и сравниваем результаты и движемся к нужной точке. И рисуем точку
    searchPoint (cx, cy, step); //запускаем рукурсивную функцию с поиском нужной точки с максимальным phi
    
    //рисуем точку с максм. значением Х
    let pmax = new createjs.Shape();
    pmax.graphics.beginFill("#ff0").drawCircle(0, 0, 2);
    pmax.x = stage.xn + pointMaxX.x*stage.step;
    pmax.y = stage.yn - pointMaxX.y*stage.step;
    stage.addChild(pmax);
    //addTextToCanvas(pointMaxX.phi, pmax.x + 6, pmax.y - 9, "8px Arial", "#f85");
    // console.log(pointMaxX);                          //ВКЛЮЧИТЬ ПОСЛЕ ВСЕХ ТЕСТОВ!!!! методы 299
}

//расчет углового коэфф. и интенсивности облучения, помещение данных в канвас
function calcQ (stage){
    let Q; //интенсивность теплового излучения
    let ev = 0.9 // степень черноты облучаемого материала
    if (selectPP.selectedIndex == 4) ev = 0.27; else ev = 0.9; //если выбрана оцинковка, то изменяем степень черноты

    Q = Math.round(5.7*Math.pow((1/0.7+1/ev-1),-1)*(Math.pow(12.73,4)-Math.pow(2.78,4))*stage.phi);
    
    let phi = 'φ = ' + stage.phi;
    let q = 'q = ' + Q;

    stage.q = Q;

    addTextToCanvas(phi, 4, 5);
    addTextToCanvas(q, 4, 20);

    stage.update();
}

function searchPoint (x, y, st) {
    
    let px = x; 
    let py = y;
    let step = st;

    if (searchPoint.count > 0) {

        if (searchPhi(px + step,py) > searchPhi(px, py)) {
            //точка 1 больше
            px +=step;
        } else if (searchPhi(px,py - step) > searchPhi(px, py)){
            //точка 2 больше
            py -= step;
        } else if (searchPhi(px - step,py) > searchPhi(px, py)){
            //точка 3 больше
            px -=step;
        } else if (searchPhi(px,py + step) > searchPhi(px, py)){
            //точка 4 больше
            py +=step;
        } else {
            //точка 0 больше крайних значений
            step *= 0.5;
            if (step < 0.1) {
                pointMaxX.x = px;
                pointMaxX.y = py;
                pointMaxX.phi = searchPhi (px,py,step);
                return; 
            }
        }

    } else {
        //определяем основное направление движения точки
        let phiNum = [searchPhi(px, py), searchPhi(px + step,py), searchPhi(px,py - step), searchPhi(px - step,py), searchPhi(px,py + step)];

        let way = phiNum.indexOf(Math.max(...phiNum)); // путь 1 - направо, 2 - вниз, 3 - влево, 4 - вверх, 5 - центр

        if (way == 1) px +=step;
        if (way == 2) py -= step;
        if (way == 3) px -=step;
        if (way == 4) py +=step;
        if (way == 5) {
            step *= 0.6;
            if (step < 0.25) {
                pointMaxX.x = px;
                pointMaxX.y = py;
                pointMaxX.phi = searchPhi (px,py,step);
                return; 
            }    
        }
    }

    searchPoint.count ++;
    searchPoint (px, py, step);
}
searchPoint.count = 0; //начальное значение свойства функции, определяем сколько раз функция вызвана


//вспомогательная функция, параметры точки для которой делается расчет
function searchPhi (x, y){
    let phi = 0;
    
   // console.dir(arrIP);

    arrIP.forEach((ip, i, arr)=>{
        ip.phi = +rectXY(ip.x, ip.x + ip.w, x, ip.y, ip.y + ip.h, y, ip.r, ip.a).toFixed(5);
        phi += ip.phi;
        phi = Math.round(phi*100000)/100000;
    });

    return phi;
}

