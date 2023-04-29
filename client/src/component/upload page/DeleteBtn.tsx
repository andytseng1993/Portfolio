import {
	UseMutationResult,
	UseQueryResult,
	useMutation,
	useQueryClient,
} from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'
import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useOutletContext } from 'react-router-dom'
import { projectOrderType } from './ProjecctForm'
import { tokenConfig } from '../../context/UserAuth'

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
	const projectorder = useOutletContext<UseQueryResult<any, projectOrderType>>()
	const [show, setShow] = useState(false)
	const queryClient = useQueryClient()
	const mutationOrder = useMutation({
		mutationFn: (projectOrder: projectOrderType) => {
			return axios.put('/api/projectorder', projectOrder, tokenConfig())
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['projectorder'] })
		},
	})

	const clickHandler = () => {
		if (projectId === '') return
		setShow(true)
	}
	const deleteHandler = () => {
		const projectOrder = projectorder.data[0].projectOrder.filter(
			(id: string) => id !== projectId
		)
		const unpinnedProjectOrder =
			projectorder.data[0].unpinnedProjectOrder.filter(
				(id: string) => id !== projectId
			)
		const newOrder = {
			id: projectorder.data[0].id,
			projectOrder,
			unpinnedProjectOrder,
		}
		mutationDelete.mutate(projectId)
		mutationOrder.mutate(newOrder)
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
