
function cr (_parent, _tagName, _class, _textContent) {
    let elem = document.createElement(_tagName);
    elem.className = _class;
    elem.textContent = _textContent;

    _parent.appendChild(elem);

    return elem;
}

//ставим цифру в формуле в нижний регистр
function createFormula (t) {
    _t = '';

    for (let i=0; i< t.length; i++){

        if (t[i].match(/[0-9,]/)) {
            _t += '<sub>' + t[i] + '</sub>';
        } else {
            _t += t[i];
        }
    }
    return _t;
}