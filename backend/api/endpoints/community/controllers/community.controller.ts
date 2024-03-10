import { JsonController, Post, Get, Patch, UseBefore, Req, Res, Authorized, HttpError, UploadedFile, Delete } from 'routing-controllers';
import { Service } from 'typedi';
import { Logger } from '../../../libs/logger';
import { CommunityService } from '../services/community.service';
import { Request, Response } from 'express';
import {json as bodyParserJson} from 'body-parser';
import * as multer from 'multer';
import * as path from 'path';

const fileUploadOptions = {
	storage: multer.diskStorage({
		destination: (req: any, file: any, cb: any) => {
			cb(null, path.resolve(__dirname, '../../../../uploads/community-avatars/'));
		},
		filename: (req: any, file: any, cb: any) => {
			cb(null, req.params.id + '-avatar.png');
		}
	}),
	limits: {
		fieldNameSize: 255,
		fileSize: 1024 * 1024 * 2
	}
};

@JsonController('/community')
@Service()
export class CommunityController {
	constructor(public service: CommunityService) { }

	@Authorized()
	@Post()
	@UseBefore(bodyParserJson())
	public async create(@Req() req: Request, @Res() res: Response) {
		try {
			const resp = await this.service.create(req);
			Logger.info('Controller: Community - create', 'Response:' + JSON.stringify(resp));
			return res.json(resp);
		} catch (error) {
			Logger.error('Controller: Community - create', 'ErrorInfo:' + JSON.stringify(error));
			if (error instanceof HttpError) {
				res.status(error.httpCode).json(error);
			}
			return res.status(error);
		}
	}

	@Authorized()
	@Get('/all/:name')
	@UseBefore(bodyParserJson())
	public async all(@Req() req: Request, @Res() res: Response) {
		try {
			const resp = await this.service.all(req);
			Logger.info('Controller: Community - all', 'Response:' + JSON.stringify(resp));
			return res.json(resp);
		} catch (error) {
			Logger.error('Controller: Community - all', 'ErrorInfo:' + JSON.stringify(error));
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
			Logger.info('Controller: Community - read', 'Response:' + JSON.stringify(resp));
			return res.send(resp);
		} catch (error) {
			Logger.error('Controller: Community - read', 'ErrorInfo:' + JSON.stringify(error));
			if (error instanceof HttpError) {
				res.status(error.httpCode).json(error);
			}
			return res.status(error);
		}
	}

	@Authorized()
	@Patch('/:id')
	@UseBefore(bodyParserJson())
	public async update(@Req() req: Request, @Res() res: Response, @UploadedFile('avatar', { options: fileUploadOptions}) file) {
		try {
			const resp = await this.service.update(req);
			Logger.info('Controller: Community - update', 'Response:' + JSON.stringify(resp) + 'File:' + JSON.stringify(file));
			return res.json(resp);
		} catch (error) {
			Logger.error('Controller: Community - update', 'ErrorInfo:' + JSON.stringify(error));
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
			Logger.info('Controller: Community - delete', 'Response:' + JSON.stringify(resp));
			return res.json(resp);
		} catch (error) {
			Logger.error('Controller: Community - delete', 'ErrorInfo:' + JSON.stringify(error));
			if (error instanceof HttpError) {
				res.status(error.httpCode).json(error);
			}
			return res.status(error);
		}
	}
}
