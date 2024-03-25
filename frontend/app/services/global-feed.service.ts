import Cookies from 'js-cookie';
import { Service } from './service';

class GlobalFeedService extends Service {
	async getGlobalFeed(userId: number) {
		const config = {
			headers: {
				'Authorization': `Bearer ${Cookies.get('auth')}`,
			}
		}

		try {
			const resp = await this.http.get(`${this.baseURL}/global-feed/${userId}`, config);
			return resp.data;
		} catch(error) {
			console.error(error);
			throw error;
		}
	}
}

const globalFeedService = new GlobalFeedService();
export default globalFeedService as GlobalFeedService;
