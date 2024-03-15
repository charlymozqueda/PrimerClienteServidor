import jwt from "jsonwebtoken";//libreria aut de users de node 
import { TOKEN_SECRET } from "../config.js";//llamar de config.js 

export const auth = (req, res, next) => {// exportar la constante que resibira una funcion o se le daran los valores 
    //req=request--interaccion cliente y servidor-preguntas del servidor al cliente
    //  Res =Response --respuestas a las preguntas que haga el cliente 
    //Next =siguiente pasar 
  try {//operacion cuidadosa 
    const { token } = req.cookies;//de los complementos almacenados solicita la llamada token

    if (!token) //si no hay token 
      return res// enviar una respuesta 
        .status(401)// con estatus 401
        .json({ message: "Authorization Denied" });// "Autorizacion denegada"

    jwt.verify(token, TOKEN_SECRET, (error, user) => {//revisar el token con la autorización de TOKEN_SECRET SI ES CORRECTO. devolverá un usuario si es error error. 
      if (error) {//si hay error por error 
        return res.status(401).json({ message: "Token is not valid" });// como es servidor dara en json estatus 401 y su respectivo mensaje 
      }
      req.user = user;//guardara el user 
      next();// ira ir lo que viene como va! va !
    });
  } catch (error) { //en caso de que algo falle atrapa el error 
    return res.status(500).json({ message: error.message });// en caso de que se ejecute un error en lo interior al try
    //error del server por el 500 
  }
};