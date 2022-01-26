import app from './app'

/*
* INICIA O SERVER NA POR 3332
*/
app.listen(3332, () => { 
  console.log({ msg: "Started Server", port: 3332 });
});


