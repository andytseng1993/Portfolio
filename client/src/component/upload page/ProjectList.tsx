import { useQuery } from '@tanstack/react-query'
import { Project } from '../../pages/ReorderPage'
import axios from 'axios'
import classes from './ProjectList.module.css'
import { Dispatch, SetStateAction } from 'react'

interface Props {
	setProject: Dispatch<SetStateAction<Project>>
	setPhotoSrc: Dispatch<SetStateAction<string>>
}

const ProjectList = ({ setProject, setPhotoSrc }: Props) => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['projects'],
		queryFn: async () => {
			const { data } = await axios.get('/api/projects')
			return data
		},
	})
	const imageSrc = (src: string) => {
		return `data:image/jpeg;base64,${src}`
	}
	const dateTime = (data: Date) => {
		const dateFormatter = new Intl.DateTimeFormat(undefined, {
			dateStyle: 'medium',
		})
		return dateFormatter.format(new Date(data))
	}
	const handleEdit = (project: Project) => {
		setProject(project)
		setPhotoSrc(imageSrc(project.image))
	}

	return (
		<div>
			<ul>
				{isLoading ? (
					<li>Loading...</li>
				) : isError ? (
					<li>Something Wrong...</li>
				) : (
					data.map((project: Project) => (
						<li
							key={project.id}
							className={classes.list}
							onClick={() => handleEdit(project)}
						>
							<div className={classes.projectImg}>
								<img
									className={classes.image}
									src={imageSrc(project.image)}
								></img>
							</div>
							<div className={classes.content}>
								<h3>{project.title}</h3>
								<div>{dateTime(project.createdAt)}</div>
							</div>
						</li>
					))
				)}
			</ul>
		</div>
	)
}

export default ProjectList
