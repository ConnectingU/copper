import Cookies from 'js-cookie';
import { Service } from './service';

class PostService extends Service {
	async createPost(title: string, content: string, communityId: number, userId: number) {
		const serviceConfig = {
			headers: {
				'Authorization': `Bearer ${Cookies.get('auth')}`,
			}
		}

		const body = { title, content, communityId, userId};
		try {
			return await this.http.post(`${this.baseURL}/post`, body, serviceConfig);
		} catch(error) {
			console.error(error);
			throw error;
		}
	}

	async updatePost(postId?: number, title?: string, content?: string, image?: File) {
		const serviceConfig = {
			headers: {
				'Authorization': `Bearer ${Cookies.get('auth')}`,
				'Content-Type': 'multipart/form-data',
			}
		}
		
		const formData = new FormData();
		formData.append('title', title ?? '');
		formData.append('content', content ?? '');
		if (image) {
			formData.append('image', image);
		}
		
		try {
			return await this.http.patch(`${this.baseURL}/post/${postId}`, formData, serviceConfig);
		} catch(error) {
			console.error(error);
			throw error;
		}

	}
}

const postService = new PostService();
export default postService as PostService;
