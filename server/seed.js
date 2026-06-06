const mongoose = require('mongoose');
const Question = require('./models/Question');
require('dotenv').config();
const seedData = [
{ title: 'Comment utiliser useEffect en React ?',
body: 'Je ne comprends pas les dépendances du hook useEffect.',
author: 'Ali', tag: 'React',
answers: [{ body: 'Le tableau de dépendances contrôle quand useEffect se relance.',
author: 'Fatima' }]
},
{ title: 'Différence entre let et const en JavaScript ?',
body: 'Dans quel cas utiliser lun ou lautre ?',
author: 'Moussa', tag: 'JavaScript', answers: [] },
];
mongoose.connect(process.env.MONGO_URI).then(async () => {
await Question.deleteMany({});
await Question.insertMany(seedData);
console.log('Base de données remplie !');
process.exit();
});