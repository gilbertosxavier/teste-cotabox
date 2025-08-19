const express = require('express');
const router = express.Router();
const Participant = require('../models/participant');


router.get('/', async (req, res) => {
  try {
    const participants = await Participant.find();
    res.status(200).json(participants);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar participantes.' });
  }
});

router.post('/', async (req, res) => {
  const { first_name, last_name, participation } = req.body;

  if (!first_name || !last_name || typeof participation !== 'number') {
    return res.status(400).json({ message: 'Dados inválidos. Todos os campos são obrigatórios e a participação deve ser um número.' });
  }

  try {
    const allParticipants = await Participant.find();
    const totalParticipation = allParticipants.reduce((sum, p) => sum + p.participation, 0);

    if (totalParticipation + participation > 100) {
      return res.status(400).json({ message: 'A soma das participações excede 100%.' });
    }

    const newParticipant = new Participant({ first_name, last_name, participation });
    await newParticipant.save();
    res.status(201).json(newParticipant);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao salvar o participante.' });
  }
});

module.exports = router;
