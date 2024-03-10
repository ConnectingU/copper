import { JsonController, Get, Req, Res, HttpError } from 'routing-controllers';
import { Service } from 'typedi';
import { Logger } from '../../../libs/logger';
import { PingService } from '../services/ping.service';
import { Request, Response } from 'express';

@JsonController()
@Service()
export class PingController {
	constructor(public service: PingService) { }
	
	@Get('/ping')
	public async find(@Req() req: Request, @Res() res: Response) {
		try {
			const resp = await this.service.find(req);
			Logger.info('Controller: PingController - find', 'response:' + JSON.stringify(resp));
			return res.json(resp);
		} catch (error) {
			Logger.error('Controller: PingController - find', 'ErrorInfo:' + JSON.stringify(error));
			if (error instanceof HttpError) {
				res.status(error.httpCode).json(error);
			}
			return res.status(error);
		}
	}
}
