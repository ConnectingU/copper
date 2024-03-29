import { Password } from '../../../libs/password';
import { Service } from 'typedi';
import { db } from '../../../app';
import { NotAcceptableError } from 'routing-controllers';
import * as jwt from 'jsonwebtoken';

@Service()
export class AuthService {
	constructor() {}

	async token(req) {
		const { email, password } = req.body;
		
		const user = await db.user.findUnique({
			where: {
				email
			}
		});

		if (!user) {
			throw new NotAcceptableError('User does not exist!');
		}

		const passwordMatch = await Password.compare(password, user.password);
		
		if (!passwordMatch) {
			throw new NotAcceptableError('Password Incorrect!');
		}
			
		const token = jwt.sign({
			id: user.id,
			email: user.email,
		}, process.env.JWT_ACCESS_SECRET, {
			expiresIn: '1d',
		});

		return { token, id: user.id };
	}
}
