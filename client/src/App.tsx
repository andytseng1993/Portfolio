import { Suspense, useEffect, useState } from 'react'
import './App.css'
import LoadingPage from './loading/LoadingPage'
import WelcomePage from './pages/WelcomePage'
import AboutPage from './pages/AboutPage'
import ProjectPage from './pages/ProjectPage'
import NavBar from './pages/NavBar'

function App() {
	const [isLoading, setIsLoading] = useState(false)
	useEffect(() => {
		setIsLoading(true)
		setTimeout(() => {
			setIsLoading(false)
		}, 5000)
	}, [])
	return (
		<div style={{ color: 'white' }}>
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
