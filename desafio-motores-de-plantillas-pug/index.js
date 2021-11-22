const express = require('express');
const cors = require('cors');
const serverRoutes = require('./routes');
const app = express();
const PORT = 8091;


app.set('views', './views');
app.set('view engine', 'pug');


app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('',express.static(__dirname + '/public'));

serverRoutes(app);


app.listen(PORT, () => {
    console.log(`Estamos conectados a la URL http://localhost:${PORT}`)
})
app.on("Error",err => console.log(`Falló la conexión al servidor`,err));