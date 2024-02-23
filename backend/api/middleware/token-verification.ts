import * as jwt from 'jsonwebtoken';
import { Action } from 'routing-controllers';
import { db } from '../app';

export class TokenVerification {
	static async verify(action: Action): Promise<any> {
		let token = action.request.headers['authorization'];

		if (token) {
			token = token.split(' ')[1];
		}
		
		const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
		const userId = decoded.id;
		const user = await db.user.findUnique({ where: { id: userId } });

		if (user) {
			return true;
		}

		return action.response.red;
	}
}
