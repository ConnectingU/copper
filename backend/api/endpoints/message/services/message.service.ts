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
		const messageId: number = +req.params.id;
		const body = req.body;
		const imageUrl = req.file ? `${messageId}-image.png` : undefined;

		const message = await db.message.update({
			where: {
				id: messageId,
			},
			data: {
				content: body.role || undefined,
				image: imageUrl || undefined,
			}
		});

		return message;
	}

	async delete(req) {
		const messageId: number = +req.params.id;

		await db.message.delete({
			where: {
				id: messageId,
			}
		});
	}
}