import { verify } from '@zaubrik/djwt';
import { key } from '../utils/apiKey.ts';
import { Context } from '@oak/oak';

export const authourized = async (ctx: Context, next: any) => {
	try {
		const headers: Headers = ctx.request.headers;
		const authorization = headers.get('Authorization');
		if (!authorization) {
			ctx.response.status = 401;
			ctx.response.body = {
				message: 'You are not authorized to access this route',
			};
			return;
		}
		const jwt = authorization.split(' ')[1];

		if (!jwt) {
			ctx.response.status = 401;
			ctx.response.body = {
				message: 'You are not authorized to access this route',
			};
			return;
		}
		const payload = await verify(jwt, key);

		if (!payload) {
			throw new Error('!payload');
		}
		await next();
	} catch (error) {
		ctx.response.status = 401;
		ctx.response.body = {
			message: 'You are not authorized to access this route',
		};
		return;
	}
};
