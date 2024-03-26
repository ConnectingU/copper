import { Service } from 'typedi';
import { db } from '../../../app';

@Service()
export class GlobalFeedService {
	constructor() {}

	async read(req) {
		const userId: number = +req.params.id;
		const filter: string = req.params.filter;
		const communities = await db.communityUser.findMany({
			where: { userId },
			select: {
				communityId: true,
			}
		});
		const communityIds = [];

		communities.map((element) => {
			communityIds.push(element.communityId);
		});
		
		switch (filter) {
			case 'posts':
				const posts = await db.post.findMany({
					where: { communityId: { in: communityIds}},
					select: {
						id: true,
						title: true,
						content: true,
						image: true,
						user: {
							select: {
								displayName: true,
								username: true,
								avatarUrl: true,
							}
						},
						likes: {
							select: {
								id: true,
								userId: true,
							}
						},
						community: {
							select: {
								id: true,
								name: true,
							}
						},
						createdAt: true,
					},
					orderBy: {
						createdAt: 'desc'
					}
				});

				return posts;
			
			case 'events':
				const events = await db.event.findMany({
					where: {
						communityId: { in: communityIds},
						toDate: {
							gte: new Date().toISOString()
						}
					},
					select: {
						id: true,
						title: true,
						description: true,
						image: true,
						community: {
							select: {
								id: true,
								name: true,
								avatarUrl: true,
							}
						},
						going: {
							select: {
								id: true,
								userId: true,
							}
						},
						fromDate: true,
						toDate: true,
						createdAt: true,
					},
					orderBy: {
						createdAt: 'desc'
					}
				});

				return events;

			default:
				return [];
		}
	}
}
