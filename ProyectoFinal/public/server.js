var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


var app =express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.static(__dirname + '/public'));

app.use('/css', express.static(__dirname +'/css'));
app.use('/assets', express.static(__dirname +'/assets'));
app.use('/js', express.static(__dirname +'/js'));


//Esta es la dirección de el formulario que el usuario va a ver
var htmlname = "/index.html";

//Para cambiar base de datos ingrese connect de mongo con usuario y contraseña
var mongoCredential = "mongodb+srv://kombatiente:qwer1234@clustertest.o43i9.mongodb.net/Doggers";
mongoose.Promise = global.Promise;
mongoose.connect(mongoCredential,{useUnifiedTopology : true, useNewUrlParser : true});

var formSchema = new mongoose.Schema({
    Nombre: String,
    PrimerApellido: String,
    SegundoApellido: String,
    CodigoPostal:String,
    CalleYNumero:String,
    Colonia: String,
    Estado: String,
    Municipio: String,
    Pais: String,
    services: String,
    TelefonoEmergencia: String

},{collection: 'Formularios'});

var User = mongoose.model("User", formSchema);

app.get('/', function(req,res){
    res.sendFile(htmlname, {root: __dirname});
});


app.post('/sendData',(req,res)=>{
    var myData = new User(req.body);
    console.log("Data: ", myData);
    myData.save()
        .then(item => {
        res.send("Los datos se han enviado exitosamente");
    })
    .catch(err => {
      res.status(400).send("Los datos no se han guardado correctamente");
    });
});

app.listen(3000,function(){
    console.log('Esperando formularios en el puerto 3000');    
});