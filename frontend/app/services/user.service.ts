import http from "./AxiosInstance";

export async function signup(email: string, password: string, username: string) {
	const body = { email, password, username};

	try {
		return await http.post('http://localhost:8500/api/user', body);
	} catch(error) {
		console.error(error);
		throw error;
	}
}
