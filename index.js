const express = require("express");
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');

const app = express();
port = 8000;


//requête sur le serveur
app.get('/', (req, res) => {
    res.send("Hello world");
})

//à modifier en post pour récupérer les données envoyé d'une autres page, async pour pouvoir utiliser await
app.get('/add', async (req, res) => {
    const connect = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'node'
    })

    const query = async (query, values) => {
        const [rows] = await connect.execute(query, values);
        return rows
    }

// données qu'on souhaite ajouté en bdd
const username = "Marc";
const mail = "marc@secure.com";
const pass = "mot de passe sécurisé";
// cryptage du mot de passe
const passHash = await bcrypt.hash(pass, 10);


await query("INSERT INTO users (id, pseudo, mail, password) VALUES (null, ?, ?, ?)", [username, mail, passHash]);

res.json({add: true});
})




//Démarrage du serveur
app.listen(port, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('serveur en ligne sur : http://localhost:8000/');
    }
})