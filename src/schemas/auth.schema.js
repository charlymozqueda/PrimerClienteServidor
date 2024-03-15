import { z } from 'zod'; // llamamos de la libreria de zod una función llamada Z que nos ayudará a crear los esquemas

export const registerSchema = z.object({
  //crear función para ser esportada ,registro de esquema aqui  tendremos 3
  username: z.string({
    // tipo de daro que vamos a ingresar en este caso es cadena
    required_error: 'Username es requerido', // en caso de  no ingresarla pedirá
    invalid_type_error: 'usuario no es string', //el usuario no es de tipo solicitado
  }),
  email: z
    .string({// tipo de dato cadena
      required_error: 'Email es necesario',// requiere gmail para continuar
    })
    .email({
      message: 'Email is not valid',//sin @ no es valido + domimnio
    }),
  password: z
    .string({// contraseña de tipo cadene es requeride y todes los trukes
      required_error: 'Password es requerida',
    })
    .min(6, {
      message: 'Password must be at least 6 characters',// registro con menos de 6 caracteres
    }),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({
      message: 'Email is not valid',
    }),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, {
      message: 'Password must be at least 6 characters',
    }),
});
