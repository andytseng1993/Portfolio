import { Suspense, useEffect, useState } from 'react'
import './App.css'
import LoadingPage from './loading/LoadingPage'

function App() {
	const [isLoading, setIsLoading] = useState(false)
	useEffect(() => {
		setIsLoading(true)
		setTimeout(() => {
			setIsLoading(false)
		}, 5000)
	}, [])
	return (
		<Suspense fallback={<div className="loading"></div>}>
			<LoadingPage isLoading={isLoading} />
		</Suspense>
	)
}

export default App
