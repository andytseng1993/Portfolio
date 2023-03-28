import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

function auth(req, res, next) {
	const token = req.header('x-auth-token')
	if (!token)
		return res.status(401).json({ msg: 'No token, authorization denied' })

	try {
		const decode = jwt.verify(token, process.env.JWTSECRET)
		//Add user from payload
		req.user = decode
		next()
	} catch (e) {
		res.status(400).json({ meg: 'Token is not valid' })
	}
}

export default auth
