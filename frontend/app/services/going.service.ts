import Cookies from "js-cookie";
import { Service } from "./service";

class GoingService extends Service {
	async createGoing(userId: number, eventId: number) {
		const body = {userId, eventId};
		const config = {
			headers: {
				'Authorization': `Bearer ${Cookies.get('auth')}`,
			}
		}
		try {
			const resp = await this.http.post('http://localhost:8500/api/going', body, config);
			return resp.data;
		} catch(error) {
			console.error(error);
			throw error;
		}
	}

	async deleteGoing(goingId: number) {
		const config = {
			headers: {
				'Authorization': `Bearer ${Cookies.get('auth')}`,
			}
		}

		try {	
			const resp = await this.http.delete(`http://localhost:8500/api/going/${goingId}`, config);
			return resp.data
		} catch(error) {
			console.error(error);
			throw error;
		}
	}
}

const goingService = new GoingService();
export default goingService as GoingService;
