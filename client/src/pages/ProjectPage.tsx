import ScrollTriggerSection from '../component/ScrollTriggerSection'
import classes from './ProjectPage.module.css'
import Project from '../component/Project'
import MiniProject from '../component/MiniProject'
import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { ProjectProps } from './ReorderPage'

const ProjectPage = () => {
	const [miniProjects, setMiniProjects] = useState([])
	const [projectList, stProjectList] = useState([])
	const ref = useRef(null)
	const projects = useQuery({
		queryKey: ['projects'],
		queryFn: async () => {
			const { data } = await axios.get('/api/projects')
			return data
		},
	})
	const projectorder = useQuery({
		queryKey: ['projectorder'],
		queryFn: async () => {
			const { data } = await axios.get('/api/projectorder')
			return data
		},
	})

	useEffect(() => {
		if (
			projectorder.data === undefined ||
			projectorder.data[0] === undefined ||
			projects.data === undefined
		)
			return
		if (projectorder.data[0].length === 0 || projects.data.length === 0) return
		const projectList = projectorder.data[0].projectOrder.map((id: string) =>
			projects.data.find((project: ProjectProps) => project.id === id)
		)
		const miniProjectList = projectorder.data[0].unpinnedProjectOrder.map(
			(id: string) =>
				projects.data.find((project: ProjectProps) => project.id === id)
		)
		console.log(projectList)
		console.log(projectorder.data[0])

		stProjectList(projectList)
		setMiniProjects(miniProjectList)
	}, [projects.data, projectorder.data])

	return (
		<section id="Projects" className={classes.content}>
			<div className={classes.projects}>
				<div style={{ margin: '0 auto' }}>
					<ScrollTriggerSection>
						<div className={classes.title}>My Projects</div>
					</ScrollTriggerSection>
				</div>
				{projects.isLoading ? (
					<h3>Loading...</h3>
				) : projects.isError ? (
					<h3>Something wrong!</h3>
				) : projectList.length > 0 ? (
					projectList.map((project: ProjectProps) => (
						<Project key={project.id} project={project} />
					))
				) : null}
				<ScrollTriggerSection yFrom={30} yTo={0} xFrom={0}>
					<div
						className={classes.OtherTitle}
						style={{ textAlign: 'center', margin: '100px 0 30px' }}
					>
						Other Projects
					</div>
					<motion.div
						ref={ref}
						className={classes.miniprojects}
						initial={'hidden'}
						whileInView={'show'}
						variants={container}
						viewport={{ once: true }}
					>
						{projectorder.isLoading ? (
							<h3>Loading...</h3>
						) : projectorder.isError ? (
							<h3>Something wrong!</h3>
						) : miniProjects.length > 0 ? (
							miniProjects.map((project: ProjectProps) => (
								<MiniProject key={project.id} project={project} />
							))
						) : null}

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
