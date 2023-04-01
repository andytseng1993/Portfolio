import { Suspense, useCallback, useEffect, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import LoadingPage from './loading/LoadingPage'
import WelcomePage from './pages/WelcomePage'
import AboutPage from './pages/AboutPage'
import ProjectPage from './pages/ProjectPage'
import NavBar from './pages/NavBar'
import ScrollTriggerSection from './component/ScrollTriggerSection'

function App() {
	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		setIsLoading(true)
		lockScroll()
		setTimeout(() => {
			setIsLoading(false)
		}, 4000)
		setTimeout(() => {
			Scroll()
		}, 6000)
	}, [])
	const lockScroll = useCallback(() => {
		const scrollBarCompensation = window.innerWidth - document.body.offsetWidth
		document.body.style.overflow = 'hidden'
		document.body.style.paddingRight = `${scrollBarCompensation}px`
	}, [])
	const Scroll = useCallback(() => {
		document.body.style.overflowY = 'auto'
		document.body.style.paddingRight = 'auto'
	}, [])

	return (
		<div style={{ color: 'white', overflowX: 'hidden' }}>
			<Suspense fallback={<div className="loading"></div>}>
				<LoadingPage isLoading={isLoading} />
				<NavBar>
					<WelcomePage />
					<AboutPage />
					<ProjectPage />
				</NavBar>
			</Suspense>
		</div>
	)
}

export default App
