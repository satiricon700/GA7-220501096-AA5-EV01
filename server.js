// Importar dependencias
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Simulación de base de datos en memoria
let usuarios = [];

// Endpoint de registro
app.post("/register", (req, res) => {
  const { usuario, contraseña } = req.body;

  // Validar que no esté vacío
  if (!usuario || !contraseña) {
    return res.status(400).json({ mensaje: "Usuario y contraseña son requeridos" });
  }

  // Guardar usuario
  usuarios.push({ usuario, contraseña });
  res.json({ mensaje: "Usuario registrado correctamente" });
});

// Endpoint de login
app.post("/login", (req, res) => {
  const { usuario, contraseña } = req.body;

  // Buscar usuario en la "base de datos"
  const encontrado = usuarios.find(u => u.usuario === usuario && u.contraseña === contraseña);

  if (encontrado) {
    res.json({ mensaje: "Autenticación satisfactoria" });
  } else {
    res.status(401).json({ mensaje: "Error en la autenticación" });
  }
});

// Iniciar servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
// Endpoint raíz para verificar que el servicio está activo
app.get("/", (req, res) => {
  res.send("Servicio web de autenticación activo. Usa /register o /login.");
});
