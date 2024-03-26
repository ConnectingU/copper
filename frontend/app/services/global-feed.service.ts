import Cookies from 'js-cookie';
import { Service } from './service';

class GlobalFeedService extends Service {
	async getGlobalPostFeed(userId: number) {
		const serviceConfig = {
			headers: {
				'Authorization': `Bearer ${Cookies.get('auth')}`,
			}
		}

		try {
			const resp = await this.http.get(`${this.baseURL}/global-feed/${userId}/posts`, serviceConfig);
			return resp.data;
		} catch(error) {
			console.error(error);
			throw error;
		}
	}

	async getGlobalEventFeed(userId: number) {
		const serviceConfig = {
			headers: {
				'Authorization': `Bearer ${Cookies.get('auth')}`,
			}
		}

		try {
			const resp = await this.http.get(`${this.baseURL}/global-feed/${userId}/events`, serviceConfig);
			return resp.data;
		} catch(error) {
			console.error(error);
			throw error;
		}
	}
}

const globalFeedService = new GlobalFeedService();
export default globalFeedService as GlobalFeedService;
