import http from "./AxiosInstance";
import Cookies from 'js-cookie';

export async function getCommunity(communityId: number) {
	const JWT = Cookies.get('auth');
	console.log(JWT);
	try {
		const config = {
			'headers': {
				'Authorization': `Bearer ${JWT}`
			}
		};

		const resp = await http.get(`http://localhost:8500/api/community/${communityId}`, config);
		console.log(resp)
		return resp.data
	} catch(error) {
		console.error(error);
		throw error;
	}
}