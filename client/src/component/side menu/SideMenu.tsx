import { useCycle } from 'framer-motion'
import { motion } from 'framer-motion'
import classes from './SideMenu.module.css'
import MenuToggle from './MenuToggle'
import { useEffect } from 'react'
import { lockScroll, scroll } from '../../App'
import MenuItem from './MenuItem'

const SideMenu = () => {
	const [toggle, setToggle] = useCycle(false, true)

	useEffect(() => {
		if (toggle) return lockScroll()
		scroll()
	}, [toggle])

	return (
		<motion.nav
			className={classes.nav}
			initial={false}
			animate={toggle ? 'open' : 'closed'}
			variants={nav}
		>
			<motion.div
				className={`${classes.circle} ${toggle ? '' : classes.sideBarClose}`}
				variants={sidebar}
			>
				<MenuToggle toggle={() => setToggle()} />
				<MenuItem toggle={() => setToggle()} />
			</motion.div>
		</motion.nav>
	)
}

export default SideMenu

const nav = {
	open: {
		zIndex: 100,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	closed: {
		zIndex: 0,
		transition: { duration: 1, delay: 0.3 },
	},
}
const sidebar = {
	open: {
		clipPath: `circle(${1000 * 2 + 200}px at 300px 35px)`,
		transition: {
			type: 'spring',
			stiffness: 20,
			restDelta: 2,
		},
	},
	closed: {
		clipPath: 'circle(25px at 300px 35px)',
		transition: {
			delay: 0.1,
			type: 'spring',
			stiffness: 400,
			damping: 40,
		},
		zIndex: 0,
	},
}
