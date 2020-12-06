const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');

const team = require('./routes/team')

const app = express()
const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log(`Mongo is connected!`);
})


if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
}

app.use(morgan('tiny'))
app.use(bodyParser.json());

app.use('/api/team', team)

app.listen(PORT, console.log(`Server listening on port ${PORT}`));