import { JsonController, Post, Get, Patch, UseBefore, Req, Res, Authorized } from 'routing-controllers';
import { Service } from 'typedi';
import { Logger } from '../../../libs/logger';
import { UserService } from '../services/user.service';
import { Request, Response } from 'express';
import {json as bodyParserJson} from 'body-parser';

@JsonController('/user')
@Service()
export class AuthController {
	constructor(public _userService: UserService) { }

	@Post()
	@UseBefore(bodyParserJson())
	public async create(@Req() req: Request, @Res() res: Response) {
		try {
			const resp = await this._userService.create(req);
			Logger.info('Controller: User', 'Response:' + JSON.stringify(resp));
			return res.json(resp);
		} catch (error) {
			Logger.error('Controller: User', 'ErrorInfo:' + JSON.stringify(error));
			return res.json(error);
		}
	}

	@Authorized()
	@Get('/:id')
	@UseBefore(bodyParserJson())
	public async read(@Req() req: Request, @Res() res: Response) {
		try {
			const resp = await this._userService.read(req);
			Logger.info('Controller: User', 'Response:' + JSON.stringify(resp));
			return res.json(resp);
		} catch (error) {
			Logger.error('Controller: User', 'ErrorInfo:' + JSON.stringify(error));
			return res.json(error);
		}
	}

	@Authorized()
	@Patch('/:id')
	@UseBefore(bodyParserJson())
	public async update(@Req() req, @Res() res) {
		try {
			const resp = await this._userService.update(req);
			Logger.info('Controller: token', 'response:' + JSON.stringify(resp));
			return res.json(resp);
		} catch (error) {
			Logger.error('Controller: token', 'errorInfo:' + JSON.stringify(error));
			return res.json(error);
		}
	}
}
