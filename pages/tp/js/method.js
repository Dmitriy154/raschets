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
    return +phi.toFixed(3);
}

//ПЕРПЕНДИКУЛЯРНО
function phi_90 (w,h,r){
    let a = h/r;
    let b = w/r;
    let phi =  1/(2*Math.PI)*(Math.atan(a) - 1/Math.sqrt(1+b*b)*Math.atan(a/Math.sqrt(1+b*b)));
    return +phi.toFixed(3); 
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
 
    return +phi.toFixed(3); 
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
        console.log('зона 1');

        if (a == '0') {
            w1 = w3 = x3-x1; w2 = w4 = x2-x3;  h1 = h2 = y2-y3; h3 = h4 = y3-y1;
            return phi_0(w1, h1,r) + phi_0(w2, h2,r) + phi_0(w3, h3,r) + phi_0(w4, h4,r);
        }

    }

    //Для остальных случаев
    if(x3>=x2 && y3<y2 && y3>y1) {
        console.log('зона 2');
        w13 = w24 = x3-x1; w3 = w4 = x3-x2; h13 = h3 = y2-y3; h24 = h4 = y3-y1;
        if (a == '0') return phi_0(w13, h13,r) + phi_0(w24, h24,r) - phi_0(w3, h3,r) - phi_0(w4, h4,r);
        if (a == '90' && !arrIP.z) return phi_90(w13, h13,r) + phi_90(w24, h24,r) - phi_90(w3, h3,r) - phi_90(w4, h4,r);
        if (a == '90' && arrIP.z) return phi_90(h13, w13,r) - phi_90(h3, w3,r);
        if (!arrIP.z) return phi_a(w13, h13,r,a) + phi_a(w24, h24,r,a) - phi_a(w3, h3,r,a) - phi_a(w4, h4,r,a);
        if (arrIP.z) return phi_a(h13, w13,r,a) - phi_a(h3, w3,r,a);
    }

    if (x3>x1 && x3<x2 && y3<=y1) {
        console.log('зона 3');
        w13 = w3 = x3-x1; w24 = w4 = x2-x3; h13 = h24 = y2-y3; h3 = h4 = y1 - y3;
        if (a == '0') return phi_0(w13, h13,r) + phi_0(w24, h24,r) - phi_0(w3, h3,r) - phi_0(w4, h4,r);
        if (!arrIP.z) return alert('Ошибка, программа не учитывает сторону облучения (слева, справа). Выберите горизонтальную плоскость или измените данные точки Х или ИП');
        if (a == '90') return phi_90(h13, w13,r) + phi_90(h24, w24,r) - phi_90(h3, w3,r) - phi_90(h4, w4,r);
        return phi_a(h13, w13,r,a) + phi_a(h24, w24,r,a) - phi_a(h3, w3,r,a) - phi_a(h4, w4,r,a);
  
    }

    if (x3>=x2 && y3<=y1){
        console.log('зона 4');    
        w1234 = w34 = x3 - x1; w24 = w4 = x3 - x2; h1234 = h24 = y2 - y3; h34 = h4 = y1 - y3;
        if (a == '0') return phi_0(w1234, h1234,r) - phi_0(w34, h34,r) - phi_0(w24, h24,r) + phi_0(w4, h4,r);
        if (a == '90' && !arrIP.z) return phi_90(w1234, h1234,r) - phi_90(w34, h34,r) - phi_90(w24, h24,r) + phi_90(w4, h4,r);
        if (a == '90' && arrIP.z) return phi_90(h1234, w1234,r) - phi_90(h34, w34,r) - phi_90(h24, w24,r) + phi_90(h4, w4,r);
        if (!arrIP.z) return phi_a(w1234, h1234,r,a) - phi_a(w34, h34,r,a) - phi_a(w24, h24,r,a) + phi_a(w4, h4,r,a);
        if (arrIP.z) return phi_a(h1234, w1234,r,a) - phi_a(h34, w34,r,a) - phi_a(h24, w24,r,a) + phi_a(h4, w4,r,a);         
    }

    if (x3>=x2 && y3>=y2){
        console.log('зона 5'); 
        
        w1234 = w34 = x3 - x1; w24 = w4 = x3 - x2; h1234 = h24 = y3 - y1; h34 = h4 = y3 - y2;
        if (a == '0') return phi_0(w1234, h1234,r) - phi_0(w34, h34,r) - phi_0(w24, h24,r) + phi_0(w4, h4,r);
        if (a == '90' && arrIP.z) return alert ('Ошибка, программа учитывает облучение принимающей поверхности СВЕРХУ. Измените данные точки Х или ИП');
        if (a == '90') return phi_90(w1234, h1234,r) - phi_90(w34, h34,r) - phi_90(w24, h24,r) + phi_90(w4, h4,r);
        if (!arrIP.z) return phi_a(w1234, h1234,r,a) - phi_a(w34, h34,r,a) - phi_a(w24, h24,r,a) + phi_a(w4, h4,r,a);
        if(confirm('Происходит ли облучение принимающей поверхности?'))return phi_a(h1234, w1234,r,a) - phi_a(h34, w34,r,a) - phi_a(h24, w24,r,a) + phi_a(h4, w4,r,a); else return alert('Принимающая поверхность не находится в зоне облучения');
    }

    if (x3>x1 && x3<x2 && y3>=y2){
        console.log('зона 6');

        w13 = w3 = x3-x1; w24 = w4 = x2-x3; h13 = h24 = y3-y1; h3 = h4 = y3 - y2;
        if (a == '0') return phi_0(w13, h13,r) + phi_0(w24, h24,r) - phi_0(w3, h3,r) - phi_0(w4, h4,r); 
        if (!arrIP.z) return alert('Ошибка, программа не учитывает сторону облучения (слева, справа). Выберите горизонтальную плоскость или измените данные точки Х или ИП');
        if (a == '90' && arrIP.z) return alert ('Ошибка, программа учитывает облучение принимающей поверхности СВЕРХУ. Измените данные точки Х или ИП');
        //для случая если ПП находится в гор. плоскости и выше ИП - учитывать будет ли облучение в зависимости от расстояния, смещения и угла
        if(confirm('Происходит ли облучение принимающей поверхности?'))return phi_a(h13, w13,r,a) + phi_a(h24, w24,r,a) - phi_a(h3, w3,r,a) - phi_a(h4, w4,r,a); else return alert('Принимающая поверхность не находится в зоне облучения'); 

    }

    if (x3<=x1 && y3>=y2){
        console.log('зона 7');

        w1234 = w34 = x2 - x3; w24 = w4 = x1 - x3; h1234 = h24 = y3 - y1; h34 = h4 = y3 - y2;
        if (a == '0') return phi_0(w1234, h1234,r) - phi_0(w34, h34,r) - phi_0(w24, h24,r) + phi_0(w4, h4,r);
        if (a == '90' && arrIP.z) return alert ('Ошибка, программа учитывает облучение принимающей поверхности СВЕРХУ. Измените данные точки Х или ИП');
        if (a == '90') return phi_90(w1234, h1234,r) - phi_90(w34, h34,r) - phi_90(w24, h24,r) + phi_90(w4, h4,r);
        if (!arrIP.z) return phi_a(w1234, h1234,r,a) - phi_a(w34, h34,r,a) - phi_a(w24, h24,r,a) + phi_a(w4, h4,r,a);
        if(confirm('Происходит ли облучение принимающей поверхности?'))return phi_a(h1234, w1234,r,a) - phi_a(h34, w34,r,a) - phi_a(h24, w24,r,a) + phi_a(h4, w4,r,a); else return alert('Принимающая поверхность не находится в зоне облучения'); 
    }

    if (x3<=x1 && y3>y1 && y3<y2){
        console.log('зона 8');

        w13 = w24 = x2-x3; w3 = w4 = x1-x3; h13 = h3 = y3-y1; h24 = h4 = y2-y3;
        if (a == '0') return phi_0(w13, h13,r) + phi_0(w24, h24,r) - phi_0(w3, h3,r) - phi_0(w4, h4,r);
        if (a == '90' && !arrIP.z) return phi_90(w13, h13,r) + phi_90(w24, h24,r) - phi_90(w3, h3,r) - phi_90(w4, h4,r);
        if (a == '90' && arrIP.z) return phi_90(h24, w24,r) - phi_90(h4, w4,r);
        if (!arrIP.z) return phi_a(w13, h13,r,a) + phi_a(w24, h24,r,a) - phi_a(w3, h3,r,a) - phi_a(w4, h4,r,a);
        if (arrIP.z) return phi_a(h24, w24,r,a) - phi_a(h4, w4,r,a);
    }

    if (x3<=x1 && y3<=y1){
        console.log('зона 9');

        w1234 = w34 = x2 - x3; w24 = w4 = x1 - x3; h1234 = h24 = y2 - y3; h34 = h4 = y1 - y3;
        if (a == '0') return phi_0(w1234, h1234,r) - phi_0(w34, h34,r) - phi_0(w24, h24,r) + phi_0(w4, h4,r);
        if (a == '90' && !arrIP.z) return phi_90(w1234, h1234,r) - phi_90(w34, h34,r) - phi_90(w24, h24,r) + phi_90(w4, h4,r);
        if (a == '90' && arrIP.z) return phi_90(h1234, w1234,r) - phi_90(h34, w34,r) - phi_90(h24, w24,r) + phi_90(h4, w4,r);
        if (!arrIP.z) return phi_a(w1234, h1234,r,a) - phi_a(w34, h34,r,a) - phi_a(w24, h24,r,a) + phi_a(w4, h4,r,a);
        if (arrIP.z) return phi_a(h1234, w1234,r,a) - phi_a(h34, w34,r,a) - phi_a(h24, w24,r,a) + phi_a(h4, w4,r,a);                
    }

    if (a !== '0') return alert('не размещайте точку Х в ИП, программа не учитывает сторону облучения');



}

