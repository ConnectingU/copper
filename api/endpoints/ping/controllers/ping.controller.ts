import { JsonController, Get, Req, Res, Authorized } from 'routing-controllers';
import { Service } from 'typedi';
import { Logger } from '../../../libs/logger';
import { PingService } from '../services/ping.service';

@JsonController()
@Service()
export class PingController {
	constructor(public _pingService: PingService) { }
	
	@Authorized()
	@Get('/ping')
	public async ping(@Req() req, @Res() res): Promise<string> {
		try {
			const resp = `${await this._pingService.pingExecutor()}: Success`;
			Logger.info('Controller: ping', 'response:' + JSON.stringify(resp));
			return res.json(resp);
		} catch (error) {
			Logger.error('Controller: ping', 'errorInfo:' + JSON.stringify(error));
			return res.json(error);
		}
	}
}
