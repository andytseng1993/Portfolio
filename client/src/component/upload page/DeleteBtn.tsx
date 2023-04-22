import { UseMutateFunction, UseMutationResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

interface Props {
	projectId: string
	mutationDelete: UseMutationResult<
		AxiosResponse<any, any>,
		unknown,
		string,
		unknown
	>
}
const DeleteBtn = ({ projectId, mutationDelete }: Props) => {
	const [show, setShow] = useState(false)
	const clickHandler = () => {
		if (projectId === '') return
		setShow(true)
	}
	const deleteHandler = () => {
		mutationDelete.mutate(projectId)
		setShow(false)
	}
	return (
		<>
			<Button variant="danger" className="w-50 me-5" onClick={clickHandler}>
				Delete Project
			</Button>
			<Modal show={show} onHide={() => setShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Delete Project</Modal.Title>
				</Modal.Header>
				<Modal.Body>Do you want to delete this project?</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShow(false)}>
						Close
					</Button>
					<Button variant="danger" onClick={deleteHandler}>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default DeleteBtn
