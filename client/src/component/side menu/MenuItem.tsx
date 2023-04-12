import classes from './SideMenu.module.css'
import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { AiFillGithub, AiFillMail } from 'react-icons/ai'
import { IconContext } from 'react-icons'

const MenuItem = ({ toggle = () => {} }) => {
	return (
		<motion.div variants={variants} className={classes.content}>
			<ul className={classes.sideBar}>
				{items.map((item) => (
					<motion.li
						key={item}
						className={classes.items}
						whileHover={{ scale: 1.1 }}
						variants={itemVariants}
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
			</ul>
			<motion.div variants={itemVariants}>
				<IconContext.Provider value={{ className: `${classes.icon}` }}>
					<a href="https://github.com/andytseng1993" target="_blank">
						<AiFillGithub />
					</a>
					<a href="mailto:yuhsien1993@gmail.com">
						<AiFillMail />
					</a>
				</IconContext.Provider>
			</motion.div>
		</motion.div>
	)
}
export default MenuItem

const items = ['Home', 'About', 'Projects']
const variants = {
	open: {
		transition: { staggerChildren: 0.1, delayChildren: 0.2 },
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
	hover: {
		y: 15,
	},
	closed: {
		y: 0,
		opacity: 0,
	},
}
