import socketIo from 'socket.io';
import { messagesPersistencia } from '../persistencia/messages'


export const initWSServer = (server:any) => {
    const io = socketIo(server);
    
    io.on('connection', (socket:any) => {
        console.log('Nueva Conexion establecida!');

        socket.on('new-message', (data:any) => {
            console.log(data);
            messagesPersistencia.saveMessages(data).then((data) => {
                io.emit('updateChat', data);
            });
        });

        socket.on('askMessages', () => {
            messagesPersistencia.getMessages().then((data) => {
                socket.emit('updateChat', data);
            });
          });
    
    });

    return io;
};    


