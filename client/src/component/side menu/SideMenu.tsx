import { useCycle } from 'framer-motion'
import { motion } from 'framer-motion'
import classes from './SideMenu.module.css'
import MenuToggle from './MenuToggle'
import { useEffect } from 'react'
import { lockScroll, scroll } from '../../App'

const SideMenu = () => {
	const [toggle, setToggle] = useCycle(false, true)

	useEffect(() => {
		console.log(toggle)

		if (toggle) return lockScroll()
		scroll()
	}, [toggle])

	return (
		<motion.nav
			className={classes.nav}
			initial={false}
			animate={toggle ? 'open' : 'closed'}
			variants={nav}
			transition={{ duration: 0.7 }}
		>
			<motion.div className={classes.circle} variants={sidebar}>
				<MenuToggle toggle={() => setToggle()} />
			</motion.div>
		</motion.nav>
	)
}

export default SideMenu

const nav = {
	open: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	closed: {},
}
const sidebar = {
	open: {
		clipPath: `circle(${1000 * 2 + 200}px at 40px 40px)`,
		transition: {
			type: 'spring',
			stiffness: 20,
			restDelta: 2,
		},
	},
	closed: {
		clipPath: 'circle(30px at 40px 40px)',
		transition: {
			delay: 0.2,
			type: 'spring',
			stiffness: 400,
			damping: 40,
		},
	},
}
