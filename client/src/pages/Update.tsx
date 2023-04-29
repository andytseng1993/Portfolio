import { Outlet } from 'react-router-dom'
import UploadNav from '../component/upload page/UploadNav'
import { useUserAuth } from '../context/UserAuth'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const Update = () => {
	const { currentUser } = useUserAuth()

	const projectorder = useQuery({
		queryKey: ['projectorder'],
		queryFn: async () => {
			const { data } = await axios.get('/api/projectorder')
			return data
		},
	})

	return (
		<UploadNav currentUser={currentUser}>
			<Outlet context={projectorder} />
		</UploadNav>
	)
}

export default Update
