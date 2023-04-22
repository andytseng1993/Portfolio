import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

interface Props {
	updateProject: () => void
}
const UpdateBtn = ({ updateProject }: Props) => {
	const [show, setShow] = useState(false)
	const updateOrder = () => {
		updateProject()
		setShow(false)
	}
	return (
		<>
			<Button className="w-50" onClick={() => setShow(true)}>
				Update Project
			</Button>
			<Modal show={show} onHide={() => setShow(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Update Project</Modal.Title>
				</Modal.Header>
				<Modal.Body>Do you want to update this project?</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShow(false)}>
						Close
					</Button>
					<Button variant="primary" onClick={updateOrder}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default UpdateBtn
