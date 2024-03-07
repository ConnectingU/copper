import Cookies from "js-cookie";
import { Service } from "./service";

class CommunityUserService extends Service {
	async createCommunityUser(userId: number, communityId: number) {
		const body = {userId, communityId};
		const config = {
			headers: {
				'Authorization': `Bearer ${Cookies.get('auth')}`,
			}
		}

		try {
			const resp = await this.http.post(`${this.baseURL}/community-user`, body, config);
			return resp.data;
		} catch(error) {
			console.error(error);
			throw error;
		}
	}
	
	async getCommunityUser(communityId: number) {
		const config = {
			headers: {
				'Authorization': `Bearer ${Cookies.get('auth')}`,
			}
		}

		try {	
			const resp = await this.http.get(`${this.baseURL}/community/${communityId}`, config);
			return resp.data
		} catch(error) {
			console.error(error);
			throw error;
		}
	}
}

const communityUserService = new CommunityUserService();
export default communityUserService as CommunityUserService;
