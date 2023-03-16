let comments = [];
const button = document.getElementsByClassName('form__button')[0];
const form = document.getElementsByClassName('comments__form')[0];

const addLikeListener = () => {
	const likes = document.querySelectorAll('.like');

	for (let item of likes) {
		if (item.getAttribute('listener') !== 'true') {
			item.addEventListener('click', (e) => {
				e.target.setAttribute('listener', 'true');
				item.classList.toggle('like__active');
			});
		}

	}
};

const addDeleteListener = event => {
	const del = document.getElementsByClassName('delete');

	for (let item of del) {
		item.addEventListener('click', event => {
			id = event.target.parentNode.parentNode.id;
			comments = comments.filter(com => {
				if (com.id !== Number(event.target.parentNode.parentNode.id))
					return true;
			});
			document.getElementById(event.target.parentNode.parentNode.id).remove();
		});
	}
};

form.addEventListener('keypress', event => {
	if (event.key === 'Enter' && !event.shiftKey) formSubmit(event);
});
button.addEventListener('click', event => formSubmit(event));

const formSubmit = event => {
	event.preventDefault();
	let commentName = document.getElementsByClassName('input__name')[0];
	let commentText = document.getElementsByClassName('input__text')[0];
	let commentDate = document.getElementsByClassName('input__date')[0];

	if (!commentName.value) {
		commentName.classList.toggle('alert');
		return;
	} else if (!commentText.value) {
		commentText.classList.toggle('alert');
		return;
	} else {
		commentName.classList.remove('alert');
		commentText.classList.remove('alert');
	}

	let comment = {
		id: new Date().getTime(),
		name: commentName.value,
		text: commentText.value,
		date: commentDate.value,
	};

	console.log(comment);
	comments.push(comment);
	commentName.value = '';
	commentText.value = '';
	commentDate.value = '';

	addComent();
	addLikeListener();
	addDeleteListener();
};

const addComent = () => {
	let commentField = document.getElementsByClassName('comments__comment')[0];
	let com = '';

	com += `<div id="${comments[comments.length - 1].id}" class="comment">
					<div class="comment__head">
						<p class="comment__name">${comments[comments.length - 1].name}</p>
						<p class="comment__date">${dateConverter(
							comments[comments.length - 1].date
						)}</p>
					</div>
					<div class="comment__text">${comments[comments.length - 1].text}</div>
					<div class="comment__buttons">
						<span class="material-symbols-outlined like">
							favorite
						</span>
						<span class="material-symbols-outlined delete">
							delete
						</span>
					</div>
				</div>`;

	if (comments.length === 1) commentField.innerHTML = com;
	else commentField.insertAdjacentHTML('beforeend', com);
};

const dateConverter = date => {
	const months = [
		'января',
		'февраля',
		'марта',
		'апреля',
		'мая',
		'июня',
		'июля',
		'августа',
		'сентября',
		'октября',
		'ноября',
		'декабря',
	];
	const now = new Date();
	let currentDate;
	if (date === '') {
		currentDate = new Date();
	} else {
		currentDate = new Date(date);
	}
	if (currentDate.getDate() === now.getDate()) {
		let min = currentDate.getMinutes();
		return (
			'сегодня, ' + currentDate.getHours() + ':' + String(min).padStart(2, '0')
		);
	} else return currentDate.getDate() + ' ' + months[currentDate.getMonth()];
};
