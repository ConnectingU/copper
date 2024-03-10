import { JsonController, Post, Get, Patch, UseBefore, Req, Res, Authorized, HttpError, UploadedFile } from 'routing-controllers';
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
			// const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    		// cb(null, file.fieldname + '-' + uniqueSuffix + '.png');
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
	constructor(public _communityService: CommunityService) { }

	@Authorized()
	@Post()
	@UseBefore(bodyParserJson())
	public async create(@Req() req: Request, @Res() res: Response) {
		try {
			const resp = await this._communityService.create(req);
			Logger.info('Controller: Community', 'Response:' + JSON.stringify(resp));
			return res.json(resp);
		} catch (error) {
			Logger.error('Controller: Community', 'ErrorInfo:' + JSON.stringify(error));
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
			const resp = await this._communityService.read(req);
			Logger.info('Controller: Community', 'Response:' + JSON.stringify(resp));
			return res.send(resp);
		} catch (error) {
			Logger.error('Controller: Community', 'ErrorInfo:' + JSON.stringify(error));
			if (error instanceof HttpError) {
				res.status(error.httpCode).json(error);
			}
			return res.status(error);
		}
	}

	@Authorized()
	@Patch('/:id')
	@UseBefore(bodyParserJson())
	public async update(@Req() req, @Res() res, @UploadedFile('avatar', { options: fileUploadOptions}) file) {
		console.log(req.file)
		try {
			const resp = await this._communityService.update(req);
			Logger.info('Controller: Auth', 'Response:' + JSON.stringify(resp));
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
