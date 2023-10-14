
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = process.env.PORT || 3000;
let cors = require('cors');

const AWS = require('aws-sdk');


AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

app.use(cors(
    {credentials: true}
))

app.use(bodyParser.json({limit: '50mb'}))
app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: '50mb'
    })
)
app.get('/', (request, response) => {
    response.json({
        info: 'Node.js, Express, and Postgres API'
    })
})
app.get('/word/all', db.getWords)
//app.get('/words/:id', db.getWordsById())
app.post('/word/new', db.createWord)
//app.put('/word/:id', db.updateWord)
app.delete('/word/:id', db.deleteWord)
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
