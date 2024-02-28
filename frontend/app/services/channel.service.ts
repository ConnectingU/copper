import Cookies from "js-cookie";
import http from "./AxiosInstance";

export async function getChannel(channelId: number) {
	const JWT = Cookies.get('auth');
	console.log(JWT)
	try {
		const config = {
			'headers': {
				'Authorization': `Bearer ${JWT}`
			}
		};

		console.log(config)

		const resp = await http.get(`http://localhost:8500/api/channel/${channelId}`, config);
		return resp.data
	} catch(error) {
		console.error(error);
		throw error;
	}
}
