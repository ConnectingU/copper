import { Service } from 'typedi';
import { db } from '../../../app';
import { NotAcceptableError, NotFoundError } from 'routing-controllers';

@Service()
export class CommunityService {
	constructor() {}

	async create(req) {
		const { name, bio } = req.body;

		if (!name) {
			throw new NotAcceptableError('Missing required fields!');
		}

		const nameUsed = await db.community.findUnique({ where: { name } });

		if (nameUsed) {
			throw new NotAcceptableError('Name already in use!');
		}

		const community = await db.community.create({
			data: {
				name,
				bio
			}
		});

		return community;
	}

	async read(req) {
		const communityId: number = +req.params.id;
		const community = await db.community.findUnique({
			where: { id: communityId },
			select: {
				name: true,
				bio: true,
				avatarUrl: true,
				createdAt: true,
			}
		});

		if (!community) {
			throw new NotFoundError('Community not found.');
		}

		return community;
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
