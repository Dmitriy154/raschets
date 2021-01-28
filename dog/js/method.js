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