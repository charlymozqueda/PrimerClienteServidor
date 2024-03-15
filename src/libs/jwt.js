import jwt from "jsonwebtoken"; //jalar libreria constructora ,tokens por ejemplo correos y claves de navegador
import { TOKEN_SECRET } from "../config.js";

export const createAccessToken = async (payload) => {//funcion crear funcion de acceso ,asincrono en otro hilo -->payload informacion que se almacena en el espacio especifico 
  return new Promise((resolve, reject) => {// java scrip --> promesa ,espera a que la operacion se cumpla sin mas. (r-->resolver--rej-->rechazar)
        jwt.sign(payload, TOKEN_SECRET, { expiresIn: "1d" }, (err, token) => {//expira en 1 dia -->encriptar el token de payload , err una vez hecha la promesa 
      if (err) reject(err);//si sale error rechaza la promesa 
      resolve(token);// en caso de que si sea la promesa -si- es validado y el resultado sera un token 
    });
  });
}
