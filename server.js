const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT =  5000;

connectDB();

app.use(express.json());

// Enable CORS
app.use(cors());

// Set react as static page
app.use(express.static(path.join(__dirname, 'client', 'public')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname,'client', 'public', 'index.html'));
});


// Mount routers
app.use('/api/words', require('./routes/words'));
app.use('/api/lists', require('./routes/lists'));

app.get('/', (req, res) => {
    res.send('Hello Express');
})

app.listen(PORT, console.log('Server running on ' + PORT));
