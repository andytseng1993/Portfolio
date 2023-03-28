import express from 'express'
import dotenv from 'dotenv'
import auth from './routes/api/auth'
import project from './routes/api/project'
import cors from 'cors'

dotenv.config()
const port = process.env.PORT || 3001
const app = express()
app.use(express.json())

app.use('/api/auth', auth)
app.use('/api/projects', project)
app.listen(port, () => console.log(`Sever started on port ${port}`))
