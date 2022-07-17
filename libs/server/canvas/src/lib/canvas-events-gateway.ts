import { Logger } from '@nestjs/common';
import { MessageBody, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CanvasService } from './server-canvas.service';

type SocketPayload<T> = { canvasId: string } & T;

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

  constructor(private canvasService: CanvasService) {}

  afterInit() {
    this.logger.log('Initialized.');
  }

  @SubscribeMessage('send-draw')
  handleDraw(@MessageBody() payload: SocketPayload<Record<string, unknown>>) {
    this.server.to(payload.canvasId).emit('receive-draw', payload.data);
  }

  @SubscribeMessage('send-clear')
  handleClear(@MessageBody() payload: SocketPayload<Record<string, unknown>>) {
    this.logger.log(`[${payload.canvasId}] CANVAS CLEARED`);
    this.server.to(payload.canvasId).emit('receive-clear');
  }

  @SubscribeMessage('send-image')
  handleImage(@MessageBody() payload: SocketPayload<Record<string, unknown>>) {
    this.logger.log(`[${payload.canvasId}] CANVAS REPAINT WITH IMAGE`);
    this.server.to(payload.canvasId).emit('receive-image', payload.data);
  }

  @SubscribeMessage('join-room')
  handleJoinRoom(client: Socket, payload: SocketPayload<{ email: string }>) {
    this.logger.log(`[${payload.canvasId}] ROOM JOIN <${payload.email}>`);
    this.canvasService.addContributor(payload.canvasId, payload.email);
    client.join(payload.canvasId);
    client.emit('joined-room', payload.email);
  }

  @SubscribeMessage('leave-room')
  handleLeaveRoom(client: Socket, payload: SocketPayload<{ email: string }>) {
    this.logger.log(`[${payload.canvasId}] ROOM LEAVE <${payload.email}>`);
    client.leave(payload.canvasId);
    client.emit('left-room', payload.email);
  }
}
