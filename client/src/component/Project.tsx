import { IconContext } from 'react-icons'
import ScrollTriggerSection from './ScrollTriggerSection'
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import projectPicture from '../assets/pathFinding.png'
import classes from './Project.module.css'
import { ProjectProps } from '../pages/ReorderPage'

interface Props {
	project: ProjectProps
}
const Project = ({ project }: Props) => {
	return (
		<>
			<div className={`${classes.project} boxReverse`}>
				<ScrollTriggerSection>
					<div className={classes.projectImg}>
						<img src={projectPicture} className={classes.image}></img>
					</div>
				</ScrollTriggerSection>
				<ScrollTriggerSection xFrom={200}>
					<div className={classes.projectContent}>
						<div className={classes.projectTitle}>PathFinding</div>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<div className={classes.projectDate}>2012/ 10/ 10</div>
							<div className={classes.links}>
								<IconContext.Provider value={{ className: `${classes.icon}` }}>
									<FiExternalLink />
									<FiGithub />
								</IconContext.Provider>
							</div>
						</div>
						<div className={classes.projectContext}>
							尋找路徑是利用演算法繪製兩點之間的最短路線，
							並且將其演算過程視覺化。 理解Dijkstra、Depth First
							Search與A*所搜尋模式的差別。
							<div>
								<ul className={classes.skills}>
									<li>React</li> /<li>HTML</li>
								</ul>
							</div>
						</div>
					</div>
				</ScrollTriggerSection>
			</div>
		</>
	)
}

export default Project
