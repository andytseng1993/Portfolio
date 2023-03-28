import { PrismaClient } from '@prisma/client'
import express from 'express'
import dotenv from 'dotenv'
import auth from './routes/api/auth.mjs'
import project from './routes/api/project.mjs'

dotenv.config()
const port = process.env.PORT || 3001
const app = express()
app.use(express.json())

app.use('/api/auth', auth)
app.use('/api/projects', project)
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
