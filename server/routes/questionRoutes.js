const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// GET /api/questions — Liste toutes les questions (sans les réponses)
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find().select('-answers');
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/questions — Créer une nouvelle question
router.post('/', async (req, res) => {
  const { title, body, author, tag } = req.body;
  try {
    const question = new Question({ title, body, author, tag });
    const saved = await question.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /api/questions/:id — Une question avec toutes ses réponses
router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: 'Introuvable' });
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/questions/:id/answers — Ajouter une réponse
router.post('/:id/answers', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: 'Question introuvable' });
    question.answers.push({
      body: req.body.body,
      author: req.body.author
    });
    const updated = await question.save();
    res.status(201).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;