//Запишимо значення даних за замовчуванням
let min = 1;
let max = 100;
let score = 20;


//===============функції========================================================================

//Напишемо функцію, що задає кількість спроб та мінімум і максимум випадкового числа
function start() {
	document.querySelector('.score span').innerText = score;
	document.querySelector('.range .min').innerText = min;
	document.querySelector('.range .max').innerText = max;
}


//Напишемо функцію для генерування випадкових чисел від min да max
function random (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Напишемо функцію для початку гри вдруге, тобто щоб скидалось все до початкового стану і генерувалось інше випадкове число
function getStartOver() {
	document.body.removeAttribute('style');
	document.querySelector('.left .button').removeAttribute('style');
	document.querySelector('.score span').innerText = score;
	document.querySelector('.answer').innerText = 'Let\'s begin to guessing!';
	document.querySelector('.question').innerText = '???';
	document.querySelector('input').value = '';
	hiddenNamber = random(min, max);
	console.log(hiddenNamber);
}

//Напишемо функцію для перевірки введеного числа, тобто дії при спрацюванні кнопки 'Check it!'
function getCheckIt() {
	if (document.querySelector('.score span').innerText > 0) {
		document.querySelector('.score span').innerText--;
		if (document.querySelector('input').value === '') {
			document.querySelector('.answer').innerText = 'Enter the number!';
		} else if (document.querySelector('input').value < hiddenNamber) {
			document.querySelector('.answer').innerText = 'This number is small!';
		} else if (document.querySelector('input').value > hiddenNamber) {
			document.querySelector('.answer').innerText = 'This number is big!';
		} else {
			document.querySelector('.answer').innerText = 'You guessed the number!';
			document.querySelector('.question').innerText = hiddenNamber;
			if (+document.querySelector('.best span').innerText < +document.querySelector('.score span').innerText) document.querySelector('.best span').innerText = document.querySelector('.score span').innerText;
			
			document.querySelector('.left .button').style.display = "none";
			document.body.style.backgroundColor = "green";
		}
	} else {
		document.querySelector('.answer').innerText = 'You did not guess!';
		document.querySelector('.left .button').style.display = "none";
		document.body.style.backgroundColor = "red";
	}
}

//Напишемо функцію для входу у налаштування
function getSettings() {
	document.querySelector('.settings').classList.remove('hidden');
	document.querySelector('.back').classList.remove('hidden');
}

//Напишемо функцію для закриття вікна налаштувань
function getCancel() {
	document.querySelector('.settings').classList.add('hidden');
	document.querySelector('.back').classList.add('hidden');
	document.querySelector('.param__min input').value = '';
	document.querySelector('.param__max input').value = '';
	document.querySelector('.param__score input').value = '';
}

//Напишемо функцію для перевірки і збереження налаштувань
function getSave() {
	if (document.querySelector('.param__min input').value === '') {
		document.querySelector('.param__min input').style.border = "0.1em solid red";
		document.querySelector('.param__min').style.color = "red";
	}
	if (document.querySelector('.param__max input').value === '') {
		document.querySelector('.param__max input').style.border = "0.1em solid red";
		document.querySelector('.param__max').style.color = "red";
	}
	if (document.querySelector('.param__score input').value === '') {
		document.querySelector('.param__score input').style.border = "0.1em solid red";
		document.querySelector('.param__score').style.color = "red";
	}
	if (+document.querySelector('.param__min input').value >= +document.querySelector('.param__max input').value) {
		document.querySelector('.param__min input').style.border = "0.1em solid red";
		document.querySelector('.param__min').style.color = "red";
		document.querySelector('.param__max input').style.border = "0.1em solid red";
		document.querySelector('.param__max').style.color = "red";
	} else {
		document.querySelector('.param__min input').removeAttribute('style');
		document.querySelector('.param__min').removeAttribute('style');
		document.querySelector('.param__max input').removeAttribute('style');
		document.querySelector('.param__max').removeAttribute('style');
	}
	if (+document.querySelector('.param__score input').value <= 0) {
		document.querySelector('.param__score input').style.border = "0.1em solid red";
		document.querySelector('.param__score').style.color = "red";
	} else {
		document.querySelector('.param__score input').removeAttribute('style');
		document.querySelector('.param__score').removeAttribute('style');
	}
	if ((+document.querySelector('.param__score input').value > 0) && (+document.querySelector('.param__min input').value < +document.querySelector('.param__max input').value)) {
		score = +document.querySelector('.param__score input').value;
		min = +document.querySelector('.param__min input').value;
		max = +document.querySelector('.param__max input').value;
		start();
		getCancel();
		getStartOver();
		document.querySelector('.best span').innerText = '0';
	}
}

//===============================================================================================

//Задамо кількість спроб та мінімум і максимум випадкового числа
start();

//Згенеруємо випадкове число і присвоємо його змінній
let hiddenNamber = random(min, max);
console.log(hiddenNamber);

//Відслідковуємо клік на усьому документі
document.addEventListener("click", function(event) {
	//Відслідковуємо кліки на кнопках
	const button = event.target.closest('.button');
	const settings = event.target.closest('button');
	const cancel = event.target.closest('.cancel');
	const close = event.target.closest('.close');
	const save = event.target.closest('.save');
	

	if (button) {
		if (button.innerText == 'Check it!') getCheckIt();
		if (button.innerText == 'Start over!') getStartOver();
	}

	if (settings) getSettings();

	if (cancel || close) getCancel();

	if (save) getSave();

});

//Будемо відслідковувати натискання клавіш
document.addEventListener("keydown", function(event) {
	if ((event.code == 'Enter' || event.code == 'NumpadEnter') && document.querySelector('.settings').classList.contains('hidden')) getCheckIt();
	if (event.code == 'KeyS') getSettings();
	if (event.code == 'Escape') getCancel();
});


