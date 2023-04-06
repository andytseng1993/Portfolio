import { useEffect, useState } from 'react'
import classes from './WelcomePage.module.css'
import { motion } from 'framer-motion'
import { Link } from 'react-scroll'

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
			}, 9000 + i * 750)
		}
		const world = 'world  !'
		const worldArray = world.split('')
		for (let i = 0; i < worldArray.length; i++) {
			setTimeout(() => {
				const str = worldArray.shift() ?? ''
				setWord((pre) => pre + str)
			}, 13500 + i * 500)
		}
	}, [])

	return (
		<div className={classes.container} id="Home">
			<h1 className={classes.dash}>{word}</h1>
			<p className={classes.name}>I'm Yuhsien Tseng.</p>
			<p className={classes.content}>
				A Frontend focused Web Developer building the Frontend of Websites.
			</p>
			<div className={classes.scrollElements}>
				<Link to="About" smooth={true} duration={200}>
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
							/>
						</motion.svg>
					</motion.div>
				</Link>
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
			delay: 19,
			duration: 0.7,
			ease: 'easeInOut',
		},
	},
}
