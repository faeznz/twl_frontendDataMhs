const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
   next();
 });

app.use(bodyParser.json());

let users = [
  { id: 1, name: 'John Doe', address: '123 Main St', phone: '123456789', class: 'VIP', description: 'Lorem ipsum dolor sit amet' },
  { id: 2, name: 'Jane Smith', address: '456 Elm St', phone: '987654321', class: 'Standard', description: 'Consectetur adipiscing elit' },
];

// Mendapatkan semua data pengguna
app.get('/users', (req, res) => {
  res.json(users);
});

// Mendapatkan data pengguna berdasarkan ID
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Menambahkan data pengguna baru
app.post('/users', (req, res) => {
  const user = req.body;
  user.id = users.length + 1;
  users.push(user);
  res.status(201).json(user);
});

// Mengupdate data pengguna berdasarkan ID
app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedUser = req.body;
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedUser };
    res.json(users[index]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Menghapus data pengguna berdasarkan ID
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    const deletedUser = users.splice(index, 1)[0];
    res.json(deletedUser);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Menangani rute fallback (404 Not Found)
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

module.exports = app;
