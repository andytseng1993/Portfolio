import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Request, Response, NextFunction } from 'express'
dotenv.config()

export interface GetUserAuthInfoRequest extends Request {
	user?: string // or any other type
}

const secret = process.env.JWTSECRET || 'jwtSecret'
function auth(req: GetUserAuthInfoRequest, res: Response, next: NextFunction) {
	const token = req.header('x-auth-token')
	if (!token)
		return res.status(401).json({ msg: 'No token, authorization denied' })

	try {
		const decode = jwt.verify(token, secret) as string
		//Add user from payload
		req.user = decode
		next()
	} catch (e) {
		res.status(400).json({ meg: 'Token is not valid' })
	}
}

export default auth
