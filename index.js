
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000
let cors = require('cors');
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
//app.delete('/word/:id', db.deleteUser)
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
