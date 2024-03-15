import express from 'express'; //framework que construye el servidor importamos express
import morgan from 'morgan';// importamos morgan para vwr todas las peticiones que llegan del cliente al servidor
import cookieParser from 'cookie-parser';// poder acceder a algunas funciones que estan en las paginas 
// como ejecuciones de scrips guardar algunas selecciones etc.
import authRoutes from "./routes/auth.routes.js";//

const app = express();//agregamos una constante llamada app que ejecutara express
app.use(morgan('dev')); //express usara morgan en modo de desarrollo.
app.use(express.json()); //express usara .json envian y reciben info las apis
app.use(cookieParser()); //pa eso
app.use(authRoutes);
export default app; //se guarda los renglones anteriores en esta constante llamada app
