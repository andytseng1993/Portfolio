import { Suspense, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UserAuthContextProvider } from './context/UserAuth'
import { animateScroll } from 'react-scroll'
import LoadingPage from './loading/LoadingPage'
import WelcomePage from './pages/WelcomePage'
import AboutPage from './pages/AboutPage'
import ProjectPage from './pages/ProjectPage'
import NavBar from './pages/NavBar'
import Update from './pages/Update'
import ProtectedRouter from './component/upload page/ProtectedRouter'
import UpdateIndex from './pages/UpdateIndex'
import ReorderPage from './pages/ReorderPage'

export const lockScroll = () => {
	const scrollBarCompensation = window.innerWidth - document.body.offsetWidth
	document.body.style.overflow = 'hidden'
	document.body.style.marginRight = `${scrollBarCompensation}px`
}
export const scroll = () => {
	document.body.style.overflowY = 'scroll'
	document.body.style.marginRight = 'auto'
}

function App() {
	const queryClient = new QueryClient()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		animateScroll.scrollToTop({ smooth: false, duration: 0 })
		setIsLoading(true)
		lockScroll()
		setTimeout(() => {
			setIsLoading(false)
		}, 4000)
		setTimeout(() => {
			scroll()
		}, 6000)
	}, [])

	const router = createBrowserRouter([
		{
			path: '/',
			element: (
				<div className="app">
					<Suspense fallback={<div className="loading"></div>}>
						<LoadingPage isLoading={isLoading} />
						<NavBar>
							<WelcomePage />
							<AboutPage />
							<ProjectPage />
						</NavBar>
					</Suspense>
				</div>
			),
		},
		{
			path: 'update',
			element: (
				<UserAuthContextProvider>
					<Update />
				</UserAuthContextProvider>
			),
			children: [
				{
					index: true,
					element: (
						<ProtectedRouter>
							<UpdateIndex />
						</ProtectedRouter>
					),
				},
				{
					path: 'reorder',
					element: (
						<ProtectedRouter>
							<ReorderPage />
						</ProtectedRouter>
					),
				},
			],
		},
	])
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	)
}

export default App
