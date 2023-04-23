import ScrollTriggerSection from '../component/ScrollTriggerSection'
import classes from './ProjectPage.module.css'
import Project from '../component/Project'
import MiniProject from '../component/MiniProject'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ProjectPage = () => {
	const ref = useRef(null)
	const isInView = useInView(ref)

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
				<ScrollTriggerSection yFrom={30} yTo={0} xFrom={0}>
					<h2 style={{ textAlign: 'center', margin: '100px 0 30px' }}>
						Other Projects
					</h2>
					<motion.div
						ref={ref}
						className={classes.miniprojects}
						initial={'hidden'}
						whileInView={'show'}
						variants={container}
						viewport={{ once: true }}
					>
						<MiniProject />
						<MiniProject />
						<MiniProject />
						<MiniProject />
						<div className={classes.flexWrap}></div>
						<div className={classes.flexWrap}></div>
					</motion.div>
				</ScrollTriggerSection>
			</div>
		</section>
	)
}
export default ProjectPage

const container = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			delayChildren: 0.2,
			staggerChildren: 0.1,
		},
	},
}
