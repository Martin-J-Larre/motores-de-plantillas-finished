const express = require('express');
const cors = require('cors');
const serverRoutes = require('./routes');
const app = express();
const PORT = 8092;


app.set('view engine', 'ejs');


app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('',express.static(__dirname + '/public'));

serverRoutes(app);


app.listen(PORT, () => {
    console.log(`Estamos conectados a la URL http://localhost:${PORT}`)
})
app.on("Error",err => console.log(`Falló la conexión al servidor`,err));