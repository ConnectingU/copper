import Cookies from 'js-cookie';
import { Service } from './service';

class CommunityService extends Service {
	async getCommunity(communityId: number) {
		const serviceConfig = {
			headers: {
				'Authorization': `Bearer ${Cookies.get('auth')}`,
			}
		}

		try {
			const resp = await this.http.get(`${this.baseURL}/community/${communityId}`, serviceConfig);
			return resp.data
		} catch(error) {
			console.error(error);
			throw error;
		}
	}

	async createCommunity(name: string, bio: string) {
		const body = {name, bio};
		const serviceConfig = {
			headers: {
				'Authorization': `Bearer ${Cookies.get('auth')}`,
			}
		}

		try {
			const resp = await this.http.post(`${this.baseURL}/community`, body, serviceConfig);
			return resp.data;
		} catch(error) {
			console.error(error);
			throw error;
		}
	}

	async updateCommunity(communityId?: number, name?: string, bio?: string, image?: File) {
		const serviceConfig = {
			headers: {
				'Authorization': `Bearer ${Cookies.get('auth')}`,
				'Content-Type': 'multipart/form-data',
			}
		}
		
		const formData = new FormData();
		formData.append('name', name ?? '');
		formData.append('bio', bio ?? '');
		if (image) {
			formData.append('avatar', image);
		}
		
		try {
			return await this.http.patch(`${this.baseURL}/community/${communityId}`, formData, serviceConfig);
		} catch(error) {
			console.error(error);
			throw error;
		}

	}
}

const communityService = new CommunityService();
export default communityService as CommunityService;