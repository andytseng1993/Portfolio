import { PropsWithChildren, useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useUserAuth } from '../context/UserAuth'

const ProtectedRouter = ({ children }: PropsWithChildren) => {
	const { currentUser } = useUserAuth()

	if (currentUser.userName === '') {
		return <Navigate to={'.'}></Navigate>
	}
	return <>{children ? children : <Outlet />}</>
}

export default ProtectedRouter
