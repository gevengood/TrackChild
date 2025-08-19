const express = require('express');
const cors = require('cors');
const { 
  getAllUsers, 
  createUser, 
  getUserById, 
  updateUser, 
  deleteUser 
} = require('./controllers/userController');
const { 
  getAllReports, 
  createReport, 
  getReportById, 
  updateReport, 
  deleteReport 
} = require('./controllers/reportController');

const app = express();
const port = 3035;

app.use(cors());
app.use(express.json());

// Rutas para usuarios
app.get('/users', async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/users', async (req, res) => {
  try {
    const result = await createUser(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const result = await getUserById(req.params.id);
    if (!result) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const result = await updateUser(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    await deleteUser(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// Rutas para reportes
app.get('/reports', async (req, res) => {
  try {
    const reports = await getAllReports();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/reports', async (req, res) => {
  try {
    const result = await createReport(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/reports/:id', async (req, res) => {
  try {
    const result = await getReportById(req.params.id);
    if (!result) return res.status(404).json({ error: "Reporte no encontrado" });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/reports/:id', async (req, res) => {
  try {
    const result = await updateReport(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/reports/:id', async (req, res) => {
  try {
    await deleteReport(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
