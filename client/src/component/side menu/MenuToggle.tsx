import { motion } from 'framer-motion'
import classes from './SideMenu.module.css'

const Path = (props) => {
	return (
		<motion.path
			fill="transparent"
			strokeWidth="2"
			stroke="white"
			transition={{ duration: 0.2 }}
			{...props}
		/>
	)
}

const MenuToggle = ({ toggle = () => {} }) => {
	return (
		<motion.button
			className={classes.btn}
			whileHover={{
				scale: 1.1,
				transition: { duration: 0.3 },
			}}
			onClick={toggle}
		>
			<svg
				width="20"
				height="20"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				className={classes.svg}
			>
				<Path
					variants={{
						closed: { d: 'M8 2.5 L 17 2.5' },
						open: { d: 'M 3 16.5 L 17 2.5' },
					}}
				/>
				<Path
					d="M 6 9.423 L 17 9.423"
					variants={{
						closed: { opacity: 1 },
						open: { opacity: 0 },
					}}
				/>
				<Path
					variants={{
						closed: { d: 'M 3 16.346 L 17 16.346' },
						open: { d: 'M3 2.5 L 17 16.346' },
					}}
				/>
			</svg>
		</motion.button>
	)
}

export default MenuToggle
