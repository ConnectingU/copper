import Cookies from "js-cookie";
import { Service } from "./service";

class InvitationService extends Service {
	async createInvitation(username: string, communityId: number) {
		const body = {username, communityId};
		const config = {
			headers: {
				'Authorization': `Bearer ${Cookies.get('auth')}`,
			}
		}

		try {
			console.log('hello')
			const resp = await this.http.post(`${this.baseURL}/invitation`, body, config);
			return resp.data;
		} catch(error) {
			console.error(error);
			throw error;
		}
	}
	
	async updateInvitation(id?: number, accepted?: boolean, declined?: boolean) {
		const config = {
			headers: {
				'Authorization': `Bearer ${Cookies.get('auth')}`,
			}
		}

        const body = {accepted, declined};
		try {
			return await this.http.patch(`${this.baseURL}/invitation/${id}`, body, config);
		} catch(error) {
			console.error(error);
			throw error;
		}
	}

	async getAllInvitations(userId?: number, communityId?: number){
		const config = {
			headers: {
				'Authorization': `Bearer ${Cookies.get('auth')}`,
			}
		}

		try {
			const resp = await this.http.get(`${this.baseURL}/invitation/all/${userId}/${communityId}`, config);
			return resp.data;
		} catch(error) {
			console.error(error);
			throw error;
		}
	}
}

const invitationService = new InvitationService();
export default invitationService as InvitationService;
