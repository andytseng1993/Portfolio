import { MouseEvent, memo, useEffect, useMemo, useRef, useState } from 'react'
import { draw, init, update } from './Particle'

export interface ParticleType {
	x: number
	y: number
	size: number
	baseX: number
	baseY: number
	density: number
	index: number
}

const Canvas = memo(function Canvas(props: any) {
	const canvasRef = useRef(null)
	let adjustX = 100
	let adjustY = 40
	let scale = 18
	let spreadSpeed = 5
	let particleDistance = 50
	let radius = 100
	let size = 2
	let width = 950
	let height = 600
	let particleArray: ParticleType[] = []
	let mouse = { x: 0, y: 0 }

	useEffect(() => {
		if (canvasRef?.current) {
			const canvas = canvasRef.current! as HTMLCanvasElement
			canvas.width = width
			canvas.height = height
			const context = canvas.getContext('2d')!
			context.fillStyle = 'white'
			context.font = '30px Verdana'
			context.fillText('Y.T', 0, 25)
			const textCoordinates = context.getImageData(0, 0, 50, 40)
			particleArray = init(textCoordinates, adjustX, adjustY, scale, size)
			let animationFrameId: any
			const render = () => {
				context.clearRect(0, 0, width, height)
				particleArray.forEach((particle) => {
					if (typeof particle === 'object') {
						draw(context, particle.x, particle.y, size)
						update(
							particle.x,
							particle.y,
							mouse,
							radius,
							particle.density,
							spreadSpeed,
							particle.baseX,
							particle.baseY,
							size,
							particle.index,
							particleArray
						)
					}
				})
				animationFrameId = window.requestAnimationFrame(render)
			}
			render()
			return () => {
				window.cancelAnimationFrame(animationFrameId)
			}
		}
	}, [particleArray, mouse])

	const handleMouseMove = (
		event: MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>
	) => {
		event.preventDefault()
		let currentTargetRect = event.currentTarget.getBoundingClientRect()

		mouse = {
			x: event.clientX - currentTargetRect.left,
			y: event.clientY - currentTargetRect.top,
		}
	}

	return (
		<canvas
			ref={canvasRef}
			{...props}
			onMouseMove={(event) => handleMouseMove(event)}
			style={{
				width: '1000px',
				height: '600px',
				position: 'absolute',
				top: 70,
				right: '3vw',
				index: 10,
			}}
		/>
	)
})

export default Canvas
