import Cookies from "js-cookie";
import { Service } from "./service";

class LikeService extends Service {
	async createLike(userId: number, postId: number) {
		const body = {userId, postId};
		const config = {
			headers: {
				'Authorization': `Bearer ${Cookies.get('auth')}`,
			}
		}
		try {
			const resp = await this.http.post('http://localhost:8500/api/like', body, config);
			return resp.data;
		} catch(error) {
			console.error(error);
			throw error;
		}
	}

	async deleteLike(likeId: number) {
		const config = {
			headers: {
				'Authorization': `Bearer ${Cookies.get('auth')}`,
			}
		}

		try {	
			const resp = await this.http.delete(`http://localhost:8500/api/like/${likeId}`, config);
			return resp.data
		} catch(error) {
			console.error(error);
			throw error;
		}
	}
}

const likeService = new LikeService();
export default likeService as LikeService;
