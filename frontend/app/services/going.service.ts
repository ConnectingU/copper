import Cookies from "js-cookie";
import { Service } from "./service";
import config from "~/config";

class GoingService extends Service {
	async createGoing(userId: number, eventId: number) {
		const body = {userId, eventId};
		const serviceConfig = {
			headers: {
				'Authorization': `Bearer ${Cookies.get('auth')}`,
			}
		}
		try {
			const resp = await this.http.post(`${this.baseURL}/going`, body, serviceConfig);
			return resp.data;
		} catch(error) {
			console.error(error);
			throw error;
		}
	}

	async deleteGoing(goingId: number) {
		const serviceConfig = {
			headers: {
				'Authorization': `Bearer ${Cookies.get('auth')}`,
			}
		}

		try {	
			const resp = await this.http.delete(`${this.baseURL}/going/${goingId}`, serviceConfig);
			return resp.data
		} catch(error) {
			console.error(error);
			throw error;
		}
	}
}

const goingService = new GoingService();
export default goingService as GoingService;
