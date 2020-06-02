
function cr (_parent, _tagName, _class) {
    let elem = document.createElement(_tagName);
    elem.className = _class;
    _parent.appendChild(elem);

    return elem;
}

