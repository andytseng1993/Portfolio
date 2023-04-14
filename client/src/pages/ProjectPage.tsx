import ScrollTriggerSection from '../component/ScrollTriggerSection'
import classes from './ProjectPage.module.css'
import projectPicture from '../assets/pathFinding.png'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { IconContext } from 'react-icons'
import Project from '../component/Project'

const ProjectPage = () => {
	return (
		<section id="Projects" className={classes.content}>
			<div style={{ margin: '0 auto' }}>
				<ScrollTriggerSection>
					<div className={classes.title}>My Projects</div>
				</ScrollTriggerSection>
			</div>

			<div
				className={classes.project}
				style={{ display: 'flex', flexDirection: 'column' }}
			>
				<div
					style={{
						display: 'flex',
						width: '75%',
						marginLeft: 'auto',
						marginRight: 'auto',
					}}
				>
					<ScrollTriggerSection>
						<div className={classes.projectImg}>
							<img src={projectPicture} className={classes.image}></img>
						</div>
					</ScrollTriggerSection>
					<ScrollTriggerSection xFrom={200}>
						<div
							className={classes.projectContent}
							style={{ height: '100%', width: '100%' }}
						>
							<div
								className={classes.projectTitle}
								style={{ textAlign: 'left', fontSize: 32, margin: 0 }}
							>
								PathFinding
							</div>
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<div className={classes.projectDate}>2012/ 10/ 10</div>
								<div className={classes.links}>
									<IconContext.Provider
										value={{
											className: `${classes.icon}`,
											style: { marginRight: '20px', fontSize: '26px' },
										}}
									>
										<FiExternalLink />
										<FiGithub />
									</IconContext.Provider>
								</div>
							</div>
							<div
								className={classes.projectContext}
								style={{
									justifyContent: 'space-between',
									display: 'flex',
									flexDirection: 'column',
									background: 'transparent',
								}}
							>
								尋找路徑是利用演算法繪製兩點之間的最短路線，
								並且將其演算過程視覺化。 理解Dijkstra、Depth First
								Search與A*所搜尋模式的差別。
								<div>
									<ul className={classes.skills} style={{ fontSize: 20 }}>
										<li>React</li> /<li>HTML</li>
									</ul>
								</div>
							</div>
						</div>
					</ScrollTriggerSection>
				</div>
			</div>
			<Project />
			<Project />
			<Project />
		</section>
	)
}
export default ProjectPage
