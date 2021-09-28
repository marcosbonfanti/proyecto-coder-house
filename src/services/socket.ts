import socketIo from 'socket.io';
import { messagesPersistencia } from '../persistencia/messages'
import { getAllMessages, addMessage } from '../schema';


export const initWSServer = (server:any) => {
    const io = socketIo(server);
    
    io.on('connection', (socket:any) => {
      console.log('Nueva Conexion establecida!');

      socket.on('new-message', (data:any) => {
        console.log(data);
        addMessage(data).then((data) => {
          io.emit('updateChat', data);              
        });
      });

      socket.on('askMessages', () => {
        getAllMessages().then((data) => {
          console.log(data);
          socket.emit('updateChat', data);            
        });
      });            
    });

    return io;
};    


