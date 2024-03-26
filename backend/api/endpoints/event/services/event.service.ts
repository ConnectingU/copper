import { Service } from 'typedi';
import { db } from '../../../app';
import { NotAcceptableError, NotFoundError } from 'routing-controllers';

@Service()
export class EventService {
	constructor() {}

	async create(req) {
		const { title, description, image, communityId, fromDate, toDate } = req.body;

		if (!title || !description || !communityId || !fromDate || !toDate) {
			throw new NotAcceptableError('Missing required fields!');
		}

		const event = await db.event.create({
			data: {
				title,
				description,
				image,
				communityId,
				fromDate,
				toDate,
			}
		});

		return event;
	}
	
	async all(req) {
		const communityId: number = +req.params.id;
		const events = await db.event.findMany({
			where: {
				communityId,
			},
			select: {
				id: true,
				title: true,
				description: true,
				image: true,
				going: {
					select: {
						id: true,
						userId: true,
					}
				},
				createdAt: true,
				updatedAt: true,
			}
		});

		return events;
	}

	async read(req) {
		const eventId: number = +req.params.id;
		const event = await db.event.findUnique({
			where: { id: eventId },
			select: {
				id: true,
				description: true,
				image: true,
				fromDate: true,
				toDate: true,
				createdAt: true,
				updatedAt: true,
			}
		});

		if (!event) {
			throw new NotFoundError('Event not found.');
		}

		return event;
	}
	
	async update(req) {
		const eventId: number = +req.params.id;
		const body = req.body;
		const imageUrl = req.file ? `${eventId}-image.png` : undefined;

		const post = await db.event.update({
			where: { id: eventId },
			data: {
				title: body.title || undefined,
				description: body.description || undefined,
				image: imageUrl || undefined,
				fromDate: body.fromDate || undefined,
				toDate: body.toDate || undefined,
			}
		});

		return post;
	}

	async delete(req) {
		const eventId: number = +req.params.id;

		await db.event.delete({
			where: { id: eventId }
		});
	}
}
