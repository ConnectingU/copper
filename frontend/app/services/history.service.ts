import Cookies from 'js-cookie';
import { Service } from './service';

class HistoryService extends Service {
	async getHistory(userId: number, channelId: number) {
		const config = {
			headers: {
				'Authorization': `Bearer ${Cookies.get('auth')}`,
			}
		};

		try {
			const resp = await this.http.get(`${this.baseURL}/history/${userId}/${channelId}`, config);
			return resp.data;
		} catch(error) {
			console.error(error);
			throw error;
		}
	}

	async updateHistory(userId: number, channelId: number, lastVisited: Date) {
		const body = {lastVisited};
		const config = {
			headers: {
				'Authorization': `Bearer ${Cookies.get('auth')}`,
			}
		};

		try {
			const resp = await this.http.patch(`${this.baseURL}/history/${userId}/${channelId}`, body, config);
			return resp.data;
		} catch(error) {
			console.error(error);
			throw error;
		}
	}
}

const historyService = new HistoryService();
export default historyService as HistoryService;
