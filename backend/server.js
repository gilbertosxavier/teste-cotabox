require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const participantsRoutes = require('./routes/participants');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({
  origin:process.env.CLIENT_URL,
  methods:["GET", "POST", "PUT", "PATCH", "DELETE"]
}));
app.use(express.json());


app.use('/api/participants', participantsRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado ao MongoDB.'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));


app.get('/', (req, res) => res.send('API rodando!'));


app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
