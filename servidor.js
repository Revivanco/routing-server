const express = require("express");
const path = require("path")

const app = express();
const PORT = 3000; // Puerto donde correrá el servidor


//Esta funcion consologuea la fecha, la hora, el metodo y la url
const logger = (req, res, next) => {
  console.log(`fecha:${new Date().toISOString()}   metodo:${req.method}   url:${req.url}`)
  next() //next indica que el codigo puede pasar a lo siguiente 
}


//vuelve los archivos de public estaticos y permite utilizarlos
app.use(express.static("public")) 

app.use(logger)

//Esta es la página principal
app.get("/", (req, res) => {
   res.sendFile(path.join(__dirname,"public","principal.html")) });

// Esta es la primer página
app.get("/primera", (req, res) => {
  res.sendFile(path.join(__dirname,"public","primer","index.html"));
});

//Esta es la segunda página
app.get("/segunda", (req, res) => {
  res.sendFile(path.join(__dirname,"public","segunda","index.html"));
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});