import { Logger } from '../../../libs/logger';
import { Password } from '../../../libs/password';
import { Service } from 'typedi';
import { db } from '../../../app';
import * as validator from 'email-validator';
import { NotAcceptableError } from 'routing-controllers';

@Service()
export class UserService {
	constructor() {}

	async create(req) {
		const { email, username, password } = req.body;

		if (!email || !username || !password) {
			return Promise.reject('Missing registration info');
		}

		try {
			const hashedPassword = await Password.encrypt(password);
			const emailUsed = await db.user.findUnique({ where: { email } });
			const isValid = validator.validate(email)

			if (emailUsed) {
				throw new NotAcceptableError('E-Mail already in use!');
			}

			if (!isValid) {
				throw new NotAcceptableError('E-Mail invalid!');
			}

			const user = await db.user.create({
				data: {
					email,
					username,
					password: hashedPassword,
				}
			});

			return user;
		} catch (error) {
			Logger.error('Service: User', 'ErrorInfo:' + JSON.stringify(error));
			return JSON.stringify(error);
		}
	}

	async read(req) {
		const userId: number = +req.params.id;
		try {
			const user = await db.user.findUnique({
				where: { id: userId },
				select: {
					id: true,
					email: true,
					username: true,
					createdAt: true,
					updatedAt: true,
				}
			});

			return user;
		} catch (error) {
			Logger.error('Service: User', 'ErrorInfo:' + JSON.stringify(error));
			return JSON.stringify(error);
		}
	}
	
	async update(req) {
		const userId: number = +req.params.id;
		const body = req.body;
		let hashedPassword: string;
		try {
			if (body.password) {
				hashedPassword = await Password.encrypt(body.password);
			}

			const user = await db.user.update({
				where: {
					id: userId,
				},
				data: {
					username: body.username || undefined,
					avatarUrl: body.avatarUrl || undefined,
					bio: body.bio || undefined,
					displayName: body.displayName || undefined,
					password: hashedPassword || undefined,
				}
			});

			return user;
		} catch (error) {
			Logger.error('Service: User', 'ErrorInfo:' + JSON.stringify(error));
			return JSON.stringify(error);
		}
	}
}
