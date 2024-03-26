import { JsonController, Post, Get, Patch, UseBefore, Req, Res, Authorized, HttpError, UploadedFile, Delete } from 'routing-controllers';
import { Service } from 'typedi';
import { Logger } from '../../../libs/logger';
import { EventService } from '../services/event.service';
import { Request, Response } from 'express';
import {json as bodyParserJson} from 'body-parser';
import * as multer from 'multer';
import * as path from 'path';

const fileUploadOptions = {
	storage: multer.diskStorage({
		destination: (req: any, file: any, cb: any) => {
			cb(null, path.resolve(__dirname, '../../../../uploads/event-images/'));
		},
		filename: (req: any, file: any, cb: any) => {
			cb(null, req.params.id + '-image.png');
		}
	}),
	limits: {
		fieldNameSize: 255,
		fileSize: 1024 * 1024 * 5
	}
};

@JsonController('/event')
@Service()
export class EventController {
	constructor(public service: EventService) { }

	@Authorized()
	@Post()
	@UseBefore(bodyParserJson())
	public async create(@Req() req: Request, @Res() res: Response) {
		try {
			const resp = await this.service.create(req);
			Logger.info('Controller: EventController - create', 'Response:' + JSON.stringify(resp));
			return res.json(resp);
		} catch (error) {
			Logger.error('Controller: EventController - create', 'ErrorInfo:' + JSON.stringify(error));
			if (error instanceof HttpError) {
				res.status(error.httpCode).json(error);
			}
			return res.status(error);
		}
	}

	@Authorized()
	@Get('/all/:id')
	@UseBefore(bodyParserJson())
	public async all(@Req() req: Request, @Res() res: Response) {
		try {
			const resp = await this.service.read(req);
			Logger.info('Controller: EventController - all', 'Response:' + JSON.stringify(resp));
			return res.send(resp);
		} catch (error) {
			Logger.error('Controller: EventController - all', 'ErrorInfo:' + JSON.stringify(error));
			if (error instanceof HttpError) {
				res.status(error.httpCode).json(error);
			}
			return res.status(error);
		}
	}

	@Authorized()
	@Get('/:id')
	@UseBefore(bodyParserJson())
	public async read(@Req() req: Request, @Res() res: Response) {
		try {
			const resp = await this.service.read(req);
			Logger.info('Controller: EventController - read', 'Response:' + JSON.stringify(resp));
			return res.send(resp);
		} catch (error) {
			Logger.error('Controller: EventController - read', 'ErrorInfo:' + JSON.stringify(error));
			if (error instanceof HttpError) {
				res.status(error.httpCode).json(error);
			}
			return res.status(error);
		}
	}

	@Authorized()
	@Patch('/:id')
	@UseBefore(bodyParserJson())
	public async update(@Req() req: Request, @Res() res: Response, @UploadedFile('image', { options: fileUploadOptions}) file) {
		try {
			const resp = await this.service.update(req);
			Logger.info('Controller: EventController - update', 'Response:' + JSON.stringify(resp) + 'File:' + JSON.stringify(file));
			return res.json(resp);
		} catch (error) {
			Logger.error('Controller: EventController - update', 'ErrorInfo:' + JSON.stringify(error));
			if (error instanceof HttpError) {
				res.status(error.httpCode).json(error);
			}
			return res.status(error);
		}
	}

	@Authorized()
	@Delete('/:id')
	@UseBefore(bodyParserJson())
	public async delete(@Req() req: Request, @Res() res: Response) {
		try {
			const resp = await this.service.delete(req);
			Logger.info('Controller: EventController - delete', 'Response:' + JSON.stringify(resp));
			return res.json(resp);
		} catch (error) {
			Logger.error('Controller: EventController - delete', 'ErrorInfo:' + JSON.stringify(error));
			if (error instanceof HttpError) {
				res.status(error.httpCode).json(error);
			}
			return res.status(error);
		}
	}
}
