import { Service } from 'typedi';
import * as jwt from 'jsonwebtoken';

@Service()
export class PingService {
	constructor() {}

	async find(req) {
		let isAuthenticated = false;
		let token = req.headers['authorization'];
		let decoded: any;

		if (token) {
			token = token.split(' ')[1];
			decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
		}
		
		if (decoded) {
			isAuthenticated = true;
		}

		return {'date': Date(), 'status': 'Service is running.', 'isAuthenticated': isAuthenticated};
	}
}