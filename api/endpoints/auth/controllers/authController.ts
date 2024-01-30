import { JsonController, Post, Body } from 'routing-controllers';
import { Service } from 'typedi';
import { Logger } from '../../../libs/logger';
import { AuthService } from '../services/authService';

@JsonController('/auth')
@Service()
export class AuthController {
	constructor(public _authService: AuthService) { }

	@Post('/register')
	public async register(@Body() body): Promise<any> {
		try {
			const resp = await this._authService.registerExecutor(body);
			Logger.info('Controller: ping', 'response:' + JSON.stringify(resp));
			return Promise.resolve(resp);
		} catch (error) {
			Logger.error('Controller: ping', 'errorInfo:' + JSON.stringify(error));
			return Promise.reject(error);
		}
	}
}