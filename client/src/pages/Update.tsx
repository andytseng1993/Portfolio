import { Outlet } from 'react-router-dom'
import UploadNav from '../component/upload page/UploadNav'
import { useUserAuth } from '../context/UserAuth'

const Update = () => {
	const { currentUser } = useUserAuth()

	return (
		<UploadNav currentUser={currentUser}>
			<Outlet />
		</UploadNav>
	)
}

export default Update
