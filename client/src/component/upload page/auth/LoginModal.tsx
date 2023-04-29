import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { stringify } from 'querystring'
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from 'react'
import {
	Alert,
	Button,
	Col,
	Form,
	Modal,
	Nav,
	Row,
	Stack,
} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

interface User {
	email: string
	password: string
}
interface LoginProps {
	show: boolean
	setShow: Dispatch<SetStateAction<boolean>>
}

const LoginModal = ({ show, setShow }: LoginProps) => {
	const emailRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)
	const [error, setError] = useState('')
	const queryClient = useQueryClient()
	const navigate = useNavigate()

	const mutation = useMutation({
		mutationFn: async (userData: User) => {
			const { data } = await axios.post('/api/auth/login', userData)
			return data
		},
		onError: (err) => {
			if (axios.isAxiosError(err)) {
				setError(err.response?.data)
			}
		},
		onSuccess: (data) => {
			localStorage.setItem('token', JSON.stringify(data.token))
			queryClient.invalidateQueries({ queryKey: ['user'] })
			toggle()
			navigate('/update')
		},
	})
	const toggle = () => {
		setShow(false)
		setError('')
		emailRef.current!.value = ''
		passwordRef.current!.value = ''
	}
	const handleLogIn = (e: FormEvent) => {
		e.preventDefault()

		const email = emailRef.current!.value
		const password = passwordRef.current!.value
		if (!email || !password) return setError('Please enter all fields.')
		const userData = {
			email,
			password,
		}
		mutation.mutate(userData)
	}

	return (
		<>
			<Nav.Link onClick={() => setShow(true)}>Log In</Nav.Link>
			<Modal show={show} onHide={toggle} centered backdrop="static">
				<Modal.Header closeButton>
					<Modal.Title>Log In</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{error ? (
						<Alert variant="danger" className="mx-4 py-2">
							{error}
						</Alert>
					) : null}
					<Form className="m-3" onSubmit={handleLogIn}>
						<Form.Group as={Row} className="mb-3">
							<Form.Label column sm="3" className="ms-3">
								Email
							</Form.Label>
							<Col sm="8">
								<Form.Control
									type="text"
									autoFocus={true}
									ref={emailRef}
									required
								></Form.Control>
							</Col>
						</Form.Group>
						<Form.Group as={Row} className="mb-4">
							<Form.Label column sm="3" className="ms-3">
								Password
							</Form.Label>
							<Col sm="8">
								<Form.Control
									type="password"
									ref={passwordRef}
									required
								></Form.Control>
							</Col>
						</Form.Group>
						<Stack
							direction="horizontal"
							className="justify-content-end"
							gap={2}
						>
							<Button className="px-5" type="submit">
								Log In
							</Button>
						</Stack>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	)
}

export default LoginModal
