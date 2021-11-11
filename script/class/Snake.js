class Snake {
	constructor(ctx, size, length) {
		this.collision = false;
		this.coords = [];
		this.ctx = ctx;
		this.direction = 'right';
		this.size = size;
		let x = this.size * 2;
		for (let i = 0; i < length; i++) {
			this.coords.push({x, y: this.size * 2});
			x += this.size;
		}
		this.initialPrint();
	}

	areCoordsEqual(coord1, coord2) {
		return coord1.x === coord2.x && coord1.y === coord2.y;
	}

	initialPrint() {
		this.ctx.fillStyle = 'green';
		for (let coord of this.coords) {
			this.ctx.fillRect(coord.x, coord.y, this.size, this.size);
		}
	}

	isAutoCollision() {
		for (let i = 0; i < this.coords.length; i++) {
			for (let j = 0; j < this.coords.length; j++) {
				if (i === j) continue;
				if (this.areCoordsEqual(this.coords[i], this.coords[j])) {
					this.collision = true;
				}
			}
		}
	}

	isCollisionWithWall() {
		if (
			this.coords[this.coords.length - 1].x < 0 ||
			this.coords[this.coords.length - 1].x > globalThis.innerWidth ||
			this.coords[this.coords.length - 1].y < 0 ||
			this.coords[this.coords.length - 1].y > globalThis.innerHeight
		) {
			this.collision = true;
		}
	}

	grow() {
		switch (this.direction) {
			case 'right':
				this.coords.unshift({
					x: this.coords.x - this.size,
					y: this.coords.y
				});
				break;
			case 'bottom':
				this.coords.unshift({
					x: this.coords.x,
					y: this.coords.y - this.size
				});
				break;
			case 'left':
				this.coords.unshift({
					x: this.coords.x + this.size,
					y: this.coords.y
				});
				break;
			case 'top':
				this.coords.unshift({
					x: this.coords.x,
					y: this.coords.y + this.size
				});
				break;
		}
	}

	print() {
		this.ctx.clearRect(
			this.coords[0].x,
			this.coords[0].y,
			this.size,
			this.size
		);
		this.coords.shift();
		this.ctx.fillStyle = 'green';
		this.ctx.fillRect(
			this.coords[this.coords.length - 1].x,
			this.coords[this.coords.length - 1].y,
			this.size,
			this.size
		);
		this.isAutoCollision();
		this.isCollisionWithWall();
	}

	move() {
		switch (this.direction) {
			case 'right':
				this.coords.push({
					x: this.coords[this.coords.length - 1].x + this.size,
					y: this.coords[this.coords.length - 1].y
				});
				break;
			case 'bottom':
				this.coords.push({
					x: this.coords[this.coords.length - 1].x,
					y: this.coords[this.coords.length - 1].y + this.size
				});
				break;
			case 'left':
				this.coords.push({
					x: this.coords[this.coords.length - 1].x - this.size,
					y: this.coords[this.coords.length - 1].y
				});
				break;
			case 'top':
				this.coords.push({
					x: this.coords[this.coords.length - 1].x,
					y: this.coords[this.coords.length - 1].y - this.size
				});
				break;
		}
		this.print();
	}
}
