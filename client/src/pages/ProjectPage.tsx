import ScrollTriggerSection from '../component/ScrollTriggerSection'
import classes from './ProjectPage.module.css'
import Project from '../component/Project'

const ProjectPage = () => {
	return (
		<section id="Projects" className={classes.content}>
			<div className={classes.projects}>
				<div style={{ margin: '0 auto' }}>
					<ScrollTriggerSection>
						<div className={classes.title}>My Projects</div>
					</ScrollTriggerSection>
				</div>
				<Project />
				<Project />
				<Project />
			</div>
		</section>
	)
}
export default ProjectPage
