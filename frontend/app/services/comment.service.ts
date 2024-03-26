import Cookies from 'js-cookie';
import { Service } from './service';
import config from '~/config';

class CommentService extends Service {
	async createComment(content: string, userId: number, postId: number) {
		const body = {content, userId, postId};
		const serviceConfig = {
			headers: {
				'Authorization': `Bearer ${Cookies.get('auth')}`,
			}
		}
		try {
			const resp = await this.http.post(`${this.baseURL}/comment`, body, serviceConfig);
			return resp.data;
		} catch(error) {
			console.error(error);
			throw error;
		}
	}

	async getComments(postId: number) {
		const serviceConfig = {
			headers: {
				'Authorization': `Bearer ${Cookies.get('auth')}`,
			}
		}

		try {	
			const resp = await this.http.get(`${this.baseURL}/comment/all/${postId}`, serviceConfig);
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
