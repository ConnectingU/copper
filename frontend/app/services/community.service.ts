import http from "./AxiosInstance";
import Cookies from 'js-cookie';

export async function getCommunity(communityId: number) {
	const JWT = Cookies.get('auth');
	try {
		const config = {
			'headers': {
				'Authorization': `Bearer ${JWT}`
			}
		};

		const resp = await http.get(`http://localhost:8500/api/community/${communityId}`, config);
		return resp.data
	} catch(error) {
		console.error(error);
		throw error;
	}
}