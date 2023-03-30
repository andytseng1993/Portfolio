import { PropsWithChildren } from 'react'

const NavBar = ({ children }: PropsWithChildren) => {
	return (
		<div>
			Nav
			{children}
		</div>
	)
}
export default NavBar
