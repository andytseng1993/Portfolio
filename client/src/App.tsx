import { Suspense, useCallback, useEffect, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import LoadingPage from './loading/LoadingPage'
import WelcomePage from './pages/WelcomePage'
import AboutPage from './pages/AboutPage'
import ProjectPage from './pages/ProjectPage'
import NavBar from './pages/NavBar'
import ScrollTriggerSection from './component/ScrollTriggerSection'
import { useMotionValueEvent, useScroll } from 'framer-motion'

export const lockScroll = () => {
	const scrollBarCompensation = window.innerWidth - document.body.offsetWidth
	document.body.style.overflow = 'hidden'
	document.body.style.paddingRight = `${scrollBarCompensation}px`
}
export const scroll = () => {
	document.body.style.overflowY = 'scroll'
	document.body.style.paddingRight = 'auto'
}

function App() {
	const [isLoading, setIsLoading] = useState(true)
	const { scrollY } = useScroll()

	// useMotionValueEvent(scrollY, 'change', (latest) => {
	// 	console.log('Page scroll: ', latest)
	// })
	console.log(scrollY)

	useEffect(() => {
		setIsLoading(true)
		lockScroll()
		setTimeout(() => {
			setIsLoading(false)
		}, 4000)
		setTimeout(() => {
			scroll()
		}, 6000)
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
