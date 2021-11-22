const express = require('express');
const cors = require('cors');
const serverRoutes = require('./routes');
const handlebars = require('express-handlebars');
const app = express();
const PORT = 8090;

app.engine('handlebars', handlebars({
    extname: 'handlebars',
    defaultLayout: 'index.handlebars',
    layoutsDir: __dirname + '/views/hbs',
    partialsDir: __dirname + '/views/hbs/partials'
}));

app.set('views', './views/hbs');
app.set('view engine', 'handlebars');


app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('',express.static(__dirname + '/public'));

serverRoutes(app);


app.listen(PORT, () => {
    console.log(`Estamos conectados a la URL http://localhost:${PORT}`)
})
app.on("Error",err => console.log(`Falló la conexión al servidor`,err));