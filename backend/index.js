const express = require('express');
const db = require('./firebase'); // this is your firebase.js file

const app = express();
const port = 5000;

app.use(express.json());

// Example route to check Firebase connection
app.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('test').get();
    const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json({ message: 'Connected to Firestore!', data: docs });
  } catch (error) {
    res.status(500).json({ message: 'Error connecting to Firestore', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Backend server is running at http://localhost:${port}`);
});
