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

    let w1, w2, w3, w4, h1, h2, h3, h4;

    /*
    Зоны:
    765
    812
    934
    */

    //в ИП, в т.ч. на границах и в углу (ТОЛЬКО ДЛЯ ПАРАЛЛЕЛЬНОГО РАСПОЛОЖЕНИЯ!)
    if (!(x3<x1 || x3>x2 || y3<y1 || y3>y2)) {
        console.log('зона 1');
        if (a == '0') {
            w1 = w3 = x3-x1; w2 = w4 = x2-x3;  h1 = h2 = y2-y3; h3 = h4 = y3-y1;
            //return phi_0(w1, h1,r) + phi_0(w2, h2,r) + phi_0(w3, h3,r) + phi_0(w4, h4,r);
        } 
    }

    //Для остальных случаев
    if(x3>x2 && y3<y2 && y3>y1) {
        console.log('зона 2');

        w13 = w24 = x3-x1; w3 = w4 = x3-x2; h13 = h3 = y2-y3; h24 = h4 = y3-y1;
        if (a == '0') return phi_0(w13, h13,r) + phi_0(w24, h24,r) - phi_0(w3, h3,r) - phi_0(w4, h4,r);
        //if (a == '90') return phi_90(h1, w1+w3,r) + phi_90(h2, w2+w4,r) - phi_90(h3, w3,r) - phi_90(h4, w4,r);
        //if (!(a=='0' || a=='90')) return phi_a(h1, w1+w3, r, a) + phi_a(h2, w2+w4, r, a) - phi_a(h3, w3, r, a) - phi_a(h4, w4, r, a);
    }

    if (x3>x1 && x3<x2 && y3<y1) {
        console.log('зона 3');

        w13 = w3 = x3-x1; w24 = w4 = x2-x3; h13 = h24 = y2-y3; h3 = h4 = y1 - y3;
        if (a == '0') return phi_0(w13, h13,r) + phi_0(w24, h24,r) - phi_0(w3, h3,r) - phi_0(w4, h4,r);
        // if (a == '90') return phi_90(h1+h3, w1,r) + phi_90(h2+h4, w2,r) - phi_90(h3, w3,r) - phi_90(h4, w4,r);
        // if (!(a=='0' || a=='90')) return phi_a(h1+h3, w1, r, a) + phi_a(h2+h4, w2, r, a) - phi_a(h3, w3, r, a) - phi_a(h4, w4, r, a);
    }

    if (x3>=x2 && y3<=y1){
        console.log('зона 4');
        
        w1234 = w34 = x3 - x1; w24 = w4 = x3 - x2; h1234 = h24 = y2 - y3; h34 = h4 = y1 - y3;
        if (a == '0') return phi_0(w1234, h1234,r) - phi_0(w34, h34,r) - phi_0(w24, h24,r) + phi_0(w4, h4,r);  
    }

    if (x3>=x2 && y3>=y2){
        console.log('зона 5'); 
        
        w1234 = w34 = x3 - x1; w24 = w4 = x3 - x2; h1234 = h24 = y3 - y1; h34 = h4 = y3 - y2;
        if (a == '0') return phi_0(w1234, h1234,r) - phi_0(w34, h34,r) - phi_0(w24, h24,r) + phi_0(w4, h4,r);  
    }

    if (x3>x1 && x3<x2 && y3>y2){
        console.log('зона 6');

        w13 = w3 = x3-x1; w24 = w4 = x2-x3; h13 = h24 = y3-y1; h3 = h4 = y3 - y2;
        if (a == '0') return phi_0(w13, h13,r) + phi_0(w24, h24,r) - phi_0(w3, h3,r) - phi_0(w4, h4,r); 
    }

    if (x3<=x1 && y3>=y2){
        console.log('зона 7');

        w1234 = w34 = x2 - x3; w24 = w4 = x1 - x3; h1234 = h24 = y3 - y1; h34 = h4 = y3 - y2;
        if (a == '0') return phi_0(w1234, h1234,r) - phi_0(w34, h34,r) - phi_0(w24, h24,r) + phi_0(w4, h4,r);  
    }

    if (x3<x1 && y3>y1 && y3<y2){
        console.log('зона 8');

        w13 = w24 = x2-x3; w3 = w4 = x1-x3; h13 = h3 = y3-y1; h24 = h4 = y2-y3;
        if (a == '0') return phi_0(w13, h13,r) + phi_0(w24, h24,r) - phi_0(w3, h3,r) - phi_0(w4, h4,r);
    }

    if (x3<=x1 && y3<=y1){
        console.log('зона 9');

        w1234 = w34 = x2 - x3; w24 = w4 = x1 - x3; h1234 = h24 = y2 - y3; h34 = h4 = y1 - y3;
        if (a == '0') return phi_0(w1234, h1234,r) - phi_0(w34, h34,r) - phi_0(w24, h24,r) + phi_0(w4, h4,r);  
    }

    //console.log('зоны нет!!!!');
    
    //отдельно для границ для перпендикулярно и под углом ИЛИ прописать правильно внешние границы

}

