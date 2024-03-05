const express = require('express')
const bodyParser = require('body-parser')
const port =  3000
const config = require('./config')
const cors = require('cors'); 
const path = require('path');


const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));

app.set('jwt-secret', config.secret)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

app.use('/api', require('./routes/api'))

   
app.listen(port, () => {
    console.log(`Express is running on port ${port}`)
})
