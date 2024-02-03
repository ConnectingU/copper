import { Logger } from '../../../libs/logger';
import { Password } from '../../../libs/password';
import { Service } from 'typedi';
import { db } from '../../../app';
import * as validator from 'email-validator';
import { NotAcceptableError } from 'routing-controllers';
import * as jwt from 'jsonwebtoken';

@Service()
export class AuthService {
	constructor() {}

	async registerExecutor(body) {
		const { email, displayName, username, password } = body;

		if (!email || !displayName || !username || !password) {
			return Promise.reject('Missing registration info');
		}

		try {
			const hashedPassword = await Password.encrypt(password);
			const emailUsed = await db.user.findUnique({ where: { email } });
			const isValid = validator.validate(email);

			if (emailUsed) {
				throw new NotAcceptableError('E-Mail already in use!');
			}

			if (!isValid) {
				throw new NotAcceptableError('E-Mail invalid!');
			}

			db.user.create({
				data: {
					email,
					displayName,
					username,
					password: hashedPassword,
				}
			});

			return {email, displayName, username};
		} catch (error) {
			Logger.error('Service: register', 'errorInfo:' + JSON.stringify(error));
			return JSON.stringify(error);
		}
	}

	async tokenExecutor(body) {
		const { email, password } = body;

		try {
			const user = await db.user.findUnique({
				where: {
					email
				}
			});

			if (!user) {
				throw new NotAcceptableError('User does not exist!');
			}

			const passwordMatch = Password.compare(password, user.password);

			if (!passwordMatch) {
				throw new NotAcceptableError('Password Incorrect!');
			}
			
			const token = jwt.sign({
				id: user.id,
				email: user.email,
			}, process.env.JWT_ACCESS_SECRET, {
				expiresIn: '1d',
			});

			return token;
		} catch (error) {
			Logger.error('Service: login', 'errorInfo:' + JSON.stringify(error));
			return JSON.stringify(error);
		}
	}
}
