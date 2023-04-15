import { Button, Col, Form, Row } from 'react-bootstrap'
import FormField from './FormField'
import { useRef, useState } from 'react'
import SkillsSelect from './SkillsSelect'

interface Value {
	label: string
	value: string
}

const ProjecctForm = () => {
	const [value, setValue] = useState<Value[] | null>(null)
	const [pinned, setPinned] = useState(true)
	const titleRef = useRef<HTMLInputElement>(null)
	const contentRef = useRef<HTMLInputElement>(null)
	const createAtRef = useRef<HTMLInputElement>(null)
	const webRef = useRef<HTMLInputElement>(null)
	const githubRef = useRef<HTMLInputElement>(null)

	const skills = () => {
		const result = value!.map((skill) => skill.value)
		return result
	}
	console.log(skills())

	const saveImage = () => {
		console.log(Date.parse(createAtRef.current!.value))
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
			<div className="d-flex justify-content-end">
				<Button className="w-50" onClick={saveImage}>
					Download Image
				</Button>
			</div>
		</>
	)
}

export default ProjecctForm
