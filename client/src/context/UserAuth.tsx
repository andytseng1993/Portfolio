import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { createContext, PropsWithChildren, useContext, useState } from 'react'

interface CurrentUserAuth {
	currentUser: UserName
}
interface UserName {
	email: string | null
}
interface ConfigType {
	headers: {
		'Content-type': string
		'x-auth-token'?: string
	}
}
export const tokenConfig = () => {
	const token = JSON.parse(localStorage.getItem('token')!)
	const config = {
		headers: {
			'Content-type': 'application/json',
		},
	} as ConfigType
	if (token) {
		config.headers['x-auth-token'] = token
	}
	return config
}

const UserAuthContext = createContext<CurrentUserAuth>({} as CurrentUserAuth)
export const UserAuthContextProvider = ({ children }: PropsWithChildren) => {
	const [currentUser, setCurrentUser] = useState<UserName>({
		email: null,
	})
	const { data } = useQuery({
		queryFn: async () => {
			const { data } = await axios.get('/api/auth/user', tokenConfig())
			return data
		},
		retry: false,
		queryKey: ['user'],
		onSuccess: (data) => {
			console.log(data)

			setCurrentUser(data)
		},
		onError: (err) => {
			localStorage.removeItem('token')
			setCurrentUser({ email: '' })
		},
	})

	const value = {
		currentUser,
	}
	return (
		<UserAuthContext.Provider value={value}>
			{children}
		</UserAuthContext.Provider>
	)
}

export const useUserAuth = () => {
	return useContext(UserAuthContext)
}
