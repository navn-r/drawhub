import { Logger } from '@nestjs/common';
import { MessageBody, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

type SocketPayload = { canvasId: string } & Record<string, unknown>;

/**
 * @see https://docs.nestjs.com/websockets/gateways
 */
@WebSocketGateway()
export class CanvasEventsGateway implements OnGatewayInit {
  /**
   * Send message to every client can be used using `server`
   * eg. this.server.emit('Message to every client', data)
   */
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('CanvasEventGateway');

  afterInit() {
    this.logger.log('Initialized.');
  }

  @SubscribeMessage('send-draw')
  handleDraw(@MessageBody() payload: SocketPayload) {
    this.server.to(payload.canvasId).emit('recieve-draw', payload.data);
  }

  @SubscribeMessage('send-clear')
  handleClear(@MessageBody() payload: SocketPayload) {
    this.logger.log(`[${payload.canvasId}] CANVAS CLEARED`);
    this.server.to(payload.canvasId).emit('recieve-clear');
  }

  @SubscribeMessage('join-room')
  handleJoinRoom(client: Socket, payload: SocketPayload) {
    this.logger.log(`[${payload.canvasId}] ROOM JOIN <${payload.email}>`);
    client.join(payload.canvasId);
    client.emit('joined-room', payload.email);
  }

  @SubscribeMessage('leave-room')
  handleLeaveRoom(client: Socket, payload: SocketPayload) {
    this.logger.log(`[${payload.canvasId}] ROOM LEAVE <${payload.email}>`);
    client.leave(payload.canvasId);
    client.emit('left-room', payload.email);
  }
}
