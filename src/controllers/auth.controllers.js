import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; //llamar a la libreria de los token para la autenticacion
import { TOKEN_SECRET } from '../config.js'; //es lo del archivo config
import { createAccessToken } from '../libs/jwt.js';
import User from '../models/users.model.js'; //Cuando se ejecute nos crea una tabla llamada usar en mongo

export const register = async (req, res) => {
  //interaccion server-cliente
  try {
    const { username, email, password } = req.body; //lo que escirbimimos en el body de potsman

    const userFound = await User.findOne({ email }); //consultar si tenemos un usuario con el mismo email

    if (userFound)
      // preguntar si es verdadero el usuario y los resgusardo dentro de userfond
      return res.status(400).json({
        // retornara
        message: ['The email is already in use'], // un mensaje diciendo The email is already in use
      });

    const salt = await bcrypt.genSalt(); // si este email no esta en las direcciones de BD
    const passwordHash = await bcrypt.hash(password, salt); //encripta o representar con salt con los caracteres quue se usaron

    const newUser = new User({
      //nuevo objeto para o de la table bd
      username,
      email,
      password: passwordHash, //y la contraseña pero encriptada
    });

    const userSaved = await newUser.save(); //guardar el usuario como un nuevo usuario

    const token = await createAccessToken({ id: userSaved._id });
    //creamos un token cuando accesa a la url ,enconces jalará con el  id
    res.cookie('token', token); //asi mismo complementos que se usan para hacer rendir una web etc.
    res.json({
      // responde con un mensaje
      id: userSaved._id, //mostrara user y pd pero contraseña no.
      username: userSaved.username, //
      email: userSaved.email, //
    });
  } catch (error) {
    //en caaso de error se detendra y enviara el
    //mensare 500 es de server
    return res.status(500).json({ message: error.message });
  }
};
//A PARTIR DE AQUI EL USUARIO YA ESTA EN LA DB
export const login = async (req, res) => {//la operacines Req y Res son de interacion CS.
  
  try {//poner cuidado en 
    const { email, password } = req.body;//lo que el cliente envia  osea usuario y contraseña
    const userFound = await User.findOne({ email });//buscara o consultara en el email en la bd

    if (!userFound)// en caso de que no este el registro en la bd
      return res.status(400).json({// dira 
        message: ['The email does not exist'],// que el correo no existe 
      });

    const isMatch = await bcrypt.compare(password, userFound.password);// comparar si es correcta la contraseña (desencriptada) que esta en 
    //la bd con la que se esta ingresando
    if (!isMatch) {// si no es correcta la contraseña ingresada por el usuario contra la de la bd entonces
      return res.status(400).json({
        message: ['The password is incorrect'],// nos dira que es incorrecta la pssd
      });
    }

    const token = await createAccessToken({ id: userFound._id });//token que se crea si es correcta la pssd 
    res.cookie('token', token);//crea el token guarda la cokkie con el token 

    res.json({// contesta con el res el server 
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });//si algo correcto ingresado fallo lo de arriba tmabien .
  }
};

export const verifyToken = async (req, res) => {//
  try {
    const { token } = req.cookies;
    if (!token) return res.send(false);

    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
      if (error) return res.sendStatus(401);

      const userFound = await User.findById(user.id);
      if (!userFound) return res.sendStatus(401);

      return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
      });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logout = async (_req, res) => {
  res.clearCookie('token');
  return res.send('logout succesfull');
};
