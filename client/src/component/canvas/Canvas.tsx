import { MouseEvent, memo, useEffect, useMemo, useRef, useState } from 'react'
import { connect, draw, init, update } from './Particle'
import { useCycle } from 'framer-motion'

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
	const [view, setView] = useState(true)
	const canvasRef = useRef(null)
	let adjustX = 100 //move to x
	let adjustY = 40 //move to y
	let scale = 17
	let spreadSpeed = 4
	let particleDistance = 40
	let radius = 100
	let size = 2
	let width = 1000
	let height = 600
	let particleArray: ParticleType[] = []
	let mouse = { x: 0, y: 0 }
	let lastRender = 0
	let animationFrameId: any

	useEffect(() => {
		if (canvasRef?.current) {
			const canvas = canvasRef.current! as HTMLCanvasElement
			canvas.width = width
			canvas.height = height
			const context = canvas.getContext('2d')!
			context.fillStyle = 'white'
			context.font = '30px Verdana'
			context.fillText('Y.T.', 0, 25)
			const textCoordinates = context.getImageData(0, 0, 55, 26)
			particleArray = init(textCoordinates, adjustX, adjustY, scale, size)

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
				connect(context, mouse, particleArray, particleDistance, radius)
			}
			const animloop = () => {
				animationFrameId = window.requestAnimationFrame(animloop)
				let now = Date.now()
				//30 fps rate
				if (now >= lastRender + 32) {
					render()
					lastRender = now
				}
			}
			if (view) {
				animloop()
			}
			return () => {
				window.cancelAnimationFrame(animationFrameId)
			}
		}
	}, [particleArray, mouse, view])

	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', control)
			return () => {
				window.removeEventListener('scroll', control)
			}
		}
	}, [])
	const control = () => {
		if (typeof window !== 'undefined') {
			if (window.scrollY > 670) {
				setView(false)
				window.cancelAnimationFrame(animationFrameId)
			} else {
				setView(true)
			}
		}
	}

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
	const handleTouchMove = (event: React.TouchEvent) => {
		// event.preventDefault()
		let currentTargetRect = event.currentTarget?.getBoundingClientRect()

		mouse = {
			x: event.touches[0].clientX - currentTargetRect.left,
			y: event.touches[0].clientY - currentTargetRect.top,
		}
	}
	const handleMouseLeave = () => {
		mouse = {
			x: 0,
			y: 0,
		}
	}
	return (
		<canvas
			ref={canvasRef}
			{...props}
			onMouseMove={(event) => handleMouseMove(event)}
			onMouseLeave={handleMouseLeave}
			onTouchMove={(event) => handleTouchMove(event)}
			style={{
				width: '1000px',
				height: '600px',
				position: 'absolute',
				top: 70,
				right: '3vw',
				index: -1,
			}}
		/>
	)
})

export default Canvas
