import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<App />
)

const wait = (time: number) => {
	return new Promise((resolve) => {
		setTimeout(resolve, time)
	})
}
