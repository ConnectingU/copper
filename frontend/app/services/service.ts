import axios, { AxiosInstance } from 'axios';

export class Service {
	protected headers = {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
	}

	protected baseURL: string = 'http://localhost:8500/api';
	protected http: AxiosInstance = axios.create({
		withCredentials: true,
		headers: this.headers,
	});
}