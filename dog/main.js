b_tp.addEventListener('click', ()=> {
    hideForm();
    f_tp.style.display = "block";
});

b_ry.addEventListener('click', ()=> {
    hideForm();
    f_ry.style.display = "block";
});



function hideForm (){
    let forms = document.querySelectorAll('form');
    document.querySelectorAll('form')[0].style.display = "none";
    document.querySelectorAll('form')[1].style.display = "none";
}

btn_send_1.addEventListener('click', (e)=> {findBlank (e)});
btn_send_2.addEventListener('click', (e)=> {findBlank (e)});

function findBlank (e){
    let kol = e.target.parentNode.length -1;

    for (let i = 0; i < kol; i++) { 
        if (e.target.parentNode[i].value == "") {
            alert ("Есть незаполненные данные:  " + e.target.parentNode[i].name);
            e.preventDefault(); //отменяем клик по умолчанию
            break;
        }
    }
}


