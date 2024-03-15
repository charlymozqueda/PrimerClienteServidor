import mongoose from "mongoose"; //importamos mongo osea libreria
const userSchema = new mongoose.Schema(//creamos una constante constructor userSchema=new
  {
    username: { //propiedad
      type: String,// tipo cadena
      required: true,// que debe ser puesto si o si
      trim: true,//elinar espacios al final o al inicio
    },
    email: {// definimos lo que debe tener el email osea
      type: String,// tipo cadena
      required: true,// es necesario
      unique: true,// no debe haber uno repetido en este ssisteme
    },
    password: {// que no debes darsela a tu vato o chacal
      type: String,// tipo cadenee
      required: true,// es muy necesaria o no prosigue
    },
  },
  {
    timestamps: true,// cada que se actualiza un dato debemos incluir este que pertenece a mongo
  }
);

export default mongoose.model("User", userSchema); // Exportamos modelo de tipo mongoose modelo 
//en la tabla user , propiedades de la tabla
