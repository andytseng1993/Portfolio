import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import classes from './LoadingPage.module.css'

interface Props {
	isLoading: boolean
}

const LoadingPage = ({ isLoading }: Props) => {
	return (
		<AnimatePresence>
			{isLoading ? (
				<motion.div
					className={classes.loading}
					key="modal"
					initial={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ delay: 1.8, duration: 0.5 }}
				>
					<motion.div
						variants={container}
						className={classes.container}
						animate="visible"
						exit="closed"
					>
						<motion.svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 100 108"
							className={classes.item}
						>
							<motion.path
								d="M49.9 0 99.8 29.1V79.1L49.9 108 0 79V29L49.9 0Z"
								variants={icon}
								initial="hidden"
								animate="visible"
								exit="closed"
								transition={{
									default: { duration: 0.7, ease: 'easeInOut' },
								}}
							/>
						</motion.svg>
						<motion.div
							className={classes.yu}
							initial={{ opacity: 0, scale: 0.9 }}
							variants={name}
							animate="visible"
							exit="closed"
							transition={{ duration: 0.5, delay: 0.7 }}
						>
							YT
						</motion.div>
					</motion.div>
				</motion.div>
			) : null}
		</AnimatePresence>
	)
}

export default LoadingPage

const icon = {
	hidden: {
		opacity: 0,
		pathLength: 0,
		fill: 'rgba(255, 255, 255, 0)',
		stroke: 'rgba(255, 255, 255, 0)',
		strokeWidth: '0px',
	},
	visible: {
		opacity: 1,
		pathLength: 1,
		strokeWidth: '8px',
		fill: 'rgba(255, 255, 255, 0)',
		stroke: 'rgba(255, 255, 255, 1)',
	},
	closed: {
		opacity: 0,
		strokeWidth: '0px',
		transition: {
			duration: 0.8,
			delay: 1,
		},
	},
}
const container = {
	visible: {
		rotateZ: [0, 180, 360],
		transition: {
			duration: 1.5,
			ease: 'easeInOut',
			times: [0, 0.5, 1],
			repeat: Infinity,
			repeatDelay: 0.5,
			delay: 0.5,
		},
	},
	closed: {
		rotateZ: [0],
		scale: 0,
		transition: {
			delay: 1,
			duration: 1,
		},
	},
}
const name = {
	visible: {
		opacity: 1,
		scale: 1,
	},
	closed: {
		opacity: 0,
		scale: 0.5,
	},
}
