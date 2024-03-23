const express = require("express");
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');

const app = express();
port = 8000;


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

//requête sur le serveur
app.get('/', (req, res) => {
    res.send("Hello world");
})

//à modifier en post pour récupérer les données envoyé d'une autres page, async pour pouvoir utiliser await
app.get('/add', async (req, res) => {
    

// données qu'on souhaite ajouté en bdd
const username = "Poo";
const mail = "marc@secure.com";
const pass = "";
// cryptage du mot de passe
const passHash = await bcrypt.hash(pass, 5);

bcrypt.compare(pass, passHash, (err, result) => {
    console.log(result); 
})


await query("INSERT INTO users (id, pseudo, mail, password) VALUES (null, ?, ?, ?)", [username, mail, passHash]);

res.json({add: true});
})


app.get('/auth', async (req, res) => {
    const pseudo = "Poo";
    const pass2 = "";

    try {
        const [user] = await query("SELECT * FROM users WHERE pseudo = ?", [pseudo]);
        console.log("User:", user);

        if (!user) {
            console.log("User not found in database.");
            return res.json({ auth: false });
        }
//return toujours false à réglé !
        const result = await bcrypt.compare(pass2, user.password);
        console.log("Authentication result:", result);

        if (result) {
            console.log("Authentication successful!");
            res.json({ auth: true });
        } else {
            console.log("Authentication failed! Password does not match.");
            res.json({ auth: false });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});







//Démarrage du serveur
app.listen(port, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('serveur en ligne sur : http://localhost:8000/');
    }
})