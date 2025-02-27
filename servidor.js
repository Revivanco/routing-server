const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000; // Puerto donde correrá el servidor


//Esta funcion consologuea la fecha, la hora, el metodo y la url
const logger = (req, res, next) => {
  const staticExtensions = [".css", ".js"]
  const ext = path.extname(req.url)
  if (staticExtensions.includes(ext)) {
    return next();
  }

  const timeStamp = new Date();
  const dateString = timeStamp.toISOString().split("T")[0]; // Obtiene "YYYY-MM-DD"
  const logFileName = `log-${dateString}.json`; // Archivo de logs por día


  const logEntry = {
    timeStamp: new Date().toISOString(),
    method: req.method,
    url: req.url
  };

  console.log("Reggistrando visita a:", req.url)

  let logs = { visitCount: 0, entries: [] };

  if (fs.existsSync(logFileName)) {
    const data = fs.readFileSync(logFileName, "utf8")
    if (data) {
      logs = JSON.parse(data)
    }
  };

  logs.visitCount += 1; // Incrementa el contador de visitas
  logs.entries.push(logEntry);


  fs.writeFileSync(logFileName, JSON.stringify(logs, null, 2));

  console.log("Registro guardado para:", req.url)

  next(); //next indica que el codigo puede pasar a lo siguiente 
};


//vuelve los archivos de public estaticos y permite utilizarlos
app.use(logger);

app.use(express.static("public"));


//Esta es la página principal
app.get("/", (req, res) => {
  console.log("Sirviendo Principal")
  res.sendFile(path.join(__dirname, "public", "principal.html"))
});

// Esta es la primer página
app.get("/primera", (req, res) => {
  console.log("Sirviendo Primera")
  res.sendFile(path.join(__dirname, "public", "primer", "index.html"));
});

//Esta es la segunda página
app.get("/segunda", (req, res) => {
  console.log("Sirviendo Secundaria")
  res.sendFile(path.join(__dirname, "public", "segunda", "index.html"));
});


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});