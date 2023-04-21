import { Reorder, useMotionValue } from 'framer-motion'
import { ProjectType } from './ProjecctForm'
import classes from './ReorderItem.module.css'

interface Project extends ProjectType {
	id: string
}
const ReorderItem = ({ project }: { project: Project }) => {
	const y = useMotionValue(0)

	const imageSrc = (src: string) => {
		return `data:image/jpeg;base64,${src}`
	}
	return (
		<>
			<Reorder.Item value={project} id={project.id} className={classes.reorder}>
				<div className={classes.projectImg}>
					<img className={classes.image} src={imageSrc(project.image)}></img>
				</div>
				<div style={{ padding: '10px' }}>
					<div>{project.title}</div>
					<div>{project.content}</div>
					<div className={classes.tech}>{project.tech}</div>
				</div>
			</Reorder.Item>
		</>
	)
}

export default ReorderItem
