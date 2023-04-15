import { ElementType } from 'react'
import { Form } from 'react-bootstrap'

interface Props {
	title: string
	controlId: string
	type: string
	as?: ElementType<any>
	defaultValue: string
	disabled?: boolean
	required?: boolean
	inputRef: any
}

const FormField = ({
	title,
	controlId,
	type,
	as = 'input',
	disabled = false,
	required = true,
	defaultValue,
	inputRef,
}: Props) => {
	return (
		<Form.Group className="mb-3" controlId={controlId}>
			<Form.Label>{title}</Form.Label>
			<Form.Control
				as={as}
				type={type}
				placeholder={title}
				disabled={disabled}
				required={required}
				defaultValue={defaultValue}
				ref={inputRef}
			/>
		</Form.Group>
	)
}

export default FormField
