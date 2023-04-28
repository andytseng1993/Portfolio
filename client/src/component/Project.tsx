import { IconContext } from 'react-icons'
import ScrollTriggerSection from './ScrollTriggerSection'
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import projectPicture from '../assets/pathFinding.png'
import classes from './Project.module.css'
import { ProjectProps } from '../pages/ReorderPage'
import { useRef } from 'react'

interface Props {
	project: ProjectProps
}
const Project = ({ project }: Props) => {
	const linkRef = useRef<HTMLAnchorElement>(null)
	const gitLinkRef = useRef<HTMLAnchorElement>(null)

	const dateTime = (date: Date) => {
		const dateFormatter = new Intl.DateTimeFormat(undefined, {
			dateStyle: 'medium',
		})
		return dateFormatter.format(new Date(date))
	}
	const imageSrc = (src: string) => {
		return `data:image/jpeg;base64,${src}`
	}

	const websiteHandler = () => {
		linkRef.current?.click()
	}
	const gitHandler = () => {
		gitLinkRef.current?.click()
	}
	return (
		<>
			<div className={`${classes.project} boxReverse`}>
				<ScrollTriggerSection>
					<div className={classes.projectImg}>
						<img src={imageSrc(project.image)} className={classes.image}></img>
						<IconContext.Provider value={{ className: `${classes.fileIcon}` }}>
							<FiExternalLink onClick={websiteHandler} />
						</IconContext.Provider>
					</div>
				</ScrollTriggerSection>
				<ScrollTriggerSection xFrom={200}>
					<div className={classes.projectContent}>
						<div className={classes.projectTitle}>{project.title}</div>
						<div className={classes.dateArea}>
							<div className={classes.projectDate}>
								{dateTime(project.createdAt)}
							</div>
							<div className={classes.links}>
								<IconContext.Provider value={{ className: `${classes.icon}` }}>
									{project?.websiteSrc !== '' ? (
										<FiExternalLink onClick={websiteHandler} />
									) : null}
									{project?.githubSrc !== '' ? (
										<FiGithub onClick={gitHandler} />
									) : null}
								</IconContext.Provider>
							</div>
						</div>
						<div className={classes.projectContext}>
							<div style={{ marginBottom: 10 }}>{project.content}</div>
							<div className={classes.skills}>{project.tech.join(' / ')}</div>
						</div>
					</div>
				</ScrollTriggerSection>
				<a
					className={classes.bodyLink}
					ref={linkRef}
					href={project?.websiteSrc}
					target="_blank"
				></a>
				<a
					className={classes.bodyLink}
					ref={gitLinkRef}
					href={project?.githubSrc}
					target="_blank"
				></a>
			</div>
		</>
	)
}

export default Project
