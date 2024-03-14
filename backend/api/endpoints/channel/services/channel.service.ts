import { Service } from 'typedi';
import { db } from '../../../app';
import { NotAcceptableError, NotFoundError } from 'routing-controllers';

@Service()
export class ChannelService {
	constructor() {}

	async create(req) {
		const { name, communityId } = req.body;

		if (!name || !communityId ) {
			throw new NotAcceptableError('Missing required fields!');
		}

		const channel = await db.channel.create({
			data: {
				name,
				communityId,
			}
		});

		return channel;
	}

	async all(req) {
		const communityId: number = +req.params.id;
		const channels = await db.channel.findMany({
			where: {
				communityId,
			},
			select: {
				id: true,
				name: true,
				createdAt: true,
				updatedAt: true,
			}
		});

		return channels;
	}

	async read(req) {
		const channelId: number = +req.params.id;
		const channel = await db.channel.findUnique({
			where: { id: channelId },
			select: {
				id: true,
				name: true,
				messages: {
					select: {
						id: true,
						content: true,
						user: {
							select: {
								id: true,
								displayName: true,
								username: true,
								avatarUrl: true,
							}
						},
						createdAt: true,
						updatedAt: true,
					},
					orderBy: {
						createdAt: 'desc'
					},
				},
				createdAt: true,
				updatedAt: true,
			}
		});

		if (!channel) {
			throw new NotFoundError('Message not found.');
		}

		return channel;
	}
	
	async update(req) {
		const channelId: number = +req.params.id;
		const body = req.body;

		const communityUser = await db.communityUser.update({
			where: {
				id: channelId,
			},
			data: {
				role: body.name || undefined,
			}
		});

		return communityUser;
	}

	async delete(req) {
		const channelId: number = +req.params.id;

		await db.channel.delete({
			where: {
				id: channelId,
			}
		});
	}
}
