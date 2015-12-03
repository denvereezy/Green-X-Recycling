var express = require('express'),
    exphbs  = require('express-handlebars'),
    compression = require('compression'),
    app = express(),
    myConnection = require('express-myconnection'),
    mysql = require('mysql'),
    bodyParser = require('body-parser');
   lolos = require('./routes/lolo');
  bizza = require('./routes/biza');

    var dbOptions = {
          host: 'localhost',
          user: 'biza',
          password: 'password',
          port: 3306,
          database: 'recycling'
    };

app.use(compression());
app.use(myConnection(mysql, dbOptions, 'single'));
app.use(express.static('public'));
app.engine('handlebars', exphbs({defaultLayout: "main"}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/worker/lolo', lolos.showAll);
app.post('/jobs/add', lolos.add);
// app.get('/worker/lolo', function(req, res){
//   res.render("lolo",{layout:false});
// });

app.get('/', bizza.showAll);


app.get('/edit/:id', bizza.get);
app.post('/eit/:id', bizza.update);
app.post('/update/:id', bizza.update);
app.post('/add', bizza.add);
app.get('/add', bizza.add);
//this should be a post but this is only an illustrationof CRUD - not on good practices
app.get('/delete/:id', bizza.delete);

var port = process.env.PORT || 8000;
var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
