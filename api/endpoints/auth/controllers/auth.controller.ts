import { JsonController, Post, UseBefore, Req, Res, HttpError } from 'routing-controllers';
import { Service } from 'typedi';
import { Logger } from '../../../libs/logger';
import { AuthService } from '../services/auth.service';
import { Request, Response } from 'express';
import {json as bodyParserJson} from 'body-parser';

@JsonController('/auth')
@Service()
export class AuthController {
	constructor(public _authService: AuthService) { }

	@Post('/token')
	@UseBefore(bodyParserJson())
	public async token(@Req() req: Request, @Res() res: Response) {
		try {
			const resp = await this._authService.token(req);
			Logger.info('Controller: token', 'response:' + JSON.stringify(resp));
			res.cookie('auth', resp, { maxAge: 43200000, Secure: false });
			return res.send({token: resp});
		} catch (error) {
			Logger.error('Controller: User', 'ErrorInfo:' + JSON.stringify(error));
			if (error instanceof HttpError) {
				return res.status(error.httpCode).json(error);
			}
			return res.status(error);
		}
	}
}