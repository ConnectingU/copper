import Cookies from "js-cookie";
import { Service } from "./service";
import config from "~/config";

class ChannelService extends Service {
	async createChannel(name: string, communityId: number) {
		const body = {name, communityId};
		const serviceConfig = {
			headers: {
				'Authorization': `Bearer ${Cookies.get('auth')}`,
			}
		}
		try {
			const resp = await this.http.post(`${this.baseURL}/channel`, body, serviceConfig);
			return resp.data;
		} catch(error) {
			console.error(error);
			throw error;
		}
	}

	async getChannel(channelId: number) {
		const serviceConfig = {
			headers: {
				'Authorization': `Bearer ${Cookies.get('auth')}`,
			}
		}

		try {	
			const resp = await this.http.get(`${this.baseURL}/channel/${channelId}`, serviceConfig);
			return resp.data
		} catch(error) {
			console.error(error);
			throw error;
		}
	}
}

const channelService = new ChannelService();
export default channelService as ChannelService;
