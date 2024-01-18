import axios from 'axios';
import { Logger } from '../../../libs/logs/logger';
import { Service } from 'typedi';
import { PingObject } from '../models/pingModel';

@Service()
export class PingService {
	constructor() {}

	async pingExecutor(): Promise<PingObject> {
		try {
			const pingResponse: PingObject = await axios.get('http://worldtimeapi.org/api/timezone/America/St_Johns');
			return Promise.resolve(pingResponse.data.datetime);
		} catch (error) {
			Logger.error('Service: ping', 'errorInfo:' + JSON.stringify(error));
			return Promise.reject(error);
		}
	}
}