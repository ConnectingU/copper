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
				bio,
				channels: {
					create: {
						name: 'general'
					}
				}
			}
		});

		return community;
	}
	
	async all(req){
		const communityName: string = req.params.name;
		const community = await db.community.findMany({
			where: { name: {contains: communityName}},
			select:{
				id: true,
				name: true,
				bio: true,
				avatarUrl: true,
			}
		});

		if (!community) {
			throw new NotFoundError('Communities not found.');
		}

		return community;
	};

	async read(req) {
		const communityId: number = +req.params.id;
		const community = await db.community.findUnique({
			where: { id: communityId },
			select: {
				name: true,
				bio: true,
				avatarUrl: true,
				posts: {
					select: {
						title: true,
						content: true,
						image: true,
						user: {
							select: {
								displayName: true,
								username: true,
								avatarUrl: true,
							}
						}
					}
				},
				channels: true,
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
		const avatarUrl = req.file ? `${communityId}-avatar.png` : undefined;

		const community = await db.community.update({
			where: {
				id: communityId,
			},
			data: {
				avatarUrl: avatarUrl || undefined,
				bio: body.bio || undefined,
			}
		});

		return community;
	}

	async delete(req) {
		const communityId: number = +req.params.id;

		await db.community.delete({
			where: {
				id: communityId,
			}
		});
	}
}
