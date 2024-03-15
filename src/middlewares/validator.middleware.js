export const validateSchema = (schema) => (req, res, next) => {//constructor de interaccion con el server, respuestas a las preguntas que haga el cliente  y seguir.
    try {//operacion de cuidado 
      schema.parse(req.body); /*si el escquema cumple  con el esquema 
      accediendo al cuerpo de una solicitud HTTP*/
      //contiene los datos enviados en el cuerpo de una solicitud POST
      //estructura y el tipo de datos que se esperan en req.body
      /* Es una variable que representa 
      algún tipo de esquema de datos. Este esquema podría 
      definir la estructura y
       el tipo de datos que se esperan en req.body.*/ 
      next();// entonces sigue
    } catch (error) { // atrapa el error si dice que no 

      return res // retorna o devuelve una respuesta con 
        .status(400) // un estatus de error 400
        .json({ message: error.errors.map((error) => error.message) });// todos los .json son del server con un error en mensaje
    }
  };