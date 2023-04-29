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
		'MERN',
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
							{`
							你好！我是曾兪銜。 我對網路開發的興趣始於2020年，藉由學習各種新知識與技術，成為前端網頁開發人員，開始構建網站和前端應用程式。
							\n在課餘的時間，我有幸替藝術家架設網站，設計與建構畫廊網站，使畫作能夠在電腦與手機上無國界閲覽，我努力的建立功能，不僅讓圖片讀取更加流暢，還使顧客使用感受更加舒適，我也透過不斷地查閲資料與學習去解決問題。
							\n我願意接受工作機會，在那裡我可以做出貢獻、學習和成長。 如果您有與我的技能和經驗相匹配的好機會，請隨時與我聯絡。
					`}
						</p>
						<div>
							<div className={classes.skillTitle}>My skills</div>
							<div className={classes.skills}>
								{skills.map((skill) => (
									<div key={skill} className={classes.skill}>
										{skill}
									</div>
								))}
							</div>
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
