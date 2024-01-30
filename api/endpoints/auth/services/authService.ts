import { Logger } from '../../../libs/logger';
import { Password } from '../../../libs/password';
import { Service } from 'typedi';
import { prisma } from '../../../app';
import { UserObject } from '../models/authModel';
import * as validator from 'email-validator';
import { NotAcceptableError } from 'routing-controllers';

@Service()
export class AuthService {
	constructor() {}

	async registerExecutor(body: UserObject): Promise<any> {
		const { email, displayName, username, password } = body;
		if (!email || !displayName || !username || !password) {
			return Promise.reject('Missing registration info');
		}
		try {
			const hashedPassword = await Password.encrypt(password);
			const emailUsed = await prisma.user.findUnique({ where: { email } });
			const isValid = validator.validate(email);

			if (emailUsed) {
				throw new NotAcceptableError('E-Mail already in use!');
			}

			if (!isValid) {
				throw new NotAcceptableError('E-Mail invalid!');
			}

			const newUser = prisma.user.create({
				data: {
					email,
					displayName,
					username,
					password: hashedPassword,
				}
			});

			return Promise.resolve(newUser);
		} catch (error) {
			Logger.error('Service: register', 'errorInfo:' + JSON.stringify(error));
			return Promise.reject(JSON.stringify(error));
		}
	}
}