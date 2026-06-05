const express = require('express');
const cors    = require('cors');
require('dotenv').config();
const app = express();
const connectDB = require("./config/db");
connectDB();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.json({ message: 'Serveur OK' });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});