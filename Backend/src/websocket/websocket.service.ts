import { Injectable } from '@nestjs/common';
import {
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class WebsocketService implements OnGatewayInit {
  @WebSocketServer()
  private server: Server;

  afterInit(server: any) {
    //throw new Error('Method not implemented');
    //console.log('server =  ', this.server);
  }
}
