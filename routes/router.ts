

import { Router, Request, Response } from "express";
import Server from '../classes/server';
import { Socket } from 'socket.io';
import { usuariosConectados } from "../sockets/sockets";

const router = Router();

router.get('/mensajes', ( req: Request, res: Response ) => {

    res.json({
        ok: true,
        mensaje: 'Todo esta bien!!'
    })

})

router.post('/mensajes', ( req: Request, res: Response ) => {

    // Video 16
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = {
        de,
        cuerpo
    }
    const server = Server.instance;
    // emite el mensaje al usuario con el id en particular
    server.io.emit( 'mensaje-nuevo', payload );


    res.json({
        ok: true,
        cuerpo,
        de
    })

})

router.post('/mensajes/:id', ( req: Request, res: Response ) => {

    // Video 16
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id


    // Video 44 - Mensajes privados
    const payload = {
        de,
        cuerpo
    }
    const server = Server.instance;
    // emite el mensaje al usuario con el id en particular
    server.io.in( id ).emit( 'mensaje-privado', payload );




    res.json({
        ok: true,
        cuerpo,
        de,
        id
    })

})


//////////////////  Seccion 6  desde Video 51   ///////////////////////

// Servicio para obtener todos los IDs de los usuarios
router.get('/usuarios', ( req: Request, res: Response ) => {

    const server = Server.instance;

    ////  codigo modificado personalmente por cambio de funcion de clients a allSocket de la V2 a la V3 de socket.io   -   Video 51....
    ////  .....  segun la documentacion en https://runebook.dev/es/docs/socketio/migrating-from-2-x-to-3-0 y las preguntas del video 51
    const ids = server.io.allSockets().then(( clientes ) => {  
                    res.json({
                        ok: true,
                        clientes: Array.from( clientes )
                    })
                }).catch( ( err ) => {
                    res.json({
                        ok:false,
                        err
                    })
                });
    ////   FIN  codigo modificado personalmente

});

// Obtener usuarios y sus nombres
router.get('/usuarios/detalle', ( req: Request, res: Response ) => {


    res.json({
        ok: true,
        clientes: usuariosConectados.getLista()
    })
});




export default router;