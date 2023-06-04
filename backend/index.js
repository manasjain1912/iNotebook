const connectToDatabase = require('./db');
const express = require('express')
var cors = require('cors')

//connectToDatabase();

const app = express()
const port = 5000

app.use(cors());    
app.use(express.json()); // to send request in content -type : application/json

// Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`iNotebook app listening on port http://localhost:${port}`)
})
