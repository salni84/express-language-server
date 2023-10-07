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
    con.query('SELECT * FROM lkncqisg5th5d27z.language', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results)
    })
}

const createWord = (request, response) => {
    const {
        word,
        translation,
        audio
    } = request.body
    con.query('INSERT INTO lkncqisg5th5d27z.language (word, translation, audio) VALUES (?, ?, ?)', [word, translation, audio], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${results.id}`)
    })
}


module.exports = {
    getWords,
    createWord,
}
