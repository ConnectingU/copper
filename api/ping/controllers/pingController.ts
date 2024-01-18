import { JsonController, Get } from 'routing-controllers';
import { Service } from 'typedi';
import { Logger } from '../../../libs/logs/logger';
import { PingService } from '../services/pingService';

@JsonController()
@Service()
export class PingController {
	constructor(public _pingService: PingService) { }

	@Get('/ping')
	public async ping(): Promise<string> {
		try {
			const resp = `${await this._pingService.pingExecutor()}: Success`;
			Logger.info('Controller: ping', 'response:' + JSON.stringify(resp));
			return Promise.resolve(resp);
		} catch (error) {
			Logger.error('Controller: ping', 'errorInfo:' + JSON.stringify(error));
			return Promise.reject(error);
		}
	}
}