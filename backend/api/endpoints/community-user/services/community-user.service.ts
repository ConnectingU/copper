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

		const communityUser = await db.communityUser.create({
			data: {
				userId,
				communityId,

			}
		});

		return communityUser;
	}

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
		const communityId: number = +req.params.id;
		const body = req.body;

		const community = await db.community.update({
			where: {
				id: communityId,
			},
			data: {
				avatarUrl: body.avatarUrl || undefined,
				bio: body.bio || undefined,
			}
		});

		return community;
	}
}
