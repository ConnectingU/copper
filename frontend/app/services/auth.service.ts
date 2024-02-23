import http from "./AxiosInstance";

export async function login(email: string, password: string) {
	const body = { email, password};

	try {
		return await http.post('http://localhost:8500/api/auth/token', body);
	} catch(error) {
		console.error(error);
		throw error;
	}
}
