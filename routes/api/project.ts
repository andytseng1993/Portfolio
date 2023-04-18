import { PrismaClient } from '@prisma/client'
import express from 'express'
import dotenv from 'dotenv'
import auth from '../../middleware/auth'
import { Buffer } from 'buffer'
dotenv.config()
const router = express.Router()
const prisma = new PrismaClient()

//@route GET api/projects
//@desc return All projects
//@access Public
router.get('/', async (req, res) => {
	try {
		const projects = await prisma.project.findMany()
		const _projects = projects.map((project) => {
			return {
				...project,
				image: project.image!.toString('base64'),
			}
		})
		return res.status(200).json(_projects)
	} catch (error) {
		return res.status(404).json({ error })
	}
})

//@route POST api/projects
//@desc return new project
//@access Private
router.post('/', auth, async (req, res) => {
	const {
		title,
		content,
		createdAt,
		tech,
		githubSrc,
		websiteSrc,
		image,
		pinned,
	} = req.body
	try {
		const project = await prisma.project.create({
			data: {
				title,
				content,
				createdAt,
				tech,
				githubSrc,
				websiteSrc,
				pinned,
				image: Buffer.from(image, 'base64'),
			},
		})
		return res.status(200).json(project)
	} catch (error) {
		res.status(404).json({ error })
	}
})

//@route DELETE api/projects/:projectId
//@desc return success
//@access Private
router.delete('/:projectId', auth, async (req, res) => {
	const { projectId } = req.params
	try {
		await prisma.project.delete({
			where: {
				id: projectId,
			},
		})
		return res.status(204).json({ success: true })
	} catch (error) {
		return res.status(404).json({ success: false })
	}
})

export default router
