import { useEffect, useState } from 'react'
import classes from './WelcomePage.module.css'
import { motion } from 'framer-motion'

const WelcomePage = () => {
	const [word, setWord] = useState('Hello  there.')

	useEffect(() => {
		const there = 'there.'
		let thereArray = there.split('')
		for (let i = 0; i < thereArray.length; i++) {
			setTimeout(() => {
				thereArray.pop()
				const newWords = thereArray.join('')
				setWord('Hello  ' + newWords)
			}, 9000 + i * 1000)
		}
		const world = 'world  !'
		const worldArray = world.split('')
		for (let i = 0; i < worldArray.length; i++) {
			setTimeout(() => {
				const str = worldArray.shift() ?? ''
				setWord((pre) => pre + str)
			}, 15000 + i * 750)
		}
	}, [])

	return (
		<div className={classes.container}>
			<div className={classes.dash}>{word}</div>
			<div className={classes.name}>I'm Yuhsien Tseng.</div>
			<div className={classes.content}>
				A Frontend focused Web Developer building the Frontend of Websites.
			</div>
			<div className={classes.scrollElements}>
				<div className={classes.scroll}>scroll</div>
				<div className={classes.scrollDown}></div>
				<motion.div className={classes.scrollDown2}>
					<motion.svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 6 30"
						className={classes.item}
					>
						<motion.path
							d="M3 0 3 40 6 35 0 35"
							variants={icon}
							initial={{ opacity: 0, pathLength: 0 }}
							animate="visible"
							transition={{
								delay: 10,
								duration: 1,
							}}
						/>
					</motion.svg>
				</motion.div>
			</div>
		</div>
	)
}

export default WelcomePage

const icon = {
	visible: {
		opacity: 1,
		pathLength: 1,
		strokeWidth: '0.7px',
		stroke: 'rgb(255, 255, 255)',
		transition: {
			delay: 22,
			duration: 1.5,
			ease: 'easeInOut',
		},
	},
}
