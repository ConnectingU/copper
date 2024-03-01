import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

export class Service {
	headers = {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
	}

	public baseURL: string = 'http://localhost:8500/api';
	public http: AxiosInstance = axios.create({
		withCredentials: true,
		headers: this.headers,
	});
}