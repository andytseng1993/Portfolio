import classes from './SideMenu.module.css'
import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { animateScroll } from 'react-scroll'

const MenuItem = ({ toggle = () => {} }) => {
	const scrolltoTop = () => {
		animateScroll.scrollToTop({ smooth: true, duration: 200 })
		toggle()
	}
	return (
		<motion.ul variants={variants} className={classes.sideBar}>
			<motion.li
				onClick={scrolltoTop}
				className={classes.items}
				variants={itemVariants}
				initial={closed}
			>
				Home
			</motion.li>
			{items.map((item) => (
				<motion.li
					key={item}
					className={classes.items}
					variants={itemVariants}
					initial={closed}
				>
					<Link
						to={item}
						spy={true}
						smooth={true}
						duration={200}
						onClick={toggle}
					>
						{item}
					</Link>
				</motion.li>
			))}
		</motion.ul>
	)
}
export default MenuItem

const items = ['About', 'Projects']
const variants = {
	open: {
		transition: { staggerChildren: 0.07, delayChildren: 0.1 },
	},
	closed: {
		transition: { staggerChildren: 0.05, staggerDirection: -1 },
	},
}
const itemVariants = {
	open: {
		opacity: 1,
		y: 20,
		transition: {
			y: { stiffness: 1000, velocity: -100 },
		},
	},
	closed: {
		opacity: 0,
	},
}
