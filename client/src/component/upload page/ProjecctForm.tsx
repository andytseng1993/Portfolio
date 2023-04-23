import { Button, Form } from 'react-bootstrap'
import FormField from './FormField'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import SkillsSelect from './SkillsSelect'
import preview from '../../assets/preview.png'
import {
	UseQueryResult,
	useMutation,
	useQueryClient,
} from '@tanstack/react-query'
import axios from 'axios'
import { tokenConfig } from '../../context/UserAuth'
import { useOutletContext } from 'react-router-dom'
import UpdateBtn from './UpdateBtn'
import DeleteBtn from './DeleteBtn'
import { Project } from '../../pages/ReorderPage'

const ProjecctForm = ({ photoSrc, setPhotoSrc, project, editFn }: Props) => {
	const [projectId, setProjectID] = useState('')
	const [value, setValue] = useState<Value[]>([])
	const [pinned, setPinned] = useState(true)
	const titleRef = useRef<HTMLInputElement>(null)
	const contentRef = useRef<HTMLInputElement>(null)
	const createAtRef = useRef<HTMLInputElement>(null)
	const webRef = useRef<HTMLInputElement>(null)
	const githubRef = useRef<HTMLInputElement>(null)
	const [error, setError] = useState<string>('')
	const queryClient = useQueryClient()
	const projectorder = useOutletContext<UseQueryResult<any, projectorderType>>()

	const reset = () => {
		titleRef.current!.value = ''
		contentRef.current!.value = ''
		createAtRef.current!.value = ''
		setValue([])
		githubRef.current!.value = ''
		webRef.current!.value = ''
		setProjectID('')
		setPinned(true)
		setPhotoSrc(preview)
		setError('')
	}
	useEffect(() => {
		if (!editFn) {
			reset()
		}
	}, [editFn])

	useEffect(() => {
		const dateTime = (time: Date) => {
			const date = new Date(time)
			const month =
				date.getMonth() + 1 < 10
					? '0' + (date.getMonth() + 1)
					: date.getMonth() + 1
			const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
			return `${date.getFullYear()}-${month}-${day}`
		}
		if (Object.keys(project).length === 0 && !editFn) return
		const projectType = (project: Project) => {
			titleRef.current!.value = project.title
			contentRef.current!.value = project.content
			githubRef.current!.value = project.githubSrc
			webRef.current!.value = project.websiteSrc
			const skills = project.tech.map((skill) => {
				return { label: skill, value: skill }
			})
			setProjectID(project.id)
			setValue(skills)
			setPinned(project.pinned)
			createAtRef.current!.value = dateTime(project.createdAt)
		}
		projectType(project as Project)
	}, [project])

	const skills = () => {
		if (value == null) return []
		const result = value.map((skill) => skill.value)
		return result
	}

	const mutation = useMutation({
		mutationFn: (projectDetail: ProjectType) => {
			return axios.post('/api/projects', projectDetail, tokenConfig())
		},
		onSuccess: ({ data }) => {
			queryClient.invalidateQueries({ queryKey: ['projects'] })
			const projectId = data.id
			if (pinned) {
				const newOrder = {
					id: projectorder.data[0].id,
					projectOrder: [projectId],
					unpinnedProjectOrder: [],
				}
				mutationOrder.mutate(newOrder)
			}
			if (!pinned) {
				const newOrder = {
					id: projectorder.data[0].id,
					projectOrder: [],
					unpinnedProjectOrder: [projectId],
				}
				mutationOrder.mutate(newOrder)
			}
			reset()
		},
		onError: () => {
			setError('Something wrong in Updating!')
		},
	})
	const mutationOrder = useMutation({
		mutationFn: (projectOrder: projectOrderType) => {
			return axios.put('/api/projectorder/push', projectOrder, tokenConfig())
		},
		onSuccess: () => {
			setError('')
			queryClient.invalidateQueries({ queryKey: ['projectorder'] })
		},
		onError: () => {
			setError('Something wrong in Update Order!')
		},
	})

	const mutationUpdateOrder = useMutation({
		mutationFn: (projectOrder: projectOrderType) => {
			return axios.put('/api/projectorder', projectOrder, tokenConfig())
		},
		onSuccess: () => {
			setError('')
			queryClient.invalidateQueries({ queryKey: ['projectorder'] })
			reset()
		},
		onError: () => {
			setError('Something wrong in Update Order!')
		},
	})

	const mutationUpdate = useMutation({
		mutationFn: (projectDetail: Project) => {
			return axios.put('/api/projects', projectDetail, tokenConfig())
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['projects'] })
			const projectOrder = projectorder.data[0].projectOrder.filter(
				(id: string) => id !== projectId
			)
			const unpinnedProjectOrder =
				projectorder.data[0].unpinnedProjectOrder.filter(
					(id: string) => id !== projectId
				)

			if (pinned) {
				projectOrder.push(projectId)
			}
			if (!pinned) {
				unpinnedProjectOrder.push(projectId)
			}
			const newOrder = {
				id: projectorder.data[0].id,
				projectOrder,
				unpinnedProjectOrder,
			}
			console.log(newOrder)

			mutationUpdateOrder.mutate(newOrder)
		},
	})

	const mutationDelete = useMutation({
		mutationFn: (projectID: string) => {
			return axios.delete(`/api/projects/${projectID}`, tokenConfig())
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['projects'] })
			reset()
		},
	})

	const uploadProject = () => {
		if (titleRef.current!.value === '' || contentRef.current!.value === '')
			return setError('Please enter all fields.')
		let imageSrc
		if (photoSrc === preview) {
			imageSrc = ''
		} else {
			imageSrc = photoSrc.split(',')[1]
		}

		const projectDetail = {
			title: titleRef.current!.value,
			content: contentRef.current!.value,
			createdAt: new Date(createAtRef.current!.value),
			tech: skills(),
			githubSrc: githubRef.current!.value,
			websiteSrc: webRef.current!.value,
			pinned: pinned,
			image: imageSrc,
		}
		mutation.mutate(projectDetail)
	}

	const updateProject = () => {
		if (projectId === '') return

		const projectDetail = {
			id: projectId,
			title: titleRef.current!.value,
			content: contentRef.current!.value,
			createdAt: new Date(createAtRef.current!.value),
			tech: skills(),
			githubSrc: githubRef.current!.value,
			websiteSrc: webRef.current!.value,
			pinned: pinned,
			image: photoSrc.split(',')[1],
		}
		mutationUpdate.mutate(projectDetail)
	}
	return (
		<>
			<h3 className="mb-4">Project Detail</h3>
			<Form>
				<FormField
					title={'Title'}
					controlId={'Title'}
					type={'text'}
					defaultValue={''}
					inputRef={titleRef}
				/>

				<FormField
					as={'textarea'}
					title={'content'}
					controlId={'content'}
					type={''}
					defaultValue={''}
					inputRef={contentRef}
				/>

				<FormField
					title={'createdAt'}
					controlId={'DateTime'}
					type={'date'}
					defaultValue={''}
					inputRef={createAtRef}
				/>
				<Form.Group className="mb-3" controlId={'Skills'}>
					<Form.Label>Skills</Form.Label>
					<SkillsSelect value={value} setValue={setValue} />
				</Form.Group>

				<FormField
					title={'WebsiteSrc'}
					controlId={'WebsiteSrc'}
					type={'text'}
					defaultValue={''}
					inputRef={webRef}
				/>
				<FormField
					title={'GithubSrc'}
					controlId={'githubSrc'}
					type={'text'}
					defaultValue={''}
					inputRef={githubRef}
				/>
			</Form>
			<Form.Group className="mb-3" controlId="pinned">
				<Form.Check
					type="checkbox"
					label="pinned ?"
					checked={pinned}
					onChange={() => setPinned(!pinned)}
				/>
			</Form.Group>
			<div className="d-flex justify-content-end align-items-center">
				{error ? (
					<div style={{ color: 'red', marginRight: 30, fontSize: 20 }}>
						{error}
					</div>
				) : null}
				{editFn ? (
					<>
						<DeleteBtn projectId={projectId} mutationDelete={mutationDelete} />
						<UpdateBtn updateProject={updateProject} />
					</>
				) : (
					<Button className="w-50" onClick={uploadProject}>
						Upload Project
					</Button>
				)}
			</div>
		</>
	)
}

export default ProjecctForm
interface Value {
	label: string
	value: string
}
interface Props {
	photoSrc: string
	setPhotoSrc: Dispatch<SetStateAction<string>>
	project: ProjectType | {}
	editFn: boolean
}

export interface ProjectType {
	title: string
	content: string
	createdAt: Date
	tech: string[]
	githubSrc: string
	websiteSrc: string
	pinned: boolean
	image: string
}
export interface projectOrderType {
	unpinnedProjectOrder?: String[]
	projectOrder?: string[]
}
export interface projectorderType {
	id: string
	projectOrder: string[]
}
