

import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';

import * as socket from '../sockets/sockets'





export default class Server {

    private static _instance: Server;

    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server;

    // Patron singleton para asegurar que exista una sola instancia del servidor   -   Video 23   // IMPORTANTISIMO!!!
    private constructor() {

        this.app = express();
        this.port = SERVER_PORT;
        
        this.httpServer = new http.Server( this.app );
        this.io = new socketIO.Server( this.httpServer, { cors: { origin: true, credentials: true } } );
        
        this.escucharSockets();
    }

    public static get instance() {
        return this._instance || ( this._instance = new this() );
    }

    private escucharSockets(){

        console.log('Escuchando conexiones - sockets');

        this.io.on('connection', cliente => {

            // console.log('Cliente conectado' );

            // Video 27  -  detectar la desconexion de un usuario - Servidor
            // cliente.on('disconnect', () => {
            //     console.log('Cliente Desconectado');
            // });            

            // Conectar cliente -   Video 40
            socket.conectarCliente( cliente );

            //Configurar Usuario
            socket.configUsuario( cliente, this.io )                                      // Este codigo se crea en sockets.ts

            console.log( cliente.id );

            // Mensajes
            socket.mensaje( cliente, this.io );

            // Desconectar
            socket.desconectar( cliente );


        });


    }


    start( callback: Function ) {

        // this.app.listen( this.port, callback() );

        // Video 22
        this.httpServer.listen( this.port, callback() );
    }


}