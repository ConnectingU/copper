import Cookies from "js-cookie";
import { Service } from "./service";

class LikeService extends Service {
	async createLike(userId: number, postId: number) {
		const body = {userId, postId};
		const serviceConfig = {
			headers: {
				'Authorization': `Bearer ${Cookies.get('auth')}`,
			}
		}
		try {
			const resp = await this.http.post(`${this.baseURL}/like`, body, serviceConfig);
			return resp.data;
		} catch(error) {
			console.error(error);
			throw error;
		}
	}

	async deleteLike(likeId: number) {
		const serviceConfig = {
			headers: {
				'Authorization': `Bearer ${Cookies.get('auth')}`,
			}
		}

		try {	
			const resp = await this.http.delete(`${this.baseURL}/like/${likeId}`, serviceConfig);
			return resp.data
		} catch(error) {
			console.error(error);
			throw error;
		}
	}
}

const likeService = new LikeService();
export default likeService as LikeService;
