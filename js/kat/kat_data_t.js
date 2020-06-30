//создаем таблицу и заполняем ее

let _table = cr(divData, 'table', "table table-bordered table-sm");
_table.innerHTML = `
    <thead class='thead-dark'>
    <tr>
        <th scope="col">Вещества и материалы</th>
        <th scope="col">Низшая теплота сгорания Q<sup>p</sup><sub>H</sub>, МДж/кг</th>
    </tr>
    </thead>
    <tbody id="_tbody"></tbody>
`;

// создание строк
tv.forEach((el) => {
    if (el.Q_H) {
        let _tr = cr(_tbody, 'tr');
        let _th = cr(_tr, 'th','', el.name);
        _th.setAttribute('scope', 'row');
        let _td = cr(_tr, 'td', '', el.Q_H);
    }
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




