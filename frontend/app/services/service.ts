import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import config from '~/config';

export class Service {
	protected headers = {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
	}

	protected baseURL: string = `${config.api.baseUrl}/api`;
	protected http: AxiosInstance = axios.create({
		withCredentials: true,
		headers: this.headers,
	});
}