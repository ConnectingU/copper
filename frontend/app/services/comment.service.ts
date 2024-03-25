import Cookies from 'js-cookie';
import { Service } from './service';

class CommentService extends Service {
	async createComment(content: string, userId: number, postId: number) {
		const body = {content, userId, postId};
		const config = {
			headers: {
				'Authorization': `Bearer ${Cookies.get('auth')}`,
			}
		}
		try {
			const resp = await this.http.post('http://localhost:8500/api/comment', body, config);
			return resp.data;
		} catch(error) {
			console.error(error);
			throw error;
		}
	}

	async getComments(postId: number) {
		const config = {
			headers: {
				'Authorization': `Bearer ${Cookies.get('auth')}`,
			}
		}

		try {	
			const resp = await this.http.get(`http://localhost:8500/api/comment/all/${postId}`, config);
			console.log('data pls',resp)
			return resp.data
		} catch(error) {
			console.error(error);
			throw error;
		}
	}
}

const commentService = new CommentService();
export default commentService as CommentService;
