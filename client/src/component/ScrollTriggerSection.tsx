import { PropsWithChildren, StyleHTMLAttributes, useRef } from 'react'
import { motion } from 'framer-motion'
interface Props extends PropsWithChildren {
	xFrom?: number
	xTo?: number
	yFrom?: number
	yTo?: number
}
const ScrollTriggerSection = ({
	children,
	xFrom = -200,
	xTo = 0,
	yFrom = 0,
	yTo = 0,
}: Props) => {
	const ref = useRef(null)
	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, transform: `translate(${xFrom}px,${yFrom}px)` }}
			whileInView={{
				opacity: 1,
				transform: `translate(${xTo}px,${yTo}px)`,
				transition: {
					delay: 0.3,
					duration: 0.5,
					function: 'cubic-bezier(0.17, 0.55, 0.55, 1)',
				},
			}}
			viewport={{ once: true }}
		>
			{children}
		</motion.div>
	)
}

export default ScrollTriggerSection
