import { JsonController, Get, Req, Res, HttpError, Action } from 'routing-controllers';
import { Service } from 'typedi';
import { Logger } from '../../../libs/logger';
import { PingService } from '../services/ping.service';

@JsonController()
@Service()
export class PingController {
	constructor(public _pingService: PingService) { }
	
	@Get('/ping')
	public async find(@Req() req, @Res() res, action: Action) {
		try {
			const resp = await this._pingService.find(req);
			Logger.info('Controller: ping', 'response:' + JSON.stringify(resp));
			return res.json(resp);
		} catch (error) {
			Logger.error('Controller: User', 'ErrorInfo:' + JSON.stringify(error));
			if (error instanceof HttpError) {
				res.status(error.httpCode).json(error);
			}
			return res.status(error);
		}
	}
}
