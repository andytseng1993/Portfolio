import { FiExternalLink, FiGithub } from 'react-icons/fi'
import classes from './MiniProject.module.css'
import { IconContext } from 'react-icons'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ProjectProps } from '../pages/ReorderPage'

interface Props {
	project?: ProjectProps
}
const MiniProject = ({ project }: Props) => {
	const linkRef = useRef<HTMLAnchorElement>(null)
	const gitLinkRef = useRef<HTMLAnchorElement>(null)
	const websiteHandler = () => {
		linkRef.current?.click()
	}
	const gitHandler = () => {
		gitLinkRef.current?.click()
	}
	const clickHandler = () => {
		if (project?.websiteSrc === '') return gitHandler()
		if (project?.githubSrc === '') return websiteHandler()
	}
	return (
		<motion.div className={classes.miniproject} variants={item}>
			<div className={classes.tag}>
				<div className={classes.corner}></div>
			</div>
			<div className={classes.fileTop}>
				<IconContext.Provider value={{ className: `${classes.icon}` }}>
					{project?.websiteSrc === '' ? (
						<FiExternalLink onClick={websiteHandler} />
					) : null}
					{project?.githubSrc === '' ? <FiGithub onClick={gitHandler} /> : null}
				</IconContext.Provider>
			</div>

			<div className={classes.file} onClick={clickHandler}>
				<IconContext.Provider value={{ className: `${classes.fileIcon}` }}>
					{project?.websiteSrc === '' ? <FiExternalLink /> : <FiGithub />}
				</IconContext.Provider>
				<div>
					<h4 className={classes.title}>{project?.title}</h4>
					<p style={{ fontSize: 17 }}>{project?.content}</p>
				</div>
				<div className={classes.skills}>{project?.tech.join(' ')}</div>
			</div>
			<div className={classes.paper}></div>
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
		</motion.div>
	)
}
export default MiniProject

const item = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			duration: 0.7,
		},
	},
}
