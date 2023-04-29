import {
	UseQueryResult,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query'
import axios from 'axios'
import { useOutletContext } from 'react-router-dom'
import {
	ProjectType,
	projectOrderType,
} from '../component/upload page/ProjecctForm'
import { useEffect, useState } from 'react'
import { Reorder } from 'framer-motion'
import ReorderItem from '../component/upload page/ReorderItem'
import { Button, Modal } from 'react-bootstrap'
import { tokenConfig } from '../context/UserAuth'

export interface ProjectProps extends ProjectType {
	id: string
}

const ReorderPage = () => {
	const [list, setList] = useState<ProjectProps[]>([])
	const [unPinnedList, setUnPinnedList] = useState<ProjectProps[]>([])
	const [show, setShow] = useState(false)
	const [unPinnedShow, setUnPinnedShow] = useState(false)
	const queryClient = useQueryClient()
	const projectorder = useOutletContext<UseQueryResult<any, projectOrderType>>()
	const projects = useQuery({
		queryKey: ['projects'],
		queryFn: async () => {
			const { data } = await axios.get('/api/projects')
			return data
		},
	})
	const mutation = useMutation({
		mutationFn: (projectOrder: projectOrderType) => {
			return axios.put('/api/projectorder', projectOrder, tokenConfig())
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['projectorder'] })
			setShow(false)
			setUnPinnedShow(false)
		},
	})
	useEffect(() => {
		if (projectorder.data[0] === undefined || projects.data === undefined)
			return
		if (projectorder.data[0].length === 0 || projects.data.length === 0) return

		const projectList = projectorder.data[0].projectOrder.map(
			(projectId: string) => {
				const project = projects.data.find(
					(project: ProjectProps) => project.id === projectId
				)
				return project
			}
		)
		const unPinnedProjectList = projectorder.data[0].unpinnedProjectOrder.map(
			(projectId: string) => {
				const project = projects.data.find(
					(project: ProjectProps) => project.id === projectId
				)
				return project
			}
		)
		const result = projectList.filter(
			(project: ProjectProps) => typeof project === 'object'
		)
		const unPinnedResult = unPinnedProjectList.filter(
			(project: ProjectProps) => typeof project === 'object'
		)
		setUnPinnedList(unPinnedResult)
		setList(result)
	}, [projects.data, projectorder.data])

	const updateOrder = () => {
		if (list.length === 0) return
		const projectOrder = list.map((project) => project.id)
		const unpinnedProjectOrder = unPinnedList.map((project) => project.id)
		const newOrder = {
			id: projectorder.data[0].id,
			projectOrder,
			unpinnedProjectOrder,
		}
		mutation.mutate(newOrder)
	}
	const updateUnpinnedOrder = () => {
		if (list.length === 0) return
		const projectOrder = list.map((project) => project.id)
		const unpinnedProjectOrder = unPinnedList.map((project) => project.id)
		const newOrder = {
			id: projectorder.data[0].id,
			projectOrder,
			unpinnedProjectOrder,
		}
		mutation.mutate(newOrder)
	}

	return (
		<div style={{ display: 'flex' }}>
			<div>
				<h3>Pinned Projects</h3>
				<button onClick={() => setShow(true)}>Update Order</button>
				<Modal show={show} onHide={() => setShow(false)}>
					<Modal.Header closeButton>
						<Modal.Title>Update Order</Modal.Title>
					</Modal.Header>
					<Modal.Body>Do you want to update this order?</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={() => setShow(false)}>
							Close
						</Button>
						<Button variant="primary" onClick={updateOrder}>
							Save Changes
						</Button>
					</Modal.Footer>
				</Modal>
				<div className="mt-7">
					{projectorder.isLoading || projects.isLoading ? (
						<h3>Loading...</h3>
					) : projectorder.isError || projects.isError ? (
						<h3>Something Wrong...</h3>
					) : list.length > 0 ? (
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							<Reorder.Group
								axis="y"
								onReorder={setList}
								values={list}
								style={{ padding: 0, width: '900px', border: '1px solid gray' }}
							>
								{list.map((project) => (
									<ReorderItem key={project.id} project={project} />
								))}
							</Reorder.Group>
						</div>
					) : (
						<h3>No Posts Yet</h3>
					)}
				</div>
			</div>
			<div>
				<h3>Unpinned Projects</h3>
				<button onClick={() => setUnPinnedShow(true)}>Update Order</button>
				<Modal show={unPinnedShow} onHide={() => setUnPinnedShow(false)}>
					<Modal.Header closeButton>
						<Modal.Title>Update Order</Modal.Title>
					</Modal.Header>
					<Modal.Body>Do you want to update this order?</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={() => setUnPinnedShow(false)}>
							Close
						</Button>
						<Button variant="primary" onClick={updateUnpinnedOrder}>
							Save Changes
						</Button>
					</Modal.Footer>
				</Modal>
				<div className="mt-7">
					{projectorder.isLoading || projects.isLoading ? (
						<h3>Loading...</h3>
					) : projectorder.isError || projects.isError ? (
						<h3>Something Wrong...</h3>
					) : unPinnedList.length > 0 ? (
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							<Reorder.Group
								axis="y"
								onReorder={setUnPinnedList}
								values={unPinnedList}
								style={{ padding: 0, width: '900px', border: '1px solid gray' }}
							>
								{unPinnedList.map((project) => (
									<ReorderItem key={project.id} project={project} />
								))}
							</Reorder.Group>
						</div>
					) : (
						<h3>No Posts Yet</h3>
					)}
				</div>
			</div>
		</div>
	)
}

export default ReorderPage
