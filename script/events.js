function launchGame(size, length, level, increaseLevel, apples) {
	const canvas = new Canvas(size, length, level, increaseLevel, apples);
	const canvasElement = document.getElementsByTagName('canvas')[0];

	window.addEventListener('resize', () => {
		canvasElement.setAttribute('width', globalThis.innerWidth);
		canvasElement.setAttribute('height', globalThis.innerHeight);
		canvas.snake.initialPrint();
	});

	if (
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent
		)
	) {
		document.getElementById('arrows').classList.remove('hidden');
		document.getElementById('arrow-up').addEventListener('touchstart', () => {
			if (canvas.snake.direction !== 'bottom') {
				canvas.snake.direction = 'top';
			}
		});
		document
			.getElementById('arrow-right')
			.addEventListener('touchstart', () => {
				if (canvas.snake.direction !== 'left') {
					canvas.snake.direction = 'right';
				}
			});
		document
			.getElementById('arrow-down')
			.addEventListener('touchstart', () => {
				if (canvas.snake.direction !== 'top') {
					canvas.snake.direction = 'bottom';
				}
			});
		document
			.getElementById('arrow-left')
			.addEventListener('touchstart', () => {
				if (canvas.snake.direction !== 'right') {
					canvas.snake.direction = 'left';
				}
			});
	} else {
		const arrowKeyPressed = e => {
			switch (e.key) {
				case 'ArrowRight':
					if (canvas.snake.direction !== 'left') {
						canvas.snake.direction = 'right';
					}
					break;
				case 'ArrowDown':
					if (canvas.snake.direction !== 'top') {
						canvas.snake.direction = 'bottom';
					}
					break;
				case 'ArrowLeft':
					if (canvas.snake.direction !== 'right') {
						canvas.snake.direction = 'left';
					}
					break;
				case 'ArrowUp':
					if (canvas.snake.direction !== 'bottom') {
						canvas.snake.direction = 'top';
					}
					break;
			}
		};

		document.addEventListener('keydown', arrowKeyPressed);

		document.addEventListener('keydown', e => {
			if (e.key === 'Escape') {
				if (canvas.pause === false) {
					document.removeEventListener('keydown', arrowKeyPressed);
					canvasElement.classList.add('frozen-canvas');
					canvas.stopIntervals();
				} else if (canvas.pause === true) {
					document.addEventListener('keydown', arrowKeyPressed);
					canvasElement.classList.remove('frozen-canvas');
					canvas.startIntervals();
				}
			}
		});
	}
}
