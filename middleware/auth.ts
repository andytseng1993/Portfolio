import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Request, Response, NextFunction } from 'express'
dotenv.config()

export interface GetUserAuthInfoRequest extends Request {
	user?: JwtPayload
	// or any other type
}
interface JwtPayload {
	id: string
}

const privateKey = process.env.PRIVATE_KEY || 'privateKey'

function auth(req: GetUserAuthInfoRequest, res: Response, next: NextFunction) {
	const token = req.header('x-auth-token')
	if (!token)
		return res.status(401).json({ msg: 'No token, authorization denied' })
	try {
		const decode = jwt.verify(token, privateKey) as JwtPayload
		//Add user from payload
		req.user = decode
		next()
	} catch (e) {
		res.status(400).json({ meg: 'Token is not valid' })
	}
}

export default auth
