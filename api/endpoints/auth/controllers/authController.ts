import { JsonController, Post, UseBefore, Req, Res } from 'routing-controllers';
import { Service } from 'typedi';
import { Logger } from '../../../libs/logger';
import { AuthService } from '../services/authService';
import { Request, Response } from 'express';
import {json as bodyParserJson} from 'body-parser';

@JsonController('/auth')
@Service()
export class AuthController {
	constructor(public _authService: AuthService) { }

	@Post('/register')
	@UseBefore(bodyParserJson())
	public async register(@Req() req: Request, @Res() res: Response) {
		try {
			const resp = await this._authService.registerExecutor(req.body);
			Logger.info('Controller: register', 'response:' + JSON.stringify(resp));
			return res.json(resp);
		} catch (error) {
			Logger.error('Controller: register', 'errorInfo:' + JSON.stringify(error));
			return res.json(error);
		}
	}

	@Post('/token')
	@UseBefore(bodyParserJson())
	public async token(@Req() req, @Res() res) {
		try {
			const resp = await this._authService.tokenExecutor(req.body);
			Logger.info('Controller: token', 'response:' + JSON.stringify(resp));
			return res.json({token: resp});
		} catch (error) {
			Logger.error('Controller: token', 'errorInfo:' + JSON.stringify(error));
			return res.json(error);
		}
	}
}