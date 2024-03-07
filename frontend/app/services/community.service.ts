import Cookies from "js-cookie";
import { Service } from "./service";

class CommunityService extends Service {
	async getCommunity(communityId: number) {
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

	async createCommunity(name: string, bio: string) {
		const body = {name, bio};
		const config = {
			headers: {
				'Authorization': `Bearer ${Cookies.get('auth')}`,
			}
		}

		try {
			const resp = await this.http.post(`${this.baseURL}/community`, body, config);
			return resp.data;
		} catch(error) {
			console.error(error);
			throw error;
		}
	}
}

const communityService = new CommunityService();
export default communityService as CommunityService;