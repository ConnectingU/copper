import { Service } from 'typedi';
import { db } from '../../../app';
import { NotAcceptableError, NotFoundError } from 'routing-controllers';

@Service()
export class CommunityUserService {
	constructor() {}

	async create(req) {
		const { userId, communityId } = req.body;

		if (!userId || !communityId) {
			throw new NotAcceptableError('Missing required fields!');
		}

		const userExists = await db.communityUser.findMany({
			where: {
				userId,
				communityId
			} 
		});

		if (userExists.length >= 1) {
			throw new NotAcceptableError('User already in community!');
		}

		const communityUser = await db.communityUser.create({
			data: {
				userId,
				communityId,

			}
		});

		return communityUser;
	}

	async all(req){
		const communityId: number = +req.params.id;
		const communityUsers = await db.communityUser.findMany({
			where: { communityId: communityId},
			select:{
				id: true,
				user: true,
				role: true,
			}
		});

		if (!communityUsers) {
			throw new NotFoundError('No users found.');
		}

		return communityUsers;
	};

	async read(req) {
		const communityUserId: number = +req.params.id;
		const communityUser = await db.communityUser.findUnique({
			where: { id: communityUserId },
			select: {
				user: {
					select: {
						id: true,
						email: true,
						avatarUrl: true,
						displayName: true,
						username: true,
						bio: true,
					}
				},
				createdAt: true,
				updatedAt: true,
			}
		});

		if (!communityUser) {
			throw new NotFoundError('CommunityUser not found.');
		}

		return communityUser;
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
