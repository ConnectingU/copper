import { JsonController, Post, Get, Patch, UseBefore, Req, Res, Authorized, HttpError, UploadedFile } from 'routing-controllers';
import { Service } from 'typedi';
import { Logger } from '../../../libs/logger';
import { UserService } from '../services/user.service';
import { Request, Response } from 'express';
import {json as bodyParserJson} from 'body-parser';
import * as multer from 'multer';
import * as path from 'path';

const fileUploadOptions = {
	storage: multer.diskStorage({
		destination: (req: any, file: any, cb: any) => {
			cb(null, path.resolve(__dirname, '../../../../uploads/user-avatars/'));
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

@JsonController('/user')
@Service()
export class UserController {
	constructor(public service: UserService) { }

	@Post()
	@UseBefore(bodyParserJson())
	public async create(@Req() req: Request, @Res() res: Response) {
		try {
			const resp = await this.service.create(req);
			Logger.info('Controller: User', 'Response:' + JSON.stringify(resp));
			return res.json(resp);
		} catch (error) {
			Logger.error('Controller: User', 'ErrorInfo:' + JSON.stringify(error));
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
			Logger.info('Controller: User', 'Response:' + JSON.stringify(resp));
			return res.send(resp);
		} catch (error) {
			Logger.error('Controller: User', 'ErrorInfo:' + JSON.stringify(error));
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
			Logger.info('Controller: Auth', 'Response:' + JSON.stringify(resp) + 'File:' + JSON.stringify(file));
			return res.json(resp);
		} catch (error) {
			Logger.error('Controller: Auth', 'ErrorInfo:' + JSON.stringify(error));
			if (error instanceof HttpError) {
				res.status(error.httpCode).json(error);
			}
			return res.status(error);
		}
	}
}
