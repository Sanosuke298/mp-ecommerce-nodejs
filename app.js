var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000

          
// SDK de Mercado Pago
const mercadopago = require("mercadopago");
// Agrega credenciales
mercadopago.configure({
  access_token: "APP_USR-3118834533830086-100700-cf72db03f645e8e7a8a670b74b73c19e-1212598989",
});

//middleware
app.use(bodyParser.urlencoded({ extended: false }))


var app = express();

app.post('/checkout', function (req, res) {
// Crea un objeto de preferencia
let preference = {
  items: [
    {
      title: "Mi producto",
      unit_price: 100,
      quantity: 1,
    },
  ],
};

mercadopago.preferences
  .create(preference)
  .then(function (response) {
     res.redirect(response.body.init_point);
  })
  .catch(function (error) {
    console.log(error);
  });
})
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});

app.listen(port);