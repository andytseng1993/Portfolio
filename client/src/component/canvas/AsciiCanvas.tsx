import { memo, useEffect, useRef } from 'react'
import selfSrc from '../../assets/self.png'
import { drawAscii, scanImage } from './Ascii'

const AsciiCanvas = memo(function Canvas(props) {
	const canvasRef = useRef(null)
	let cellSize = 3
	let imageCellArray = []
	useEffect(() => {
		if (canvasRef?.current) {
			const canvas = canvasRef.current! as HTMLCanvasElement
			const context = canvas.getContext('2d', { willReadFrequently: true })!
			const image = new Image()
			image.src = selfSrc
			image.onload = function initialize() {
				canvas.width = image.width
				canvas.height = image.height
				context.drawImage(image, 0, 0, canvas.width, canvas.height)
				let pixels = context.getImageData(0, 0, canvas.width, canvas.height)
				imageCellArray = scanImage(cellSize, pixels)
				drawAscii(
					context,
					canvas.width,
					canvas.height,
					imageCellArray,
					cellSize
				)
			}
			return () => {}
		}
	}, [])

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
