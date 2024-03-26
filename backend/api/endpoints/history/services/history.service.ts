import { Service } from 'typedi';
import { db } from '../../../app';

@Service()
export class HistoryService {
	constructor() {}

	async read(req) {
		const userId: number = +req.params.userId;
		const channelId: number = +req.params.channelId;

		const history = await db.history.findFirst({
			where: { userId, channelId },
			select: {
				lastVisited: true,
			}
		});

		const messages = await db.message.findMany({
			where: { channelId },
			select: {
				createdAt: true,
			}
		});

		let count = 0;

		messages.forEach(element => {
			if (element.createdAt > history.lastVisited) {
				count++;
			}
		});

		return {count};
	}
	
	async update(req) {
		const userId: number = +req.params.userId;
		const channelId: number = +req.params.channelId;
		const { lastVisited } = req.body;

		const history = await db.history.findFirst({
			where: { userId, channelId },
			select: {
				id: true,
				userId: true,
				channelId: true,
				lastVisited: true,
			}
		});

		if (!history) {
			const newHistory = await db.history.create({
				data: {
					userId,
					channelId,
					lastVisited,
				}
			});
			return newHistory; 
		}

		const updatedHistory = db.history.update({
			where: { id: history.id },
			data: {
				lastVisited
			}
		});
		return updatedHistory;
	}
}
