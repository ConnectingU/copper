import Cookies from 'js-cookie';
import { Service } from "./service";

class PostService extends Service {
	async createPost(title: string, content: string, image: string, communityId: number, userId: number) {
		const config = {
			headers: {
				'Authorization': `Bearer ${Cookies.get('auth')}`,
			}
		}

		const body = { title, content, image, communityId, userId};
		try {
			return await this.http.post(`${this.baseURL}/post`, body, config);
		} catch(error) {
			console.error(error);
			throw error;
		}
	}
}

const postService = new PostService();
export default postService as PostService;
