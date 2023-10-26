require('dotenv').config();
let mysql = require('mysql');

let con;
//make connection
if (process.env.JAWSDB_URL){
    con = mysql.createConnection(process.env.JAWSDB_URL);
}else{
    con = mysql.createConnection({
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT,
        ssl: true,
    })
}


con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


const getWords = (request, response) => {
    con.query('SELECT * FROM language', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results)
    })
    return response
}

const createWord = (request, response) => {
    const {
        word,
        translation,
    } = request.body
    con.query('INSERT INTO language (word, translation) VALUES (?, ?)', [word, translation], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send( results)
    })
}

const deleteWord = (request, response) => {
    let word = { id: request.params.id }
    con.query('DELETE FROM language WHERE id = ' + request.params.id, word, (error, results) => {
        if (error){
            throw error
        }
        response.status(200).send(results)
    })
}


module.exports = {
    getWords,
    createWord,
    deleteWord
}
