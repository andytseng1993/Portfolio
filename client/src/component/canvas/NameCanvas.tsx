import {
	MouseEvent,
	memo,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react'
import { connect, draw, init, update } from './Particle'
import { useMotionValueEvent, useScroll } from 'framer-motion'

export interface ParticleType {
	x: number
	y: number
	size: number
	baseX: number
	baseY: number
	density: number
	index: number
}

const NameCanvas = memo(function Canvas(props: any) {
	const [view, setView] = useState(true)
	const [windowWidth, setWindowWidth] = useState(1918)
	const canvasRef = useRef(null)
	const { scrollY } = useScroll()
	const ratio = windowWidth / 1918
	let adjustX = 100 * ratio //move to x
	let adjustY = 40 * ratio //move to y
	let scale = Math.max(17 * ratio, 9.2)
	let spreadSpeed = 4
	let particleDistance = Math.max(40 * ratio, 18)
	let radius = Math.max(100 * ratio, 50)
	let size = 2
	let width = Math.max(1000 * ratio, 500)
	let height = Math.max(600 * ratio, 300)
	if (windowWidth < 414) {
		width = Math.max(1000 * ratio, 370)
		height = Math.max(600 * ratio, 220)
		scale = Math.max(17 * ratio, 7.4)
		radius = Math.max(100 * ratio, 30)
		particleDistance = Math.max(40 * ratio, 15)
	}
	let particleArray: ParticleType[] = []
	let mouse = { x: 0, y: 0 }
	let lastRender = 0
	let animationFrameId: any

	useLayoutEffect(() => {
		setWindowWidth(window.innerWidth)
		const resize = () => {
			setWindowWidth(window.innerWidth)
		}
		window.addEventListener('resize', resize)
		return () => window.removeEventListener('resize', resize)
	}, [])

	useEffect(() => {
		if (canvasRef?.current) {
			const canvas = canvasRef.current! as HTMLCanvasElement
			canvas.width = width
			canvas.height = height
			const context = canvas.getContext('2d', { willReadFrequently: true })!

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

	useMotionValueEvent(scrollY, 'change', (latest) => {
		if (latest > 670) {
			setView(false)
			window.cancelAnimationFrame(animationFrameId)
		} else {
			setView(true)
		}
	})

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
			id="nameCanvas"
			ref={canvasRef}
			{...props}
			onMouseMove={(event) => handleMouseMove(event)}
			onMouseLeave={handleMouseLeave}
			onTouchMove={(event) => handleTouchMove(event)}
			style={{
				position: 'relative',
				index: -1,
				width: `${width}`,
				height: `${height}`,
			}}
		/>
	)
})

export default NameCanvas
