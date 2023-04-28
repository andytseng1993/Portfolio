export const cell = (x: number, y: number, symbol: string, color: string) => {
	return {
		x,
		y,
		symbol,
		color,
	}
}

export const scanImage = (
	cellSize: number,
	pixels: ImageData,
	deviceRatio: number
) => {
	let imageCellArray = []
	for (let y = 0; y < pixels.height; y += cellSize * deviceRatio) {
		for (let x = 0; x < pixels.width; x += cellSize * deviceRatio) {
			const posX = x * 4
			const posY = y * 4
			const pos = posY * pixels.width + posX
			if (pixels.data[pos + 3] > 128) {
				const red = pixels.data[pos]
				const green = pixels.data[pos + 1]
				const blue = pixels.data[pos + 2]
				const total = red + green + blue
				const averageColor = Math.floor(total / 3)
				const color = 'rgb(' + red + ',' + green + ',' + blue + ')'
				const symbol = coverToSymbol(averageColor)
				imageCellArray.push(cell(x, y, symbol, color))
			}
		}
	}
	return imageCellArray
}
export const coverToSymbol = (color: number) => {
	if (color > 250) return '@'
	else if (color > 240) return '#'
	else if (color > 220) return '$'
	else if (color > 200) return '%'
	else if (color > 180) return '&'
	else if (color > 160) return '*'
	else if (color > 140) return 'X'
	else if (color > 120) return '+'
	else if (color > 100) return '='
	else if (color > 80) return 'v'
	else if (color > 60) return '!'
	else if (color > 40) return ':'
	else if (color > 20) return "'"
	else return ''
}

export const drawAscii = (
	ctx: CanvasRenderingContext2D,
	width: number,
	height: number,
	imageCellArray: {
		x: number
		y: number
		symbol: string
		color: string
	}[],
	cellSize: number,
	deviceRatio: number
) => {
	ctx.clearRect(0, 0, width, height)
	imageCellArray.forEach((cell) => {
		draw(ctx, cell.x, cell.y, cell.symbol, cell.color, cellSize, deviceRatio)
	})
}

export const draw = (
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	symbol: string,
	color: string,
	cellSize: number,
	deviceRatio: number
) => {
	ctx.font = cellSize * deviceRatio * 1.2 + 'px Verdana'
	ctx.fillStyle = 'white'
	ctx.fillText(symbol, x + 0.1, y + 0.1)
	ctx.fillStyle = color
	ctx.fillText(symbol, x, y)
}
