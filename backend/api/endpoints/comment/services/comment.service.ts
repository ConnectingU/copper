import { Service } from 'typedi';
import { db } from '../../../app';
import { NotAcceptableError, NotFoundError } from 'routing-controllers';

@Service()
export class CommentService {
	constructor() {}

	async create(req) {
		const { userId, postId, content } = req.body;

		if (!userId || !postId || !content) {
			throw new NotAcceptableError('Missing required fields!');
		}

		const comment = await db.comment.create({
			data: {
				content,
				userId,
				postId
			},
			select: {
				content: true,
				user: {
					select: {
						id: true,
						displayName: true,
						username: true,
						avatarUrl: true,
					}
				},
				postId: true,
				createdAt: true,
			}
		});
		return comment;
	}

	async all(req) {
		const postId: number = +req.params.id;
		const comments = await db.comment.findMany({
			where: {
				postId,
			},
			select: {
				id: true,
				content: true,
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
		return comments;
	}

	async read(req) {
		const commentId: number = +req.params.id;
		const comment = await db.comment.findUnique({
			where: { id: commentId },
			select: {
				id: true,
				content: true,
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

		if (!comment) {
			throw new NotFoundError('Comment not found.');
		}

		return comment;
	}
	
	async update(req) {
		const commentId: number = +req.params.id;
		const body = req.body;

		const comment = await db.comment.update({
			where: {
				id: commentId,
			},
			data: {
				content: body.role || undefined,
			}
		});

		return comment;
	}

	async delete(req) {
		const commentId: number = +req.params.id;

		await db.comment.delete({
			where: {
				id: commentId,
			}
		});
	}
}