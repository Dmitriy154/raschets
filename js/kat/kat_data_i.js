//создаем таблицу и заполняем ее

let _table = cr(divData, 'table', "table table-bordered table-sm");
_table.innerHTML = `
    <thead class='thead-dark'>
        <tr>
            <th scope="col">Наименование вещества</th>
            <th scope="col">Хим. формула</th>
            <th scope="col">Молярная масса, кг&middot;к&middot;моль<sup>-1</sup></th>
            <th scope="col">Температура вспышки, &deg;C</th>
            <th scope="col">Температура самовосплам., &deg;C</th>
            <th scope="col">конст. A</th>
            <th scope="col">конст. B</th>
            <th scope="col">конст. C<sub>A</sub></th>
            <th scope="col">Темп. интервал констант уравнения Антуана, &deg;C</th>
            <th scope="col">НКПР пламени, %(об.)</th>
            <th scope="col">Характеристика вещества</th>
            <th scope="col">Теплота сгорания, кДж&middot;кг<sup>-1</sup></th>
        </tr> 
    </thead>
    <tbody id="_tbody"></tbody>
`;

// создание строк //
ind.forEach((el) => {

    let _tr = cr(_tbody, 'tr');

    let _th = cr(_tr, 'th','text-right', el.name);
    _th.setAttribute('scope', 'row');

    let _td1 = cr(_tr, 'td');
    _td1.innerHTML = createFormula(el['formula']);
    let _td2 = cr(_tr, 'td', '', el['Mol.massa']);
    let _td3 = cr(_tr, 'td', '', el['T.vsp']);
    let _td4 = cr(_tr, 'td', '', el['T.samovospl']);
    let _td5 = cr(_tr, 'td', '', el['const.A']);
    let _td6 = cr(_tr, 'td', '', el['const.B']);
    let _td7 = cr(_tr, 'td', '', el['const.Ca']);
    let _td8 = cr(_tr, 'td', '', el['T.interval']);
    let _td10 = cr(_tr, 'td', '', el['NKPR']);
    let _td11 = cr(_tr, 'td', '', el['type']);
    let _td12 = cr(_tr, 'td', '', el['Tepl.sgor']);

});





/*
function getDataTV() {
    return fetch("http://raschets/pages/kat/tv.json")
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Данные не были получены, ошибка: ${response.status}`);
            }
        })
        .catch(err => {
            console.warn(err);
            divData.innerHTML = "<div style='color:red; font-size:30px'>Упс, что-то пошло не так</div>";
        });
}
let tvJSON = getDataTV();
console.log(tvJSON);
*/




