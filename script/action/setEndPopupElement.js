let once = false;

function setEndPopupElement(level, applesEaten, won) {
	if (won === true) {
		state = 'gagné';
		once = true;
	} else if (won === false && once === false) {
		state = 'perdu';
	} else {
		state = 'gagné';
	}
	const endPopupElement = document.createElement('div');
	endPopupElement.setAttribute('id', 'endPopup');
	const stateElement = document.createElement('p');
	stateElement.innerHTML = `Vous avez <strong>${state}</strong>`;
	const levelElement = document.createElement('p');
	levelElement.innerHTML = `Vous êtes allé au niveau <span id="level">${
		level <= 20 ? level : 20
	}</span>`;
	const applesElement = document.createElement('p');
	if (applesEaten !== null) {
		applesElement.innerHTML = `Vous avez mangé <span id="applesEaten">${applesEaten}</span> pomme${
			applesEaten > 1 ? 's' : ''
		}`;
	}
	const playElement = document.createElement('input');
	playElement.setAttribute('type', 'button');
	playElement.value = 'Recommencer';
	endPopupElement.appendChild(stateElement);
	endPopupElement.appendChild(levelElement);
	if (applesEaten !== null) {
		endPopupElement.appendChild(applesElement);
	}
	endPopupElement.appendChild(playElement);
	document.body.appendChild(endPopupElement);
	playElement.addEventListener('click', () => {
		document.location.reload();
	});
}
