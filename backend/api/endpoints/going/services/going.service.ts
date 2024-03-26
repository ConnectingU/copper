import { Service } from 'typedi';
import { db } from '../../../app';
import { NotAcceptableError } from 'routing-controllers';

@Service()
export class GoingService {
	constructor() {}

	async create(req) {
		const { userId, eventId } = req.body;

		if (!userId || !eventId) {
			throw new NotAcceptableError('Missing required fields!');
		}

		const checkGoing = await db.going.findFirst({
			where: {
				userId,
				eventId,
			}
		});

		if (checkGoing) {
			throw new NotAcceptableError('User has already going this event.');
		}

		const going = await db.going.create({
			data: {
				userId,
				eventId,
			}
		});

		return going;
	}

	async all(req) {
		const eventId: number = +req.params.id;
		const goings = await db.going.findMany({
			where: {
				eventId,
			},
			select: {
				id: true,
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
			}
		});

		return goings;
	}

	async delete(req) {
		const goingId: number = +req.params.id;
		console.log(goingId)
		await db.going.delete({
			where: {
				id: goingId,
			}
		});
	}
}