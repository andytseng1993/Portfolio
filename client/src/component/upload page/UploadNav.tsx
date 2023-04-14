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
		userName: string | null
		role: string | null
	}
}

const UploadNav = ({ children, currentUser }: AppNavbarProps) => {
	const [show, setShow] = useState({
		showLoginModal: false,
		showRegisterModal: false,
	})
	return (
		<>
			<Navbar bg="dark" expand="lg" variant="dark">
				<Container>
					<Navbar.Brand>
						<Link to={'/'} className={classes.home}>
							Home
						</Link>
					</Navbar.Brand>
				</Container>
				<Nav className="text-light">
					{currentUser.userName === null ? null : currentUser.userName ===
					  '' ? (
						<>
							<Nav.Item className="me-4">
								<LoginModal show={show} setShow={setShow} />
							</Nav.Item>
						</>
					) : (
						<>
							{currentUser.role === 'ADMIN' ? (
								<Nav.Item className="p-2 mx-2 text-light">
									Welcome <strong>{currentUser.userName} : ADMIN</strong>
								</Nav.Item>
							) : (
								<Nav.Item className="p-2 mx-2 text-light">
									Welcome <strong>{currentUser.userName}</strong>
								</Nav.Item>
							)}
							<Nav.Item>
								<Logout />
							</Nav.Item>
						</>
					)}
				</Nav>
			</Navbar>
			{children}
		</>
	)
}

export default UploadNav
