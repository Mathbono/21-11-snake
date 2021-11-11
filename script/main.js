function isNumber(numb) {
	return Number.isInteger(numb);
}

function isFromTo(numb, min, max) {
	return numb >= min && numb <= max;
}

function isMultipleOf(numb, step) {
	return numb % step === 0;
}

document.getElementById('beginPopup').addEventListener('submit', e => {
	e.preventDefault();
	const form = e.currentTarget;
	const size = Number.parseInt(form.elements['size'].value);
	const length = Number.parseInt(form.elements['lenght'].value);
	const level = Number.parseInt(form.elements['level'].value);
	const increaseLevel = Number.parseInt(form.elements['increase-level'].value);
	const apples = Number.parseInt(form.elements['apples'].value);
	if (
		isNumber(size) &&
		isFromTo(size, 10, 50) &&
		isMultipleOf(size, 10) &&
		isNumber(length) &&
		isFromTo(length, 2, 20) &&
		isNumber(level) &&
		isFromTo(level, 1, 20) &&
		isNumber(increaseLevel) &&
		isFromTo(increaseLevel, 10, 60) &&
		isMultipleOf(increaseLevel, 10) &&
		isNumber(apples) &&
		isFromTo(apples, 0, 10)
	) {
		document.getElementsByTagName('h1')[0].remove();
		form.remove();
		launchGame(size, length, level, increaseLevel, apples);
	}
});
