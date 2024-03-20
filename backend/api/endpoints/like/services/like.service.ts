import { Service } from 'typedi';
import { db } from '../../../app';
import { NotAcceptableError } from 'routing-controllers';

@Service()
export class LikeService {
	constructor() {}

	async create(req) {
		const { userId, postId } = req.body;

		if (!userId || !postId) {
			throw new NotAcceptableError('Missing required fields!');
		}

		const checkLike = await db.like.findFirst({
			where: {
				userId,
				postId,
			}
		});

		if (checkLike) {
			throw new NotAcceptableError('User has already liked this post.');
		}

		const like = await db.like.create({
			data: {
				userId,
				postId,
			}
		});

		return like;
	}

	async all(req) {
		const postId: number = +req.params.id;
		const likes = await db.like.findMany({
			where: {
				postId,
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

		return likes;
	}

	async delete(req) {
		const likeId: number = +req.params.id;

		await db.like.delete({
			where: {
				id: likeId,
			}
		});
	}
}