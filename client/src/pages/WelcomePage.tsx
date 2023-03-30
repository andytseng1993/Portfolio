import { log } from 'console'
import { useEffect, useState } from 'react'
import classes from './WelcomePage.module.css'

const WelcomePage = () => {
	const [word, setWord] = useState('Hello  there.')

	useEffect(() => {
		let wordArray = word.split('')
		for (let i = 0; i < 6; i++) {
			setTimeout(() => {
				wordArray.pop()
				const newWords = wordArray.join('')
				setWord(newWords)
			}, 8500 + i * 1000)
		}
		const world = ['w', 'o', 'r', 'l', 'd', '  ', '!']
		for (let i = 0; i < world.length; i++) {
			setTimeout(() => {
				const str = world.shift() ?? ''
				wordArray.push(str)
				const newWords = wordArray.join('')
				console.log(newWords)

				setWord(newWords)
			}, 15000 + i * 750)
		}
	}, [])

	return (
		<div style={{ color: 'white' }}>
			<div className={`${classes.dash}`}>{word}</div>
			<div>I'm Yuhsien Tseng. A website developer.</div>
		</div>
	)
}

export default WelcomePage
