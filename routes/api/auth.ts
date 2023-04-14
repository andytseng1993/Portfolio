import { PrismaClient } from '@prisma/client'
import express, { Request } from 'express'
import jwt from 'jsonwebtoken'
import auth from '../../middleware/auth'
import dotenv from 'dotenv'

interface JwtPayload extends Request {
	id: string
}

dotenv.config()
const router = express.Router()
const prisma = new PrismaClient()
const privateKey = process.env.PRIVATE_KEY || 'privateKey'

//@route GET api/auth/user,
//@desc Auth user
//@access Public

router.get('/user', async (req, res) => {
	try {
		const token = req.header('x-auth-token')
		if (!token)
			return res.status(401).json({ msg: 'No token, authorization denied' })
		const decode = jwt.verify(req.cookies._session_Id, privateKey) as JwtPayload
		const user = await prisma.user.findUnique({
			where: {
				id: decode.id,
			},
			select: {
				email: true,
			},
		})
		return res.json(user)
	} catch (error) {
		res.status(400).json(error)
	}
})

//@route POST api/auth/login
//@desc Login user
//@access Public
router.post('/login', async (req, res) => {
	const { email, password } = req.body
	//simple validation
	if (!email || !password) {
		return res.status(400).json({ msg: 'Please enter all fields.' })
	}
	//check for exiting user
	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	})
	if (!user)
		return res
			.status(400)
			.json('Please provide a valid email address and password.')
	try {
		//Validate password
		if (password === user.password) {
			jwt.sign(
				{ id: user.id },
				privateKey,
				{ expiresIn: '2h' },
				(err, token) => {
					if (err) throw err
					return res.status(200).json({
						token,
						user: {
							id: user.id,
							email: user.email,
						},
					})
				}
			)
		} else {
			return res
				.status(400)
				.json('Please provide a valid email address and password.')
		}
	} catch (error) {
		res.status(500)
	}
})

export default router
