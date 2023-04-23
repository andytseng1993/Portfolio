import { FiExternalLink, FiGithub } from 'react-icons/fi'
import classes from './MiniProject.module.css'
import { IconContext } from 'react-icons'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const MiniProject = () => {
	const linkRef = useRef<HTMLAnchorElement>(null)
	const clickHandler = () => {
		linkRef.current?.click()
	}
	return (
		<motion.div className={classes.miniproject} variants={item}>
			<div className={classes.tag}>
				<div className={classes.corner}></div>
			</div>
			<div className={classes.fileTop}>
				<IconContext.Provider value={{ className: `${classes.icon}` }}>
					<FiExternalLink />
					<FiGithub />
				</IconContext.Provider>
			</div>
			<div className={classes.file} onClick={clickHandler}>
				<IconContext.Provider value={{ className: `${classes.fileIcon}` }}>
					<FiExternalLink />
				</IconContext.Provider>
				<div>
					<h3 className={classes.title}>Title</h3>
					<p style={{ fontSize: 17 }}>
						Hi there Hi thereHi thereHi thereHi thereHi thereHi thereHi thereHi
						there Hi thereHi thereHi there Hi thereHi thereHi thereHi thereHi
						there Hi thereHi there
					</p>
				</div>
				<div className={classes.skills}>skill skill skill skill skill</div>
			</div>
			<a
				className={classes.bodyLink}
				ref={linkRef}
				href="https://www.w3schools.com"
				target="_blank"
			></a>
		</motion.div>
	)
}
export default MiniProject

const item = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			duration: 0.7,
		},
	},
}
