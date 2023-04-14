import ScrollTriggerSection from '../component/ScrollTriggerSection'
import classes from './ProjectPage.module.css'
import projectPicture from '../assets/pathFinding.png'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { IconContext } from 'react-icons'

const ProjectPage = () => {
	return (
		<section id="Projects" className={classes.content}>
			<ScrollTriggerSection>
				<div className={classes.title}>My Projects</div>
				<div className={classes.project}>
					<div className={classes.projectImg}>
						<img src={projectPicture} className={classes.image}></img>
					</div>
					<div className={classes.projectContent}>
						<div className={classes.projectTitle}>PathFinding</div>
						<div className={classes.projectDate}>2012, 10 ,10</div>

						<div className={classes.projectContext}>
							尋找路徑是利用演算法繪製兩點之間的最短路線，
							並且將其演算過程視覺化。 理解Dijkstra、Depth First
							Search與A*所搜尋模式的差別。
						</div>
						<div>
							<ul className={classes.skills}>
								<li>React</li>/<li>HTML</li>
							</ul>
						</div>
						<div className={classes.links}>
							<IconContext.Provider value={{ className: `${classes.icon}` }}>
								<FiExternalLink />
								<FiGithub />
							</IconContext.Provider>
						</div>
					</div>
				</div>
			</ScrollTriggerSection>

			<div
				className={classes.project}
				style={{
					display: 'flex',
					flexDirection: 'column',
					marginLeft: 'auto',
					marginRight: 'auto',
					width: '70%',
				}}
			>
				<div>
					<ul
						className={classes.skills}
						style={{ flexDirection: 'row', fontSize: 30 }}
					>
						<li>React</li>/<li>HTML</li>
					</ul>
				</div>
				<div style={{ display: 'flex' }}>
					<div className={classes.projectImg}>
						<img src={projectPicture} className={classes.image}></img>
					</div>
					<div className={classes.projectContent} style={{ width: '100%' }}>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<div className={classes.projectTitle}>PathFinding</div>
							<div className={classes.projectDate}>2012, 10 ,10</div>
						</div>

						<div
							className={classes.projectContext}
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								flexDirection: 'column',
							}}
						>
							尋找路徑是利用演算法繪製兩點之間的最短路線，
							並且將其演算過程視覺化。 理解Dijkstra、Depth First
							Search與A*所搜尋模式的差別。
							<div className={classes.links}>
								<IconContext.Provider
									value={{
										className: `${classes.icon}`,
										style: { marginRight: '20px', fontSize: '30px' },
									}}
								>
									<FiExternalLink />
									<FiGithub />
								</IconContext.Provider>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div
				className={classes.project}
				style={{ display: 'flex', flexDirection: 'column' }}
			>
				<div
					style={{
						display: 'flex',
						width: '70%',
						marginLeft: 'auto',
						marginRight: 'auto',
					}}
				>
					<div className={classes.projectImg}>
						<img src={projectPicture} className={classes.image}></img>
					</div>
					<div className={classes.projectContent} style={{ width: '100%' }}>
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
										style: { marginRight: '20px', fontSize: '24px' },
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
				</div>
			</div>
		</section>
	)
}
export default ProjectPage
