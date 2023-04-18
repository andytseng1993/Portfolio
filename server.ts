import { PrismaClient } from '@prisma/client'
import express from 'express'
import dotenv from 'dotenv'
import auth from './routes/api/auth'
import project from './routes/api/project'
import projectOrder from './routes/api/projectOrder'
import path from 'path'

dotenv.config()
const port = process.env.PORT || 3001
const app = express()
app.use(express.json({ limit: '5mb' }))

app.use('/api/auth', auth)
app.use('/api/projects', project)
app.use('/api/projectorder', projectOrder)

app.use(express.static(path.join(__dirname, './client/dist')))
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, './client/dist/index.html'))
})
app.listen(port, () => console.log(`Sever started on port ${port}`))

// const prisma = new PrismaClient()
// async function main() {
// 	// Connect the client
// 	await prisma.$connect()
// 	//... you will write your Prisma Client queries here
// 	const user = await prisma.user.create({})
// 	console.log(user)
// }

// main()
// 	.then(async () => {
// 		await prisma.$disconnect()
// 	})
// 	.catch(async (e) => {
// 		console.error(e)
// 		await prisma.$disconnect()
// 		process.exit(1)
// 	})
