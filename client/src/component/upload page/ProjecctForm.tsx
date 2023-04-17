import { Button, Form } from 'react-bootstrap'
import FormField from './FormField'
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import SkillsSelect from './SkillsSelect'
import preview from '../../assets/preview.png'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { tokenConfig } from '../../context/UserAuth'
interface Value {
	label: string
	value: string
}
interface Props {
	photoSrc: string
	setPhotoSrc: Dispatch<SetStateAction<string>>
}

interface ProjectType {
	title: string
	content: string
	createdAt: Date
	tech: string[]
	githubSrc: string
	websiteSrc: string
	pinned: boolean
	image: string
}

const ProjecctForm = ({ photoSrc, setPhotoSrc }: Props) => {
	const [value, setValue] = useState<Value[]>([])
	const [pinned, setPinned] = useState(true)
	const titleRef = useRef<HTMLInputElement>(null)
	const contentRef = useRef<HTMLInputElement>(null)
	const createAtRef = useRef<HTMLInputElement>(null)
	const webRef = useRef<HTMLInputElement>(null)
	const githubRef = useRef<HTMLInputElement>(null)
	const [error, setError] = useState<string>('')

	const skills = () => {
		if (value == null) return []
		const result = value.map((skill) => skill.value)
		return result
	}
	const mutation = useMutation({
		mutationFn: (projectDetail: ProjectType) => {
			return axios.post('/api/projects', projectDetail, tokenConfig())
		},
		onSuccess: () => {
			titleRef.current!.value = ''
			contentRef.current!.value = ''
			createAtRef.current!.value = ''
			githubRef.current!.value = ''
			setValue([])
			githubRef.current!.value = ''
			webRef.current!.value = ''
			setPinned(true)
			setPhotoSrc(preview)
			setError('')
		},
		onError: () => {
			setError('Sonething wrong in Updating!')
		},
	})

	const uploadProject = () => {
		if (photoSrc === preview) return setError('Please upload image')
		if (titleRef.current!.value === '' || contentRef.current!.value === '')
			return setError('Please enter all fields.')

		const projectDetail = {
			title: titleRef.current!.value,
			content: contentRef.current!.value,
			createdAt: new Date(createAtRef.current!.value),
			tech: skills(),
			githubSrc: githubRef.current!.value,
			websiteSrc: webRef.current!.value,
			pinned: pinned,
			image: photoSrc,
		}
		mutation.mutate(projectDetail)
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
				<Button className="w-50" onClick={uploadProject}>
					Upload Project
				</Button>
			</div>
		</>
	)
}

export default ProjecctForm
