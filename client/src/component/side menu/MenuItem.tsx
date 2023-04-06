import classes from './SideMenu.module.css'
import { motion } from 'framer-motion'
import { Link } from 'react-scroll'

const MenuItem = ({ toggle = () => {} }) => {
	return (
		<motion.ul variants={variants} className={classes.sideBar}>
			{items.map((item) => (
				<motion.li
					key={item}
					className={classes.items}
					variants={itemVariants}
					initial={false}
				>
					<Link
						to={item}
						spy={true}
						smooth={true}
						duration={200}
						onClick={toggle}
						className={classes.link}
					>
						{item}
					</Link>
				</motion.li>
			))}
		</motion.ul>
	)
}
export default MenuItem

const items = ['Home', 'About', 'Projects']
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
