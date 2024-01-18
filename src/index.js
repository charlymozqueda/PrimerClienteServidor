import express from 'express';

const app = express();
app.get('/', (req, res) => {
  res.send('¿Cren que van a soportar? ');
});
const puerto = 3000;
app.listen(puerto, () => {
  console.log(`ESCUCHANDO EN http://localhost:${puerto}`);
});
