const express = require('express');
const router = express.Router();
const Participant = require('../models/participant');

//rota para buscar todos os participantes
router.get('/', async (req, res) => {
  try {
    const participants = await Participant.find();
    res.status(200).json(participants);
  } catch (error) {
    res.status(500).json({ message: 'Participants not found.' });
  }
});


//rota para adicionar um novo participante
router.post('/', async (req, res) => {
  const { first_name, last_name, participation } = req.body;

  if (!first_name || !last_name || typeof participation !== 'number') {
    return res.status(400).json({ message: 'Invalid data. All fields are required and participation must be a number.' });
  }

  try {
    const allParticipants = await Participant.find();
    const totalParticipation = allParticipants.reduce((sum, p) => sum + p.participation, 0);

    if (totalParticipation + participation > 100) {
      return res.status(400).json({ message: 'The sum of all participations cannot exceed 100%.' });
    }

    const newParticipant = new Participant({ first_name, last_name, participation });
    await newParticipant.save();
    res.status(201).json(newParticipant);
  } catch (error) {
    res.status(500).json({ message: 'Error adding participant.' });
  }
});


//rota para editar a participação de um participante
router.patch('/:id', async (req, res) =>{
  const {id} = req.params;
  const {participation} = req.body;

  try {
    const participant = await Participant.findById(id);
    if (!participant) {
      return res.status(404).json({ message: 'Participant not found.' });
    }
    participant.participation = participation;
    await participant.save();
    res.status(200).json(participant);
  } catch (error) {
    res.status(500).json({ message: 'Error editing participant.' })}
});

//rota para excluir um participante
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const participant = await Participant.findByIdAndDelete(id);
    if (!participant) {
      return res.status(404).json({ message: 'Participant not found.' });
    }
    res.status(200).json({ message: 'Participant deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting participant.' });
  }
});



module.exports = router;
