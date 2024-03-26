import Cookies from "js-cookie";
import { Service } from "./service";

class CommunityUserService extends Service {
	async createCommunityUser(userId: number, communityId: number) {
		const body = {userId, communityId};
		const serviceConfig = {
			headers: {
				'Authorization': `Bearer ${Cookies.get('auth')}`,
			}
		}

		try {
			const resp = await this.http.post(`${this.baseURL}/community-user`, body, serviceConfig);
			return resp.data;
		} catch(error) {
			console.error(error);
			throw error;
		}
	}
	
	async getCommunityUser(communityId: number) {
		const serviceConfig = {
			headers: {
				'Authorization': `Bearer ${Cookies.get('auth')}`,
			}
		}

		try {	
			const resp = await this.http.get(`${this.baseURL}/community/${communityId}`, serviceConfig);
			return resp.data
		} catch(error) {
			console.error(error);
			throw error;
		}
	}

	async removeCommunityUser(communityUserId: number, communityId: number) {
		const config = {
			headers: {
				'Authorization': `Bearer ${Cookies.get('auth')}`,
			}
		}
		try {
			const resp = await this.http.delete(`${this.baseURL}/community-user/${communityUserId}/${communityId}`, config);
			return resp.data;
		} catch(error) {
			console.error(error);
			throw error;
		}
	}
}

const communityUserService = new CommunityUserService();
export default communityUserService as CommunityUserService;
