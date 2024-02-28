import http from "./AxiosInstance";
import Cookies from 'js-cookie';

export async function sendMessage(content: string, channelId: number, userId: number) {
	const body = { content, channelId, userId};
	const JWT = Cookies.get('auth');
	try {
		const config = {
			'headers': {
				'Authorization': `Bearer ${JWT}`
			}
		};
		return await http.post('http://localhost:8500/api/message', body, config);
	} catch(error) {
		console.error(error);
		throw error;
	}
}