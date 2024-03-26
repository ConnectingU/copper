import { Logger } from '../../../libs/logger';
import { db } from '../../../app';

export class MessageService {
	static async handleMessage(socket: any, message: any, channelId: number) {
		const newMessage = await db.message.create({
			data: {
				content: message.content,
				userId: message.userId,
				channelId: +channelId,
			},
			select: {
				id: true,
				content: true,
				user: {
					select: {
						id: true,
						username: true,
						displayName: true,
						avatarUrl: true,
					},
				},
				channelId: true,
				createdAt: true,
				updatedAt: true,
			}
		});

		const history = await db.history.findFirst({
			where: { userId: message.userId, channelId: Number(channelId) },
			select: {
				id: true,
			}
		});

		await db.history.update({
			where: { id: history.id },
			data: {
				lastVisited: new Date()
			}
		});
		socket.broadcast.emit('message', newMessage);
		Logger.info('Socket-Controller: Message', 'Message: ' +  JSON.stringify(newMessage));
	}

	static async handleTyping(socket: any, message: any) {
		const user = await db.user.findUnique({
			where: {
				id: message.userId,
			},
			select: {
				id: true,
				username: true,
				displayName: true,
			},
		});
		const resp = {
			...user,
			isTyping: message.isTyping,
		};

		socket.broadcast.emit('typing', resp);
		Logger.info('Socket-Controller: Message', 'Typing: ' +  JSON.stringify(message));
	}
}
