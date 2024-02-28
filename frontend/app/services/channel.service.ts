import Cookies from "js-cookie";
import http from "./AxiosInstance";

export async function getChannel(channelId: number) {
	const JWT = Cookies.get('auth');
	try {
		const config = {
			'headers': {
				'Authorization': `Bearer ${JWT}`
			}
		};

		const resp = await http.get(`http://localhost:8500/api/channel/${channelId}`, config);
		return resp.data
	} catch(error) {
		console.error(error);
		throw error;
	}
}
