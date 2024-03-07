import Cookies from "js-cookie";
import { Service } from "./service";

class ChannelService extends Service {
	async createChannel(name: string, communityId: number) {
		const body = {name, communityId};
		const config = {
			headers: {
				'Authorization': `Bearer ${Cookies.get('auth')}`,
			}
		}
		try {
			const resp = await this.http.post('http://localhost:8500/api/channel', body, config);
			return resp.data;
		} catch(error) {
			console.error(error);
			throw error;
		}
	}

	async getChannel(channelId: number) {
		const config = {
			headers: {
				'Authorization': `Bearer ${Cookies.get('auth')}`,
			}
		}

		try {	
			const resp = await this.http.get(`http://localhost:8500/api/channel/${channelId}`, config);
			return resp.data
		} catch(error) {
			console.error(error);
			throw error;
		}
	}
}

const channelService = new ChannelService();
export default channelService as ChannelService;
