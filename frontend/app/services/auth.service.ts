import { Service } from "./service";

class AuthService extends Service {
	async login(email: string, password: string) {
		const body = { email, password};

		try {
			return await this.http.post(`${this.baseURL}/auth/token`, body);
		} catch(error) {
			console.error(error);
			throw error;
		}
	}
}

const authService = new AuthService();
export default authService as AuthService;
