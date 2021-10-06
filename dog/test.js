let data = {
	city: "Minsk",
	prim: "Примечание",
	arr: ['adress', 'materials', ['1','2','3']]
}

//линия в канвасе
canvasElem.addEventListener('mousemove', (e)=>{
      let ctx = canvasElem.getContext('2d');
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
});

btn_send.addEventListener('click',async() => {
  
        //отправляем объект 
		/*
		let response = await fetch ('web_tp_word.php', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(data)
		});
		let json = await response.json();
		*/
		
		
		//отправляем картинку канвас
		let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));
		let fd = new FormData();
		//в переменную добавляем json, потом его декодируем и профит
		fd.append('data', JSON.stringify(data));
		fd.append('canvas_field', blob, 'canvas.png');
		
		let response = await fetch('web_tp_word.php', {
		method: 'POST',
		body: fd
		});

});




