import Cookies from 'js-cookie';
import { Service } from './service';

class MessageService extends Service {
	async sendMessage(content: string, channelId: number, userId: number) {
		const config = {
			headers: {
				'Authorization': `Bearer ${Cookies.get('auth')}`,
			}
		}

		const body = { content, channelId, userId};
		try {
			return await this.http.post(`${this.baseURL}/message`, body, config);
		} catch(error) {
			console.error(error);
			throw error;
		}
	}
}

const messageService = new MessageService();
export default messageService as MessageService;
