import { JsonController, Get, Patch, UseBefore, Req, Res, Authorized, HttpError } from 'routing-controllers';
import { Service } from 'typedi';
import { Logger } from '../../../libs/logger';
import { HistoryService } from '../services/history.service';
import { Request, Response } from 'express';
import {json as bodyParserJson} from 'body-parser';

@JsonController('/history')
@Service()
export class ChannelController {
	constructor(public service: HistoryService) { }

	@Authorized()
	@Get('/:userId/:channelId')
	@UseBefore(bodyParserJson())
	public async read(@Req() req: Request, @Res() res: Response) {
		try {
			const resp = await this.service.read(req);
			Logger.info('Controller: Channel - read', 'Response:' + JSON.stringify(resp));
			return res.send(resp);
		} catch (error) {
			Logger.error('Controller: Channel - read', 'ErrorInfo:' + JSON.stringify(error));
			if (error instanceof HttpError) {
				res.status(error.httpCode).json(error);
			}
			return res.status(error);
		}
	}

	@Authorized()
	@Patch('/:userId/:channelId')
	@UseBefore(bodyParserJson())
	public async update(@Req() req: Request, @Res() res: Response) {
		try {
			const resp = await this.service.update(req);
			Logger.info('Controller: Channel - update', 'Response:' + JSON.stringify(resp));
			return res.json(resp);
		} catch (error) {
			Logger.error('Controller: Channel - update', 'ErrorInfo:' + JSON.stringify(error));
			if (error instanceof HttpError) {
				res.status(error.httpCode).json(error);
			}
			return res.status(error);
		}
	}
}
