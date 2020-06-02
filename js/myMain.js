btn_add.addEventListener('click', addBuilding);

let sumBuilding = 1;

function addBuilding(e) {
	let fieldset = document.querySelector('fieldset');
	let fieldsetN = fieldset.cloneNode(true);
	sumBuilding++;
	

	fieldsetN.innerHTML = `
		<legend>Здание ${sumBuilding}</legend>
		
		<div class="row">
			  <div class="input-field col s5">
				<input id="nameBuilding${sumBuilding}" type="text" class="validate" name="nameBuilding_name${sumBuilding}">
				<label for="nameBuilding${sumBuilding}">Наименование здания (дом, сарай, гараж и др.</label>
			  </div>
			  <div class="input-field col s7">
				<input id="addressBuilding${sumBuilding}" type="tel" class="validate" name="addressBuilding_name${sumBuilding}">
				<label for="addressBuilding${sumBuilding}">Адрес здания (либо номер позиции)</label>
			  </div>
		</div>	
		
		<div class="row">
		
		  <div class="input-field col s5">
			<select>
			  <option value="" disabled selected>Укажите материал наружных стен</option>
			  <option value="1">Кирпич</option>
			  <option value="2">Блоки ПГС (шлакоблоки)</option>
			  <option value="3">Древесина</option>
			  <option value="4">Другой материал (указать в комментариях)</option>
			</select>
			<label>Mатериал стен</label>
		  </div>
		  
		  <div class="input-field col s7">
			<input id="hBuilding${sumBuilding}" type="tel" class="validate" name="hBuilding_name${sumBuilding}">
			<label for="hBuilding${sumBuilding}">Высота здания (до конька крыши), м</label>
		  </div>
		</div>	
		
		<div class="file-field input-field">
		  <div class="btn">
			<span>Фото здания</span>
			<input type="file" name="inputfile" multiple>
		  </div>
		  <div class="file-path-wrapper">
			<input class="file-path validate" type="text" placeholder="Загрузите одно или несколько фото здания">
		  </div>
		</div>
	`
	
	div_btn.before(fieldsetN);
}







/*
sendform.addEventListener('submit', submit_click);

async function submit_click (e) {
	e.preventDefault(); 

	fetch('../app/form.php', {
		method: 'post',
		body: new FormData(sendform)
	})
		.then(response => response.json())
		.then(text => console.log(text))
		.catch(error => console.error(error));

}
*/

/*
const input = document.getElementById('idPhoto');

const upload = (file) => {
  fetch('https://api.telegram.org/bot909184349:AAH0_OkFhIdP7elO7F94TeorS_aAKALdb5Q/sendPhoto', { // Your POST endpoint
    method: 'POST',
    body: file // This is your file object
  }).then(
    response => response.json() 
  ).then(
    success => console.log(success) 
  ).catch(
    error => console.log(error) 
  );
  
  alert(file.src);
};

// Event handler executed when a file is selected
const onSelectFile = () => upload(input.files[0]);

// Add a listener on your input
// It will be triggered when a file will be selected
input.addEventListener('change', onSelectFile, false);
*/
