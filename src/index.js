const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let users = [];

//Escucha cualquier petición realizada por el cliente (GET, POST, PUT, PATH, DELETE)
app.use((req, res, next) => {
  console.log(
    "El cliente con la ip: ",
    req.headers["x-real-ip"],
    "está queriendo acceder a:",
    req.url
  );
  //Nuestro primer middleware
  //Req -> Un objeto que nos permite conocer la petición que está realizando el cliente
  //Res -> Un objeto que nos permitirá enviar una respuesta hacía el cliente
  //Next es una función que nos permitirá continuar al siguiente middleware
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use((req, res, next) => {
  console.log(req.body);
  next();
});

//Middleware -> Endpoint para guardar un usuario
app.post("/users", (req, res) => {
  let user = req.body;
  users.push(user);
  res.json({ message: "Se ha guardado un usuario" });
}); //Sebastian

//Middleware -> Endpoint para actualizar un usuario
app.put("/users/:id", (req, res) => {
  let id = req.params.id;
  let data = req.body;
  users[id] = data;
  res.json({ message: "Se han  actualizado los datos" });
}); //Sergio

//Middleware -> Endpoint para borrar un usuario
app.delete("/users/:id", (req, res) => {
  let id = req.params.id;
  let delUser = users[id];
  if (id !== -1) {
    users.splice(id, 1);
  } else {
    console.log("error al eliminar usuario, no encontrado");
  }
  res.json({ message: `El usuario ${delUser} ha sido eliminado exitosamente` });
  res.send("<");
}); //Delete

//Middleware -> Endpoint para obtener todos los usuarios
app.get("/users", (req, res) => {
  res.json({ message: users });
}); //Daniel

app.listen(8080, () => {
  console.log("Se ha iniciado el servidor en el puerto 8080");
});
