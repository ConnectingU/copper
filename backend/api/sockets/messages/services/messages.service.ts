import { Logger } from '../../../libs/logger';
import { db } from '../../../app';

export class MessageService {
	static async handleMessage(socket: any, message: any, channelId: any) {
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
					},
				},
				channelId: true,
				createdAt: true,
				updatedAt: true,
			}
		});
		socket.broadcast.emit('message', newMessage);
		Logger.info('Socket-Controller: Message', 'Message: ' +  JSON.stringify(newMessage));
	}
}