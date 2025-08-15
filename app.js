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
app.get('/users', (req, res) => {
  const users = getAllUsers();
  res.json(users);
});

app.post('/users', (req, res) => {
  const result = createUser(req.body);
  if (result.error) {
    res.status(400).json(result);
  } else {
    res.status(201).json(result);
  }
});

app.get('/users/:id', (req, res) => {
  const result = getUserById(req.params.id);
  if (result.error) {
    res.status(404).json(result);
  } else {
    res.json(result);
  }
});

app.put('/users/:id', (req, res) => {
  const result = updateUser(req.params.id, req.body);
  if (result.error) {
    res.status(400).json(result);
  } else {
    res.json(result);
  }
});

app.delete('/users/:id', (req, res) => {
  const result = deleteUser(req.params.id);
  if (result.error) {
    res.status(404).json(result);
  } else {
    res.status(204).end();
  }
});

// Rutas para reportes
app.get('/reports', (req, res) => {
  const reports = getAllReports();
  res.json(reports);
});

app.post('/reports', (req, res) => {
  const result = createReport(req.body);
  if (result.error) {
    res.status(400).json(result);
  } else {
    res.status(201).json(result);
  }
});

app.get('/reports/:id', (req, res) => {
  const result = getReportById(req.params.id);
  if (result.error) {
    res.status(404).json(result);
  } else {
    res.json(result);
  }
});

app.put('/reports/:id', (req, res) => {
  const result = updateReport(req.params.id, req.body);
  if (result.error) {
    res.status(400).json(result);
  } else {
    res.json(result);
  }
});

app.delete('/reports/:id', (req, res) => {
  const result = deleteReport(req.params.id);
  if (result.error) {
    res.status(404).json(result);
  } else {
    res.status(204).end();
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});