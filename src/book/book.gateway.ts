import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { BookService } from './book.service';
import { Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // Allow all origins for WebSocket connections
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
})
export class BookGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;

  constructor() {}

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('addBook')
  handleAddBook(@MessageBody() data: any): void {
    this.server.emit('addBook', data);
  }

  @SubscribeMessage('updateBook')
  handleUpdateBook(@MessageBody() data: any): void {
    this.server.emit('updateBook', data);
  }
  
}
