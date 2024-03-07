import { Service } from 'typedi';
import { db } from '../../../app';
import { NotAcceptableError, NotFoundError } from 'routing-controllers';

@Service()
export class PostService {
	constructor() {}

	async create(req) {
		const { title, content, image, communityId, userId } = req.body;

		if (!title || !content || !communityId || !userId) {
			throw new NotAcceptableError('Missing required fields!');
		}

		const post = await db.post.create({
			data: {
				title,
				content,
				image,
				communityId,
				userId,
			}
		});

		return post;
	}
	
	async all(req) {
		const communityId: number = +req.params.id;
		const posts = await db.post.findMany({
			where: {
				communityId,
			},
			select: {
				id: true,
				title: true,
				content: true,
				image: true,
				user: {
					select: {
						username: true,
						displayName: true,
						avatarUrl: true,
					}
				},
				createdAt: true,
				updatedAt: true,
			}
		});

		return posts;
	}

	async read(req) {
		const postId: number = +req.params.id;
		const post = await db.post.findUnique({
			where: { id: postId },
			select: {
				id: true,
				content: true,
				image: true,
				createdAt: true,
				updatedAt: true,
			}
		});

		if (!post) {
			throw new NotFoundError('post not found.');
		}

		return post;
	}
	
	async update(req) {
		const postId: number = +req.params.id;
		const body = req.body;

		const post = await db.post.update({
			where: { id: postId },
			data: {
				title: body.title || undefined,
				content: body.content || undefined,
			}
		});

		return post;
	}

	async delete(req) {
		const postId: number = +req.params.id;

		await db.post.delete({
			where: { id: postId }
		});
	}
}
