const mongoose = require('mongoose');
const Question = require('./models/Question');
require('dotenv').config();

const seedData = [
  {
    title: 'Comment utiliser useEffect en React ?',
    body: 'Je ne comprends pas les dépendances du hook useEffect. Quelqu\'un peut expliquer ?',
    author: 'Ali',
    tag: 'React',
    answers: [
      {
        body: 'Le tableau de dépendances contrôle quand useEffect se relance.',
        author: 'Fatima'
      }
    ]
  },
  {
    title: 'Différence entre let et const en JavaScript ?',
    body: 'Dans quel cas utiliser l\'un ou l\'autre ? Est-ce que const est vraiment constant ?',
    author: 'Moussa',
    tag: 'JavaScript',
    answers: []
  },
  {
    title: 'Comment connecter React à une API Node.js ?',
    body: 'J\'essaie de faire un fetch depuis React vers mon serveur Express mais j\'ai une erreur CORS.',
    author: 'Nana',
    tag: 'Node.js',
    answers: [
      {
        body: 'Il faut installer le package cors sur ton serveur Express et l\'ajouter avec app.use(cors()).',
        author: 'Ali'
      }
    ]
  }
];

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Question.deleteMany({});
  await Question.insertMany(seedData);
  console.log('✅ Base de données remplie avec succès !');
  process.exit();
}).catch(err => {
  console.error('Erreur :', err.message);
  process.exit(1);
});