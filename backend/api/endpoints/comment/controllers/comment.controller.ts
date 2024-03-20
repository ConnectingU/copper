import { JsonController, Post, Get, Patch, UseBefore, Req, Res, Authorized, HttpError, Delete } from 'routing-controllers';
import { Service } from 'typedi';
import { Logger } from '../../../libs/logger';
import { CommentService } from '../services/comment.service';
import { Request, Response } from 'express';
import {json as bodyParserJson} from 'body-parser';

@JsonController('/comment')
@Service()
export class CommentController {
	constructor(public service: CommentService) { }

	@Authorized()
	@Post()
	@UseBefore(bodyParserJson())
	public async create(@Req() req: Request, @Res() res: Response) {
		try {
			const resp = await this.service.create(req);
			Logger.info('Controller: Comment - create', 'Response:' + JSON.stringify(resp));
			return res.json(resp);
		} catch (error) {
			Logger.error('Controller: Comment - create', 'ErrorInfo:' + JSON.stringify(error));
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
			console.log('please')
			const resp = await this.service.all(req);
			Logger.info('Controller: Comment - all', 'Response:' + JSON.stringify(resp));
			return res.send(resp);
		} catch (error) {
			Logger.error('Controller: Comment - all', 'ErrorInfo:' + JSON.stringify(error));
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
			Logger.info('Controller: Comment - read', 'Response:' + JSON.stringify(resp));
			return res.send(resp);
		} catch (error) {
			Logger.error('Controller: Comment - read', 'ErrorInfo:' + JSON.stringify(error));
			if (error instanceof HttpError) {
				res.status(error.httpCode).json(error);
			}
			return res.status(error);
		}
	}

	@Authorized()
	@Patch('/:id')
	@UseBefore(bodyParserJson())
	public async update(@Req() req: Request, @Res() res: Response) {
		try {
			const resp = await this.service.update(req);
			Logger.info('Controller: Comment - update', 'Response:' + JSON.stringify(resp));
			return res.json(resp);
		} catch (error) {
			Logger.error('Controller: Comment - update', 'ErrorInfo:' + JSON.stringify(error));
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
			Logger.info('Controller: Comment - delete', 'Response:' + JSON.stringify(resp));
			return res.json(resp);
		} catch (error) {
			Logger.error('Controller: Comment - delete', 'ErrorInfo:' + JSON.stringify(error));
			if (error instanceof HttpError) {
				res.status(error.httpCode).json(error);
			}
			return res.status(error);
		}
	}
}
