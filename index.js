const express = require("express");

const app = express();
port = 8000;


//requête sur le serveur
app.get('/', (req, res) => {
    res.send("Hello world");
})







//Démarrage du serveur
app.listen(port, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('serveur en ligne sur : http://localhost:8000/');
    }
})