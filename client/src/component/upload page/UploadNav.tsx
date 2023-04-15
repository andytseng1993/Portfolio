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
			<Navbar bg="dark" expand="lg" variant="dark">
				<Container>
					<Navbar.Brand>
						<Link to={'/'} className={classes.home}>
							Home
						</Link>
					</Navbar.Brand>
				</Container>
				<Nav className="text-light">
					{currentUser.email === '' ? (
						<>
							<Nav.Item className="me-4">
								<LoginModal show={show} setShow={setShow} />
							</Nav.Item>
						</>
					) : (
						<>
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
