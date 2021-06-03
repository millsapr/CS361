/*
    Uses express, dbcon for database connection, body parser to parse form data
    handlebars for HTML templates
*/

const path = require('path');
// express-fileupload from https://stackoverflow.com/questions/23691194/node-express-file-upload
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

var http = require('http');
var fs = require('fs');
const request = require('request')
 
var cors = require('cors');
app.use(cors());



/* helpers from https://stackoverflow.com/questions/32260117/handlebars-date-format-issue/32260841
npm install --save handlebars-helpers */
var helpers = require('handlebars-helpers')();
//var multer = require('multer');				// for file upload
//var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var handlebars = require('express-handlebars').create({
        defaultLayout:'main',
        });

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/static', express.static('public'));
/* app.use(express.static(path.join(__dirname, '/public'))); */
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
//app.set('mysql', mysql);
//app.use('/tickets', require('./tickets.js'));
app.use('/', express.static('public'));

//app.use(multer({dest:'./framed/'}));
//module.exports = app;				// from multer tutorial...



// default options
app.use(fileUpload());

/*
app.post('/upload', function(req, res) {
  let sampleFile;
  let uploadPath;
  let formData;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.formData;
  uploadPath = __dirname + '/public/upload/' + formData.name;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});
*/

//http.createServer(function (request, response) {
app.post('/', function (request, response) {
    //var post='';
    //if (request.method == 'POST') {
        var body = '';
        request.on('data', function (data) {
            body += data;
        });
        request.on('end', function () {
//-------------parsing data from json to string-------------------------
            var post = JSON.parse(body);
            var data = post.replace("data:image/png;base64,", "");
            var buf = Buffer.from(data, 'base64');
            var saveURL = __dirname + "/public/framed/image.png";
            var imageURL = "http://flip2.engr.oregonstate.edu:13700/framed/" + "image.png";
            //console.log("passed writefile");
            //console.log(buf);
            response.send(imageURL);
            console.log(imageURL);
            writeFileToSystem(buf, saveURL);
            
        });
    //}

//----------saving image to server side folder------------------
    function writeFileToSystem(buf, saveURL)
    {
    	
        //fs.writeFile(__dirname + "/public/framed/image.png", buf, err => {
        fs.writeFile(saveURL, buf, err => {
             if (err) {
    console.error(err)
    return
  }
        });
    }

});

app.post('/addBorder', function (req, res) {
	var inputURL = req.body.imageUrl;
	//console.log(inputURL);
	const url = new URL(inputURL);
	var filename = url.pathname.substr(url.pathname.lastIndexOf("/")+1);
	var editedImageURL = "http://flip2.engr.oregonstate.edu:13700/borderAdded/" + filename;
	res.send(editedImageURL); //, filename, imageURL);
console.log(editedImageURL);
});

app.post('/addaBorder', function (req, res) {
	var inputURL = req.body.imageUrl;
	//console.log(inputURL);
	const url = new URL(inputURL);
	var filename = url.pathname.substr(url.pathname.lastIndexOf("/")+1);
	var editedImageURL = "http://flip2.engr.oregonstate.edu:13700/borderAdded/" + filename;
	if (url.hostname != "github.com") {
		res.send("No image found. Please try a different URL.");
	} else {
		res.send(editedImageURL); //, filename, imageURL);
		}
console.log(editedImageURL);
});


app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
