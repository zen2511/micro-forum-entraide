const express = require('express');
const cors    = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const questionRoutes = require('./routes/questionRoutes');  // ← ajouter

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Serveur OK' });
});

app.use('/api/questions', questionRoutes);  // ← ajouter

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});