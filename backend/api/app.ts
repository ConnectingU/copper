import 'reflect-metadata';
import 'module-alias/register';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import Container from 'typedi';
import { Logger } from './libs/logger';
import { useExpressServer, useContainer as routingContainer } from 'routing-controllers';
import { SocketControllers } from 'socket-controllers';
import * as http from 'http';
import { PrismaClient } from '@prisma/client';
import { TokenVerification } from './middleware/token-verification';
import * as cookieParser from 'cookie-parser';
import { Server } from 'socket.io';

export const db = new PrismaClient();

const baseDir = __dirname;
const expressApp = express();

routingContainer(Container);

useExpressServer(expressApp, {
	routePrefix: process.env.API_ROOT,
	defaultErrorHandler: false,
	controllers: [baseDir + '/endpoints/**/controllers/*{.js,.ts}'],
	authorizationChecker: TokenVerification.verify,
	cors: {
		origin:'*',
		credentials: true,
	},
});

expressApp.use(express.static('uploads'));
expressApp.use(cookieParser);
expressApp.use(bodyParser.urlencoded({ extended: false }));
expressApp.use(bodyParser.json());

const server = http.createServer(expressApp);
const io = new Server(server, {
	cors: {
		origin: '*',
	},
});

new SocketControllers({
	io,
	container: Container,
	controllers: [baseDir + '/sockets/**/controllers/*{.js,.ts}'],
});

server.listen(process.env.PORT, () => {
	Logger.info('Server', 'Application running on', `${process.env.HOSTNAME}:${process.env.PORT}${process.env.API_ROOT}`);
});

process.on('unhandledRejection', (error) => {
	Logger.error('Server', 'unhandledRejectionError :', `${error}`);
});
