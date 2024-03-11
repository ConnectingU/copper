import { JsonController, Post, Get, Patch, UseBefore, Req, Res, Authorized, HttpError, UploadedFile, Delete } from 'routing-controllers';
import { Service } from 'typedi';
import { Logger } from '../../../libs/logger';
import { PostService } from '../services/post.service';
import { Request, Response } from 'express';
import {json as bodyParserJson} from 'body-parser';
import * as multer from 'multer';
import * as path from 'path';

const fileUploadOptions = {
	storage: multer.diskStorage({
		destination: (req: any, file: any, cb: any) => {
			cb(null, path.resolve(__dirname, '../../../../uploads/post-images/'));
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

@JsonController('/post')
@Service()
export class PostController {
	constructor(public service: PostService) { }

	@Authorized()
	@Post()
	@UseBefore(bodyParserJson())
	public async create(@Req() req: Request, @Res() res: Response) {
		try {
			const resp = await this.service.create(req);
			Logger.info('Controller: PostController - create', 'Response:' + JSON.stringify(resp));
			return res.json(resp);
		} catch (error) {
			Logger.error('Controller: PostController - create', 'ErrorInfo:' + JSON.stringify(error));
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
			Logger.info('Controller: PostController - all', 'Response:' + JSON.stringify(resp));
			return res.send(resp);
		} catch (error) {
			Logger.error('Controller: PostController - all', 'ErrorInfo:' + JSON.stringify(error));
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
			Logger.info('Controller: PostController - read', 'Response:' + JSON.stringify(resp));
			return res.send(resp);
		} catch (error) {
			Logger.error('Controller: PostController - read', 'ErrorInfo:' + JSON.stringify(error));
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
			Logger.info('Controller: PostController - update', 'Response:' + JSON.stringify(resp) + 'File:' + JSON.stringify(file));
			return res.json(resp);
		} catch (error) {
			Logger.error('Controller: PostController - update', 'ErrorInfo:' + JSON.stringify(error));
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
			Logger.info('Controller: PostController - delete', 'Response:' + JSON.stringify(resp));
			return res.json(resp);
		} catch (error) {
			Logger.error('Controller: PostController - delete', 'ErrorInfo:' + JSON.stringify(error));
			if (error instanceof HttpError) {
				res.status(error.httpCode).json(error);
			}
			return res.status(error);
		}
	}
}
