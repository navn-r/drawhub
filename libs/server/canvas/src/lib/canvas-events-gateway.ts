import { Logger } from '@nestjs/common';
import { MessageBody, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

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

  @SubscribeMessage('example-event')
  doSomething(@MessageBody() data: unknown): unknown {
    this.logger.log(data);

    // TODO: Investigate what returning does vs. emitting ourselves
    this.server.emit('example-event', data);
    return data;
  }
}
