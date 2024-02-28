import http from "./AxiosInstance";
import Cookies from 'js-cookie';

export async function signup(email: string, password: string, username: string) {
	const body = { email, password, username};

	try {
		return await http.post('http://localhost:8500/api/user', body);
	} catch(error) {
		console.error(error);
		throw error;
	}
}

export async function getUser(userId: number) {
	const JWT = Cookies.get('auth');
	try {
		const config = {
			'headers': {
				'Authorization': `Bearer ${JWT}`
			}
		};

		const user = await http.get(`http://localhost:8500/api/user/${userId}`, config);
		return user.data;
	} catch(error) {
		console.error(error);
		throw error;
	}
}


export async function getCommunities(userId: number) {
	const JWT = Cookies.get('auth');
	try {
		const config = {
			'headers': {
				'Authorization': `Bearer ${JWT}`
			}
		};

		const user = await http.get(`http://localhost:8500/api/user/${userId}`, config);
		const communityMemberships = user.data.communityMembers;
		const commmunites = communityMemberships.map((membership: any) => membership.community);
		return commmunites;
	} catch(error) {
		console.error(error);
		throw error;
	}
}
