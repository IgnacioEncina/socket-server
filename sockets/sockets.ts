

//  se crea en Video 27 - Detectar la desconexion de un usuario - Servidor

import { Socket } from 'socket.io';
import socketIO from 'socket.io';


export const desconectar = (cliente: Socket) => {

    cliente.on('disconnect', () => {
        console.log('Cliente Desconectado');
    })

}

// Escuchar mensajes  -   Video 28
export const mensaje = ( cliente: Socket, io: socketIO.Server ) => {

    cliente.on('mensaje', ( payload ) => {

        console.log('Mensaje recibido', payload );

        io.emit('mensaje-nuevo', payload );

    })

}