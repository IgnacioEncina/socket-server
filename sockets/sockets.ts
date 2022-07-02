

//  se crea en Video 27 - Detectar la desconexion de un usuario - Servidor

import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';


export const usuariosConectados = new UsuariosLista();


export const conectarCliente = ( cliente: Socket ) => {  // Video 40

    const usuario = new Usuario( cliente.id );
    usuariosConectados.agregar( usuario );

}

export const desconectar = (cliente: Socket) => {

    cliente.on('disconnect', () => {
        console.log('Cliente Desconectado');
        usuariosConectados.borrarUsuario( cliente.id );
    })

}

// Escuchar mensajes  -   Video 28
export const mensaje = ( cliente: Socket, io: socketIO.Server ) => {

    cliente.on('mensaje', ( payload ) => {

        console.log('Mensaje recibido', payload );

        io.emit('mensaje-nuevo', payload );

    })

}

// Configurar Usuario
export const configUsuario = ( cliente: Socket, io: socketIO.Server ) => {
    

    cliente.on('configurar-usuario', ( payload: { nombre: string }, callback: Function ) => {

        usuariosConectados.actualizarNombre( cliente.id, payload.nombre )

        callback({
            ok: true,
            mensaje: `Usuario ${ payload.nombre }, configurado`
        });

    })
}