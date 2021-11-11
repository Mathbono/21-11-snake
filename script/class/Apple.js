class Apple {
	constructor(ctx, size, apples, snake) {
		this.ctx = ctx;
		this.size = size;
		this.snake = snake;
		this.apples = apples;
		do {
			this.coords = {
				x: Math.floor(Math.random() * globalThis.innerWidth) - this.size,
				y: Math.floor(Math.random() * globalThis.innerHeight) - this.size
			};
		} while (
			this.coords.x < 0 ||
			this.coords.y < 0 ||
			this.coords.x % this.size !== 0 ||
			this.coords.y % this.size !== 0 ||
			this.isAutoCollision() === true ||
			this.isCollisionWithSnake() === true
		);
		this.initialPrint();
	}

	initialPrint() {
		this.ctx.fillStyle = 'red';
		this.ctx.fillRect(this.coords.x, this.coords.y, this.size, this.size);
	}

	isCollisionWithSnake() {
		for (let snakeCoords of this.snake.coords) {
			if (
				this.coords.x === snakeCoords.x &&
				this.coords.y === snakeCoords.y
			) {
				return true;
			}
		}
		return false;
	}

	isAutoCollision() {
		for (let apple of this.apples) {
			if (
				this.coords.x === apple.coords.x ||
				this.coords.y === apple.coords.y ||
				this.coords.x === apple.coords.x + this.size ||
				this.coords.y === apple.coords.y + this.size ||
				this.coords.x === apple.coords.x - this.size ||
				this.coords.y === apple.coords.y - this.size
			) {
				return true;
			}
		}
		return false;
	}
}
