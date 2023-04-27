import { useState } from 'react'
import ScrollTriggerSection from '../component/ScrollTriggerSection'
import AsciiCanvas from '../component/canvas/AsciiCanvas'
import classes from './AboutPage.module.css'

const AboutPage = () => {
	const [value, setValue] = useState(3)
	const [skills, setSkills] = useState([
		'HTML',
		'CSS',
		'JavaScript',
		'React',
		'Redux',
		'Node.js',
		'Vercel',
		'Github',
	])
	return (
		<section id="About" className={classes.content}>
			<ScrollTriggerSection>
				<div className={classes.title}>ABOUT ME</div>
				<div className={classes.about}>
					<div className={classes.context}>
						<p>
							{`研究所畢業後，有幸能到美國進行求學，面對社會議題的討論，有助於培養邏輯分析與自我思考，同學之間互相分享的想法，瞭解到不同文化與價值觀，讓腦中想法更加寬廣，使思考更加的豐富與完整。打程式碼的過程中訓練邏輯思考能力，就像是實驗規劃，將過程拆解成不同的小步驟，再組合來達成目的，最後進行測試查看是否有漏洞，並加以修正。
						\n求學過程中，因爲成績優異，得到留學生獎學金與President’s List的殊榮。在課餘的時間，有幸接到替藝術家架設網站的案子，設計與建構藝術畫廊網站，使畫作能夠在網頁與手機上無國界閲覽。透過不斷地查閲資料與學習去解決問題，讓網站的功能逐漸豐富與便利，並讓顧客使用感受更加舒適。於2021年得到證書後，建構模擬的電商平臺，利用學習到的資料的處理與建構技術，訓練與後端平臺溝通的方法，達成即時同步的數據體驗與安全身份認證。
					`}
						</p>
						<div className={classes.skillTitle}>My skills</div>
						<div className={classes.skills}>
							{skills.map((skill) => (
								<div key={skill} className={classes.skill}>
									{skill}
								</div>
							))}
						</div>
					</div>
					<div className={classes.canvas}>
						<div>
							<AsciiCanvas cellsize={value} />
							<label className={classes.selfLabel}>
								{value === 1 ? 'Original image' : `Resolution: ${value}px`}
								<input
									type="range"
									min="1"
									max="20"
									step="1"
									value={value}
									onChange={(e) => setValue(parseInt(e.target.value))}
								></input>
							</label>
						</div>
					</div>
				</div>
			</ScrollTriggerSection>
		</section>
	)
}

export default AboutPage
