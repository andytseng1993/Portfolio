import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import { Button, Modal, Nav, Spinner, Stack } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useUserAuth } from '../../../context/UserAuth'

const Logout = () => {
	const queryClient = useQueryClient()
	const navigate = useNavigate()
	const [show, setShow] = useState(false)
	const { currentUser } = useUserAuth()

	const logout = () => {
		queryClient.invalidateQueries({ queryKey: ['user'] })
		// localStorage.removeItem('token')
		navigate('/')
	}
	const toggle = () => {
		setShow(false)
	}
	return (
		<>
			<Nav.Link onClick={() => setShow(true)}>Log out</Nav.Link>
			<Modal show={show} onHide={toggle} centered>
				<Modal.Header closeButton>
					<Modal.Title>Log out</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<h5>Do you want to log out?</h5>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="outline-secondary" onClick={toggle}>
						Close
					</Button>
					<Button onClick={logout}>Log out</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default Logout
