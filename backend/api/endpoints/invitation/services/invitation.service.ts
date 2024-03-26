import { Service } from 'typedi';
import { db } from '../../../app';
import { NotAcceptableError, NotFoundError } from 'routing-controllers';

@Service()
export class InvitationService {
	constructor() {}

	async create(req) {
		const { username, communityId } = req.body;

		if (!username || !communityId) {
			throw new NotAcceptableError('Missing required fields!');
		}

		const user = await db.user.findUnique({
			where:{
				username,
			},
			select:{
				id: true,
			}
		})

		const invitation = await db.invitation.create({
			data: {
				userId: user.id,
				communityId,
			}
		});

		return invitation;
	}

	async all(req){
		const userId: number = +req.params.userId;
		const communityId: number = +req.params.communityId;

		if (communityId) {
			const invitations = await db.invitation.findMany({
				where: { communityId },
				select: {
					id: true,
					userId: true,
					user: {
						select: {
							displayName: true,
						}
					},
					communityId: true,
					community: {
						select: {
							name: true,
							avatarUrl: true,
						}
					},
					accepted: true,
					declined: true,
					createdAt: true,
				},
			});

			if (!invitations) {
				throw new NotFoundError('No users found.');
			}
	
			return invitations;
		}

		// If the all method is called without a community id than is must be called with a userId
		const invitations = await db.invitation.findMany({
			where: { 
				userId,
				accepted: false,
				declined: false,
			},
			select:{
				id: true,
				userId: true,
				user: {
					select: {
						displayName: true,
					}
				},
				communityId: true,
				community: {
					select: {
						name: true,
						avatarUrl: true,
					}
				},
				accepted: true,
				declined: true,
				createdAt: true,
			}
		});

		if (!invitations) {
			throw new NotFoundError('No users found.');
		}

		return invitations;
	}

	async read(req) {
		const invitationId: number = +req.params.invitationId;
		const invitation = await db.invitation.findUnique({
			where: { id: invitationId },
			select: {
				id: true,
				userId: true,
				user: {
					select: {
						displayName: true,
					}
				},
				communityId: true,
				community: {
					select: {
						name: true,
						avatarUrl: true,
					}
				},
				accepted: true,
				declined: true,
				createdAt: true,
				updatedAt: true,
			}
		});

		if (!invitation) {
			throw new NotFoundError('invitation not found.');
		}

		return invitation;
	}
	
	async update(req) {
		const id: number = +req.params.id;
		const body = req.body;

		const invitation = await db.invitation.update({
			where: {
				id,
			},
			data: {
				accepted: body.accepted || undefined,
				declined: body.declined || undefined,
			}
		});

		return invitation;
	}

	async delete(req) {
		const invitationId: number = +req.params.id;

		await db.invitation.delete({
			where: {
				id: invitationId,
			}
		});
	}
}
