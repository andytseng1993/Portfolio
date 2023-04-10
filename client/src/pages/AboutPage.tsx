import ScrollTriggerSection from '../component/ScrollTriggerSection'
import AsciiCanvas from '../component/canvas/AsciiCanvas'

const AboutPage = () => {
	return (
		<section id="About" style={{ height: '100vh' }}>
			<ScrollTriggerSection>
				<h1>About Me</h1>
			</ScrollTriggerSection>
			<p>self introduction</p>
			<AsciiCanvas />
		</section>
	)
}

export default AboutPage
