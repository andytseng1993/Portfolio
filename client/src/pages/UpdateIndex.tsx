import { useRef, useState } from 'react'
import { Button, Col, Form, Image, Row, Stack } from 'react-bootstrap'
import preview from '../assets/preview.png'
import ProjecctForm from '../component/upload page/ProjecctForm'
import ProjectList from '../component/upload page/ProjectList'

interface PhotoType {
	name: string | null
}

const UpdateIndex = () => {
	const hiddenFileInput = useRef<HTMLInputElement>(null)
	const imageRef = useRef<HTMLImageElement>(null)
	const [photoSrc, setPhotoSrc] = useState(preview)
	const [editFn, setEditFn] = useState(false)
	const [project, setProject] = useState({})

	const handleCancelImage = () => {
		hiddenFileInput.current!.value = ''
		setPhotoSrc(preview)
	}
	const handleLoadImage = () => {
		hiddenFileInput.current!.click()
	}
	const handleLoadImageChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const target = event.target as HTMLInputElement
		handleImage(target.files![0])
	}
	const handleImage = (file: File) => {
		let reader = new FileReader()
		let load = false
		reader.readAsDataURL(file)
		reader.onload = () => {
			setPhotoSrc(reader.result! as string)
			load = true
		}
	}

	return (
		<>
			<Row className="w-100 p-3">
				<div style={{ display: 'flex', cursor: 'pointer' }}>
					<h3
						style={editFn ? { color: 'gray' } : { color: 'black' }}
						onClick={() => setEditFn(false)}
					>
						Upload Project
					</h3>
					<h3 style={{ margin: '0 10px' }}>/ </h3>
					<h3
						style={editFn ? { color: 'black' } : { color: 'gray' }}
						onClick={() => setEditFn(true)}
					>
						Edit Project
					</h3>
				</div>
				{editFn ? (
					<Col xs={3} className="px-4 mt-4">
						<ProjectList setProject={setProject} setPhotoSrc={setPhotoSrc} />
					</Col>
				) : null}
				<Col xs={4} className="px-4 mt-3">
					<Stack gap={2}>
						{editFn ? null : (
							<>
								<input
									ref={hiddenFileInput}
									onChange={(event) => handleLoadImageChange(event)}
									style={{ display: 'none' }}
									type="file"
									accept="image/png, image/jpeg, image/gif"
								/>
								<Stack
									direction="horizontal"
									className="d-flex justify-content-center"
									gap={4}
								>
									<Button className="w-50" onClick={handleLoadImage}>
										Select Image
									</Button>
									<Button
										className="w-25"
										onClick={handleCancelImage}
										variant="outline-secondary"
									>
										Cancel
									</Button>
								</Stack>
							</>
						)}

						<Image
							rounded
							src={photoSrc}
							style={{ maxWidth: '90%' }}
							className={`object-contain m-auto p-3 border rounded my-2 ${
								photoSrc === preview ? 'opacity-50' : ''
							}`}
							alt="resizeImage"
							ref={imageRef}
						></Image>
					</Stack>
				</Col>
				<Col className={'p-4'}>
					<ProjecctForm
						editFn={editFn}
						project={project}
						photoSrc={photoSrc}
						setPhotoSrc={setPhotoSrc}
					/>
				</Col>
			</Row>
		</>
	)
}

export default UpdateIndex
