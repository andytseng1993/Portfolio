import { AnimatePresence } from 'framer-motion'
import { resolve } from 'path'
import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import LoadingPage from './loading/LoadingPage'
// const App = lazy(() => wait(5000).then(() => import('./App')))

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)

const wait = (time: number) => {
	return new Promise((resolve) => {
		setTimeout(resolve, time)
	})
}
