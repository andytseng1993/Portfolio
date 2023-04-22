import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import classes from './UploadNav.module.css'
import { PropsWithChildren, useState } from 'react'
import { Nav } from 'react-bootstrap'
import LoginModal from './auth/LoginModal'
import Logout from './auth/Logout'

interface AppNavbarProps extends PropsWithChildren {
	currentUser: {
		email: string | null
	}
}

const UploadNav = ({ children, currentUser }: AppNavbarProps) => {
	const [show, setShow] = useState(false)
	return (
		<>
			<Navbar collapseOnSelect bg="dark" expand="lg" variant="dark">
				<Container>
					<Navbar.Brand>
						<Link to={'/'} className={classes.home}>
							Home
						</Link>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="ms-auto">
							<Nav.Item className="d-flex align-items-center ms-4 justify-content-end">
								<Link to={'/update'} className={classes.home}>
									Uploade Image
								</Link>
							</Nav.Item>
							<Nav.Item className="d-flex align-items-center m-4 my-2 justify-content-end">
								<Link to={'/update/reorder'} className={classes.home}>
									Reorder
								</Link>
							</Nav.Item>
							{currentUser.email === '' ? (
								<>
									<Nav.Item className="">
										<LoginModal show={show} setShow={setShow} />
									</Nav.Item>
								</>
							) : (
								<>
									<Nav.Item className=" text-end">
										<Logout />
									</Nav.Item>
								</>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			{children}
		</>
	)
}

export default UploadNav
