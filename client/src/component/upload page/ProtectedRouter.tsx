import { PropsWithChildren, useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useUserAuth } from '../../context/UserAuth'

const ProtectedRouter = ({ children }: PropsWithChildren) => {
	const { currentUser } = useUserAuth()

	if (currentUser.email === '') {
		return <h1>Please login!</h1>
	}
	return <>{children ? children : <Outlet />}</>
}

export default ProtectedRouter
