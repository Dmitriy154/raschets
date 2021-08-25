//создание зданий, исходные данные
class Zd {
    tip; //тип здания (дом, сарай, гараж ....)
    address;
    name; // краткое обохначение дом, ул. Крупской, 5 tip + address
    walls; //материал стен, отделка
    h; // высота здания
    hk; // высота крыши
    info; //дополнительная информация (размеры в плане)
    row_container_zd; //ссылка на контейнер участка

constructor(num, _stage) {
    this.num = num; //номер здания

    this.row_container_zd = divZd; //свойство ссылается на контейнер для каждого здания

        //поместить divZd до кнопок
       divZd.after(_stage.querySelector('div.row_btns_1'));

        let row_zd = cr(divZd,'div','row m-0 p-0 justify-content-center border border-primary');
            let col_zd = cr(row_zd, 'div', 'container m-0 p-0');

                let row_zd_1 = cr(col_zd, 'div', 'row form-group row m-1 p-1 justify-content-center');
                    
                    //номер здания
                    let divNum = cr(row_zd_1, 'div', 'col-sm-1 m-auto p-0');
                        let _num = cr(divNum, 'h6');
                        _num.textContent = 'Здание №'+num;

                    //вид здания
                    let divTip = cr(row_zd_1, 'div', 'col-sm-2 m-1 p-0');
                        let _tip = cr(divTip, 'input', 'form-control');
                        _tip.setAttribute('placeholder', 'вид здания');
                            this.tip = _tip;
               
                    //адрес
                    let divAdr = cr(row_zd_1, 'div', 'col-sm-4 m-1 p-0');
                        let _adr = cr(divAdr, 'input', 'form-control');
                        _adr.setAttribute('placeholder', 'Адрес здания (без названия нас. пункта)');
                            this.address = _adr;

                    //материал стен
                    let divMat = cr(row_zd_1, 'div', 'col-sm-4 m-1 p-0');
                        let _mat = cr(divMat, 'input', 'form-control');
                        _mat.setAttribute('placeholder', 'Материал стен (отделка) - буква');
                        _mat.title = "д - деревянные, к - кирпич, б - блочные, м - металлические, с - сайдинг (полиэтилен)";
                            this.walls = _mat;                           


                let row_zd_2 = cr(col_zd, 'div', 'row form-group row m-0 p-0 justify-content-center');
                    //высота здания
                    let divH = cr(row_zd_2, 'div', 'col-sm-2 p-1');
                        let _H = cr(divH, 'input', 'form-control');
                        _H.setAttribute('placeholder', 'h здания');
                            this.h = _H;                   
                    
                    //высота крыши здания
                    let divHk = cr(row_zd_2, 'div', 'col-sm-2 p-1');
                        let _Hk = cr(divHk, 'input', 'form-control');
                        _Hk.setAttribute('placeholder', 'h крыши');
                            this.hk = _Hk;   
                    
                    //Причечание для здания
                    let divInf = cr(row_zd_2, 'div', 'col-sm-8 p-1');
                        let _Inf = cr(divInf, 'input', 'form-control');
                        _Inf.setAttribute('placeholder', 'Примечание для здания');
                            this.info = _Inf;
                            


}//конструктор


}//class