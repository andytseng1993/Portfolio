import { PropsWithChildren, StyleHTMLAttributes, useRef } from 'react'
import { motion } from 'framer-motion'

const ScrollTriggerSection = ({ children }: PropsWithChildren) => {
	const ref = useRef(null)
	return (
		<div ref={ref}>
			<motion.div
				initial={{ opacity: 0, transform: 'translateX(-200px)' }}
				whileInView={{
					opacity: 1,
					transform: 'translateX(30px)',
					transition: {
						delay: 0.3,
						duration: 0.3,
						function: 'cubic-bezier(0.17, 0.55, 0.55, 1)',
					},
				}}
				viewport={{ once: true }}
			>
				{children}
			</motion.div>
		</div>
	)
}

export default ScrollTriggerSection
