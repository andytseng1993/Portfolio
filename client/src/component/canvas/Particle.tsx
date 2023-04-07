import { Dispatch, SetStateAction } from 'react'
import { ParticleType } from './Canvas'

export const Particle = (x: number, y: number, size: number, index: number) => {
	const baseX = x
	const baseY = y
	const density = Math.random() + 0.1
	return {
		x,
		y,
		size,
		baseX,
		baseY,
		density,
		index,
	}
}
export const draw = (
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	size: number
) => {
	ctx.fillStyle = 'white'
	ctx.beginPath()
	ctx.arc(x, y, size, 0, Math.PI * 2)
	ctx.closePath()
	ctx.fill()
}

export const update = (
	x: number,
	y: number,
	mouse: {
		x: number
		y: number
	},
	radius: number,
	density: number,
	spreadSpeed: number,
	baseX: number,
	baseY: number,
	size: number,
	index: number,
	particleArray: ParticleType[]
	// setParticleArray: Dispatch<SetStateAction<ParticleType[]>>
) => {
	let newX = x
	let newY = y
	let dx = mouse.x - newX
	let dy = mouse.y - newY
	let distance = Math.sqrt(dx * dx + dy * dy)
	let forceDirectionX = dx / distance
	let forceDirectionY = dy / distance
	let maxDirection = radius
	let force = (maxDirection - distance) / maxDirection
	let diectionX = ((forceDirectionX * force) / density) * spreadSpeed
	let diectionY = ((forceDirectionY * force) / density) * spreadSpeed
	if (distance <= radius) {
		newX -= diectionX
		newY -= diectionY
	} else {
		if (newX !== baseX) {
			let dx = newX - baseX
			newX -= dx / 10
		}
		if (newY !== baseY) {
			let dy = newY - baseY
			newY -= dy / 10
		}
	}
	const newData = {
		x: newX,
		y: newY,
		size,
		baseX,
		baseY,
		density,
		index,
	}

	// let newArray = JSON.parse(JSON.stringify(particleArray))
	particleArray[index] = newData
	// setParticleArray(newArray)
}

export const init = (
	textCoordinates: ImageData,
	adjustX: number,
	adjustY: number,
	scale: number,
	size: number
) => {
	let particleArray: ParticleType[] = []
	for (let y = 0; y < textCoordinates.height; y++) {
		for (let x = 0; x < textCoordinates.width; x++) {
			if (
				textCoordinates.data[y * 4 * textCoordinates.width + x * 4 + 3] > 128
			) {
				let positionX = x
				let positionY = y
				particleArray.push(
					Particle(
						positionX * scale + adjustX,
						positionY * scale + adjustY,
						size,
						particleArray.length
					)
				)
			}
		}
	}
	return particleArray
}
