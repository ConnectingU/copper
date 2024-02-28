import { OnConnect, SocketController, ConnectedSocket, OnDisconnect, MessageBody, OnMessage, NspParam } from 'socket-controllers';
import { Service } from 'typedi';
import { Logger } from '../../../libs/logger';
import { MessageService } from '../services/messages.service';

@SocketController('/message/:channelId')
@Service()
export class MessageController {
	@OnConnect()
	connection(@ConnectedSocket() socket: any) {
		Logger.info('Socket-Controller: Message', 'Client connected: ' +  socket.id);
	}

	@OnDisconnect()
	disconnect(@ConnectedSocket() socket: any) {
		Logger.info('Socket-Controller: Message', 'Client disconnected: ' +  socket.id);
	}

	@OnMessage('message')
	message(@ConnectedSocket() socket: any, @MessageBody() message: any, @NspParam('channelId') channelId: any) {
		MessageService.handleMessage(socket, message, channelId);
	}
}