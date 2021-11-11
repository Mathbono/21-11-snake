class Canvas {
	constructor(size, length, level, increaseLevel, apples) {
		this.canvasElement = document.createElement('canvas');
		if (!this.canvasElement.getContext) {
			throw new Error('Canvas non supporté par le navigateur');
		}
		this.canvasElement.setAttribute('width', globalThis.innerWidth);
		this.canvasElement.setAttribute('height', globalThis.innerHeight);
		document.body.appendChild(this.canvasElement);
		this.setlevelSpeeds();
		this.pause = false;
		this.size = size;
		this.level = level;
		this.speed = this.levelSpeeds.get(this.level);
		this.increaseLevel = increaseLevel;
		this.snake = new Snake(
			this.canvasElement.getContext('2d'),
			this.size,
			length
		);
		if (apples === 0) {
			this.apples = null;
			this.applesEaten = null;
		} else if (apples > 0) {
			this.apples = [];
			for (let i = 0; i < apples; i++) {
				this.createApple();
			}
			this.applesEaten = 0;
		}
		this.seconds = this.increaseLevel;
		this.startIntervals();
	}

	createApple() {
		this.apples.push(
			new Apple(
				this.canvasElement.getContext('2d'),
				this.size,
				this.apples,
				this.snake
			)
		);
	}

	isAppleEaten() {
		for (let apple of this.apples) {
			if (
				this.snake.coords[this.snake.coords.length - 1].x ===
					apple.coords.x &&
				this.snake.coords[this.snake.coords.length - 1].y === apple.coords.y
			) {
				this.apples.splice(this.apples.indexOf(apple), 1);
				this.createApple();
				this.snake.grow();
				this.applesEaten++;
			}
		}
	}

	startIntervals() {
		this.intervalMove = setInterval(() => this.moveSnake(), this.speed);
		this.intervalSpeed = setInterval(() => this.onSecondSetSpeed(), 1000);
		this.pause = false;
	}

	stopIntervals() {
		clearInterval(this.intervalSpeed);
		clearInterval(this.intervalMove);
		this.pause = true;
	}

	endGame(won) {
		this.stopIntervals();
		this.canvasElement.remove();
		setEndPopupElement(this.level, this.applesEaten, won);
	}

	setlevelSpeeds() {
		this.levelSpeeds = new Map();
		let ms = 1000;
		for (let l = 1; l <= 20; l++) {
			this.levelSpeeds.set(l, ms);
			if (ms > 100) {
				ms -= 100;
			} else if (ms > 10) {
				ms -= 10;
			} else if (ms === 10) {
				ms -= 5;
			}
		}
	}

	onSecondSetSpeed() {
		this.seconds--;
		if (this.seconds === 0) {
			this.seconds = this.increaseLevel;
			this.level++;
			if (this.level > 20) this.endGame(true);
			clearInterval(this.intervalMove);
			this.speed = this.levelSpeeds.get(this.level);
			this.intervalMove = setInterval(() => this.moveSnake(), this.speed);
		}
		this.printCounters();
	}

	printCounters() {
		const ctx = this.canvasElement.getContext('2d');
		ctx.fillStyle = 'green';
		ctx.font = '50px serif';
		ctx.clearRect(10, 10, 60, 50);
		ctx.fillText(this.level < 10 ? '0' + this.level : this.level, 10, 50);
		ctx.clearRect(globalThis.innerWidth - 70, 10, 60, 50);
		ctx.fillText(
			this.seconds < 10 ? '0' + this.seconds : this.seconds,
			globalThis.innerWidth - 70,
			50
		);
	}

	moveSnake() {
		this.snake.move();
		if (this.apples !== null) {
			this.isAppleEaten();
		}
		if (this.snake.collision === true) {
			this.endGame(false);
		}
	}
}
