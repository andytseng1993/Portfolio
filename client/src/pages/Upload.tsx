import UploadNav from '../component/upload page/UploadNav'
import { useUserAuth } from '../context/UserAuth'

const Upload = () => {
	const { currentUser } = useUserAuth()
	return (
		<>
			<UploadNav currentUser={currentUser}>
				<h1>123</h1>
			</UploadNav>
		</>
	)
}

export default Upload
