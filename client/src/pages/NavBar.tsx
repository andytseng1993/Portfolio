import { PropsWithChildren } from 'react'
import { Container, Navbar, Nav, Offcanvas } from 'react-bootstrap'
import SideMenu from '../component/side menu/SideMenu'
import classes from './NavBar.module.css'

const NavBar = ({ children }: PropsWithChildren) => {
	return (
		<>
			<Navbar expand="md" bg="dark" variant="dark">
				<Container fluid className={classes.navBar}>
					<Navbar.Brand className="justify-content-center align-items-center">
						<div className={classes.container}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="-4 -4 108 116"
								className={classes.item}
							>
								<path d="M49.9 0 99.8 29.1V79.1L49.9 108.1 0 79V29L49.9 0Z" />
							</svg>
							<div className={classes.yt}>YT</div>
						</div>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse
						id="basic-navbar-nav"
						className="justify-content-end align-items-center"
					>
						<Nav>
							{/* <Nav.Item className={`${classes.nav} me-4`}>About</Nav.Item>
							<Nav.Item className={`${classes.nav} me-4`}>Project</Nav.Item> */}
							<SideMenu />
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			{children}
		</>
	)
}
export default NavBar
