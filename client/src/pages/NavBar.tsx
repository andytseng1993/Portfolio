import { motion } from 'framer-motion'
import { PropsWithChildren, useState } from 'react'
import { Container, Navbar, Nav, Offcanvas } from 'react-bootstrap'
import { animateScroll } from 'react-scroll'
import SideMenu from '../component/side menu/SideMenu'
import classes from './NavBar.module.css'

const NavBar = ({ children }: PropsWithChildren) => {
	const [lastScrollY, setLastScrollY] = useState(0)

	const scrolltoTop = () => {
		animateScroll.scrollToTop({ smooth: true, duration: 200 })
	}
	return (
		<>
			<Navbar expand="md" bg="dark" variant="dark">
				<Container fluid className={classes.navBar}>
					<Navbar.Brand className="justify-content-center align-items-center">
						<motion.div
							className={classes.container}
							initial={false}
							whileHover={{
								scale: 1.1,
								transition: { duration: 0.3 },
							}}
							whileTap={{ scale: 0.97, transition: { duration: 0.3 } }}
							onClick={scrolltoTop}
						>
							<motion.svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="-4 -4 108 116"
								className={classes.item}
							>
								<path d="M49.9 0 99.8 29.1V79.1L49.9 108.1 0 79V29L49.9 0Z" />
							</motion.svg>
							<div className={classes.yt}>YT</div>
						</motion.div>
					</Navbar.Brand>
					<SideMenu />
				</Container>
			</Navbar>
			{children}
		</>
	)
}
export default NavBar
