const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); // Cargar variables de entorno desde .env

const app = express();
const port = 3000;

// Middleware
app.use(
  cors({
    origin: "https://portawebdiego.netlify.app", // Reemplaza con la URL de tu frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    credentials: true, // Si necesitas enviar cookies o encabezados de autenticación
  })
);
app.use(bodyParser.json());

// Configuración de la base de datos MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Conexión a la base de datos
db.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
    return;
  }
  console.log("Conexión exitosa a la base de datos MySQL");
});

// Ruta para guardar mensajes
app.post("/api/messages", (req, res) => {
  const { message } = req.body;

  if (!message || message.trim() === "") {
    return res.status(400).json({ error: "El mensaje no puede estar vacío" });
  }

  // Cambiar 'content' por el nombre correcto de la columna (por ejemplo, 'text')
  const query = "INSERT INTO messages (text) VALUES (?)";
  db.query(query, [message], (err, result) => {
    if (err) {
      console.error("Error al insertar el mensaje:", err);
      return res.status(500).json({ error: "Error al guardar el mensaje" });
    }
    res.status(200).json({ message: "Mensaje guardado con éxito" });
  });
});

// Ruta para guardar un proyecto
app.post("/api/projects", (req, res) => {
  const {
    title,
    description,
    image,
    status,
    tools,
    languages,
    libraries,
    frameworks,
    link,
  } = req.body;

  // Validar que los campos obligatorios estén presentes
  if (!title || !description || !status) {
    return res.status(400).json({ error: "Faltan campos obligatorios." });
  }

  const query = `
    INSERT INTO projects (title, description, image, status, tools, languages, libraries, frameworks, link)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(
    query,
    [
      title,
      description,
      image || null, // Si no hay imagen, guardar como NULL
      status,
      tools && tools.length > 0 ? tools.join(",") : null, // Manejar valores vacíos
      languages && languages.length > 0 ? languages.join(",") : null, // Manejar valores vacíos
      libraries && libraries.length > 0 ? libraries.join(",") : null, // Manejar valores vacíos
      frameworks && frameworks.length > 0 ? frameworks.join(",") : null, // Manejar valores vacíos
      link || null, // Si no hay enlace, guardar como NULL
    ],
    (err, result) => {
      if (err) {
        console.error("Error al guardar el proyecto:", err);
        return res.status(500).json({ error: "Error al guardar el proyecto." });
      }
      res.status(200).json({
        message: "Proyecto guardado con éxito",
        projectId: result.insertId,
      });
    }
  );
});

// Ruta para obtener todos los proyectos
app.get("/api/projects", (req, res) => {
  const query = "SELECT * FROM projects ORDER BY created_at DESC";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener los proyectos:", err);
      return res.status(500).json({ error: "Error al obtener los proyectos." });
    }
    res.status(200).json(results);
  });
});

// Ruta para obtener todos los mensajes
app.get("/api/messages", (req, res) => {
  const query = "SELECT * FROM messages ORDER BY created_at DESC";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener los mensajes:", err);
      return res.status(500).json({ error: "Error al obtener los mensajes." });
    }
    res.status(200).json(results);
  });
});

// Ruta para eliminar un proyecto
app.delete("/api/projects/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM projects WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error al eliminar el proyecto:", err);
      return res.status(500).json({ error: "Error al eliminar el proyecto." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Proyecto no encontrado." });
    }

    res.status(200).json({ message: "Proyecto eliminado con éxito." });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
