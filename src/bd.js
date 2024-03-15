import mongoose from 'mongoose'; //  mandamos llamar la libreria de mongodb 
import { MONGOLINK } from './config.js';// usamos o llamamos el link que esta en config.js

const conexion = async () => {// declarams una constante y asignamos una función asincrona 
  try { // funcion de cuidado usamos try
    await mongoose.connect(MONGOLINK);// esta linea se ejecutara en otro hilo
    console.log('Conexion Establecida en este caso nenis');// cuando temine de ejecutarse linea 6 entonces se ejecutara esta.
  } catch (error) { // en caso de que la linea 6 de un error pasará a la linea 9.
    console.error('No conexion'); //mensaje 
  }
};

export default conexion;// lo anterior de guarda en la constante que tiene una funcion  que es conectar a a bd.js
// function prueba(){ }  asi pa las funciones 
