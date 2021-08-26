import socketIo from 'socket.io';
import { productosService } from './productService';
import { messagesService } from './messagesService'; 


class SocketService {
  //Recibe el server http y crea el server de sockets
  initWsService(server) {
    if (!this.myWSServer) {
      this.myWSServer = socketIo(server);
      this.myWSServer.on('connection', (socket) => {
        console.log('Nueva conexion Hecha');

        socket.on('new-product', (data) => {
          console.log(data); 
          productosService.addProduct(data) 

          this.myWSServer.emit('products', productosService.getProducts());
        });

        socket.on('askProducts', () => {
          this.myWSServer.emit('products', productosService.getProducts());
        });

        socket.on('new-message', (data) => {
          console.log(data)     
          const newMessage = messagesService.saveMessages(data);
          this.myWSServer.emit('updateChat', newMessage);
        });

        socket.on('askMessages', () => {
          // const messages = messagesService.getMessages()
          // console.log(messages); 
          socket.emit('updateChat', messagesService.getMessages());
        });
        
      });
    }

    return this.myWSServer;
  }

  //devuelve el WSService
  getServer() {
    return this.myWSServer;
  }
}

export const socketService = new SocketService();