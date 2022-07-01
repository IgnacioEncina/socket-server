import router from './routes/router';
import Server from "./classes/server";

import bodyParser from 'body-parser';
import cors from 'cors';


// const server = new Server();   // Comentariado en video 23      IMPORTANTE!!!
const server = Server.instance;

// BodyParser   -  Video 16         (ojo va antes de las rutas)
    // serializa y genera un objeto javascript(json) para usar en servicios express
server.app.use( bodyParser.urlencoded({ extended: true }));
    // pasa la informacion de un formato json
server.app.use( bodyParser.json() );


// Video 17 - COnfiguracion del CORS
server.app.use( cors({ origin: true, credentials: true }))


 
server.app.use('/', router);



server.start( () => {
    console.log(`Servidor corriendo en el puerto ${ server.port }`);
});