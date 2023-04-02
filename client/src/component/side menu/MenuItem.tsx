import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
const MenuItem = ({ toggle = () => {} }) => {
	return (
		<motion.ul variants={variants}>
			{items.map((item) => (
				<motion.li key={item}>
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

const items = ['Home', 'About', 'Projects']
const variants = {
	open: {
		transition: { staggerChildren: 0.07, delayChildren: 0.1 },
	},
	closed: {
		transition: { staggerChildren: 0.05, staggerDirection: -1 },
	},
}
