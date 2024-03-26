import Cookies from 'js-cookie';
import { Service } from "./service";

class EventService extends Service {
	async createEvent(title: string, description: string, communityId: number, fromDate: Date, toDate: Date) {
		const config = {
			headers: {
				'Authorization': `Bearer ${Cookies.get('auth')}`,
			}
		}

		const body = { title, description, communityId, fromDate, toDate };
		try {
			return await this.http.post(`${this.baseURL}/event`, body, config);
		} catch(error) {
			console.error(error);
			throw error;
		}
	}

	async updateEvent(eventId?: number, title?: string, description?: string, image?: File) {
		const config = {
			headers: {
				'Authorization': `Bearer ${Cookies.get('auth')}`,
				'Content-Type': 'multipart/form-data',
			}
		}
		
		const formData = new FormData();
		formData.append('title', title ?? '');
		formData.append('description', description ?? '');
		if (image) {
			formData.append('image', image);
		}
		
		try {
			return await this.http.patch(`${this.baseURL}/event/${eventId}`, formData, config);
		} catch(error) {
			console.error(error);
			throw error;
		}

	}
}

const eventService = new EventService();
export default eventService as EventService;
