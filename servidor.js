const express = require("express");
const path = require("path")
const app = express();

const PORT = 3000; // Puerto donde correrá el servidor


app.use(express.static("public"))

//Esta es la página principal
app.get("/", (req, res) => { res.send("¡Hola, Express!"); });
// Esta es la primer página
app.get("/primera", (req, res) => {
  res.sendFile(path.join(__dirname,"public","primer","index.html"));
});

//Esta es la segunda página
app.get("/segunda", (req, res) => {
  res.sendFile(path.join(__dirname,"public","Segunda-página","index.html"));
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});