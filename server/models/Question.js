const mongoose = require('mongoose');

// Schéma pour une Réponse (sous-document embarqué)
const answerSchema = new mongoose.Schema({
  body:      { type: String, required: true },
  author:    { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Schéma principal pour une Question
const questionSchema = new mongoose.Schema({
  title:     { type: String, required: true, minlength: 10 },
  body:      { type: String, required: true },
  author:    { type: String, required: true },
  tag:       { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  answers:   [answerSchema]
});

module.exports = mongoose.model('Question', questionSchema);