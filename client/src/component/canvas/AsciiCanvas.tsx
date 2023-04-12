import { memo, useEffect, useRef } from 'react'
import selfSrc from '../../assets/self.png'
import { drawAscii, scanImage } from './Ascii'

const AsciiCanvas = memo(function Canvas(props: { cellsize: number }) {
	const canvasRef = useRef(null)
	let { cellsize } = props
	let imageCellArray = []

	useEffect(() => {
		if (canvasRef?.current) {
			const canvas = canvasRef.current! as HTMLCanvasElement
			const context = canvas.getContext('2d', { willReadFrequently: true })!
			const { devicePixelRatio: deviceRatio = 1 } = window

			const image = new Image()
			image.src = selfSrc
			image.onload = function initialize() {
				canvas.style.width = `${image.width}px`
				canvas.style.height = `${image.height}px`
				canvas.width = image.width * deviceRatio
				canvas.height = image.height * deviceRatio
				if (cellsize === 1) {
					context.drawImage(image, 0, 0, canvas.width, canvas.height)
				} else {
					context.drawImage(image, 0, 0, canvas.width, canvas.height)
					let pixels = context.getImageData(0, 0, canvas.width, canvas.height)
					imageCellArray = scanImage(cellsize, pixels)
					drawAscii(
						context,
						canvas.width,
						canvas.height,
						imageCellArray,
						cellsize
					)
					context.scale(deviceRatio, deviceRatio)
				}
			}
			return () => {}
		}
	}, [cellsize])

	return (
		<canvas
			ref={canvasRef}
			{...props}
			style={{
				position: 'relative',
				zIndex: 1,
			}}
		/>
	)
})

export default AsciiCanvas
