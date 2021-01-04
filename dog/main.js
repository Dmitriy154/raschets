b_tp.addEventListener('click', ()=> {
    hideForm();
    f_tp.style.display = "block";
});

b_ry.addEventListener('click', ()=> {
    hideForm();
    f_ry.style.display = "block";
});

b_ri.addEventListener('click', ()=> {
    hideForm();
    f_ri.style.display = "block";
});

function hideForm (){
    let forms = document.querySelectorAll('form');
    document.querySelectorAll('form')[0].style.display = "none";
    document.querySelectorAll('form')[1].style.display = "none";
    document.querySelectorAll('form')[2].style.display = "none";
}