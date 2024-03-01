import Cookies from 'js-cookie';
import { Service } from "./service";

class UserService extends Service {
	async signup(email: string, password: string, username: string) {
		const body = { email, password, username};

		try {
			return await this.http.post(`${this.baseURL}/user`, body);
		} catch(error) {
			console.error(error);
			throw error;
		}
	}

	async getUser(userId: number) {
		const config = {
			headers: {
				'Authorization': `Bearer ${Cookies.get('auth')}`,
			}
		}

		try {
			const user = await this.http.get(`${this.baseURL}/user/${userId}`, config);
			return user.data;
		} catch(error) {
			console.error(error);
			throw error;
		}
	}

	async getCommunities(userId: number) {
		const config = {
			headers: {
				'Authorization': `Bearer ${Cookies.get('auth')}`,
			}
		}

		try {
			const user = await this.http.get(`${this.baseURL}/user/${userId}`, config);
			const communityMemberships = user.data.communityMembers;
			const commmunites = communityMemberships.map((membership: any) => membership.community);
			return commmunites;
		} catch(error) {
			console.error(error);
			throw error;
		}
	}
}

const userService = new UserService();
export default userService as UserService;
