import { Service } from 'typedi';
import { db } from '../../../app';
import { NotAcceptableError, NotFoundError } from 'routing-controllers';

@Service()
export class MessageService {
	constructor() {}

	async create(req) {
		const { userId, channelId, content } = req.body;

		if (!userId || !channelId || !content) {
			throw new NotAcceptableError('Missing required fields!');
		}

		const message = await db.message.create({
			data: {
				userId,
				channelId,
				content,

			}
		});

		return message;
	}

	async all(req) {
		const channelId: number = +req.params.id;
		const messages = await db.message.findMany({
			where: {
				channelId,
			},
			select: {
				id: true,
				content: true,
				image: true,
				createdAt: true,
				updatedAt: true,
			}
		});

		return messages;
	}

	async read(req) {
		const messageId: number = +req.params.id;
		const message = await db.message.findUnique({
			where: { id: messageId },
			select: {
				id: true,
				content: true,
				image: true,
				createdAt: true,
				updatedAt: true,
			}
		});

		if (!message) {
			throw new NotFoundError('Message not found.');
		}

		return message;
	}
	
	async update(req) {
		const communityUserId: number = +req.params.id;
		const body = req.body;

		const communityUser = await db.communityUser.update({
			where: {
				id: communityUserId,
			},
			data: {
				role: body.role || undefined,
			}
		});

		return communityUser;
	}

	async delete(req) {
		const communityUserId: number = +req.params.id;

		await db.communityUser.delete({
			where: {
				id: communityUserId,
			}
		});
	}
}
