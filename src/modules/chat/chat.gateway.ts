import { OnEvent } from '@nestjs/event-emitter';
import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Chat } from './entities/chat.schema';
// require('dotenv').config();
@WebSocketGateway(4000, {
  namespace: 'chat',
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string): string {
    return data;
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('connected', client.id);
  }

  handleDisconnect(client: any) {
    console.log('disconnected');
  }

  @SubscribeMessage('createRoom')
  createRoom(@MessageBody() room: string, @ConnectedSocket() client: Socket) {
    if (room) {
      client.join(room);
      client.to(room).emit('roomCreated', room);
      console.log('room created', room);
      return room;
    }
  }

  @SubscribeMessage('callUser')
  callUser(
    @MessageBody()
    body: {
      conversation_id: string;
      receiver: string;
      call_type: 'audio' | 'video';
    },
    @ConnectedSocket() client: Socket,
  ) {
    client.to(body.conversation_id).emit('receiveCall', body);
    console.log('call initiated', body);
  } 
  
  @SubscribeMessage('answerCall')
  answerCall(
    @MessageBody()
    body: {
      conversation_id: string;
      receiver: string;
      call_type: 'audio' | 'video';
    },
    @ConnectedSocket() client: Socket,
  ) {
    client.to(body.conversation_id).emit('callAnswered', body);
    console.log('call initiated', body);
  }

  // hangUp

  @SubscribeMessage('hangUp')
  hangUp(
    @MessageBody()
    body: {
      conversation_id: string;
      receiver: string;
      call_type: 'audio' | 'video';
    },
    @ConnectedSocket() client: Socket,
  ) {
    client.to(body.conversation_id).emit('callEnded', body);
    console.log('call ended', body);
  }

  @OnEvent('new_chat')
  handleNewChatEvent(payload: Chat, @ConnectedSocket() client: Socket) {
    this.server.to(String(payload.conversation_id)).emit('new_chat', payload);
  }
}
