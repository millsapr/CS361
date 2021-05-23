/*
    Uses express, dbcon for database connection, body parser to parse form data
    handlebars for HTML templates
*/

const path = require('path');
// express-fileupload from https://stackoverflow.com/questions/23691194/node-express-file-upload
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const { createCanvas, loadImage } = require('canvas')

var http = require('http');
var fs = require('fs');
const request = require('request')
 
var cors = require('cors');
app.use(cors());

/*
var PORT = 13700;
  
app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})
*/

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
app.use('/', express.static('public'));

//app.use(multer({dest:'./framed/'}));
//module.exports = app;				// from multer tutorial...



// default options
app.use(fileUpload());


//http.createServer(function (request, response) {
app.post('/upload', function (request, response) {
    const width = 1200;
	const height = 630;

	const canvas = createCanvas(width, height);
	const ctx = canvas.getContext('2d');

	ctx.fillStyle = 'orange';
	ctx.fillRect(0, 0, inputWidth+2*borderThickness, inputHeight+2*borderThickness);

	loadImage(inputImage).then(image => {
	  context.drawImage(image, 340, 515, 70, 70)
	  const buffer = canvas.toBuffer('image/png')
	  var saveURL = __dirname + "/public/framed/image.png";
	  fs.writeFileSync(saveURL, buffer)
	});
	
	var imageURL = "http://flip2.engr.oregonstate.edu:13700/framed/" + "image.png";
	response.send(imageURL);
	
});
    
/*
    cropImg(request.body);
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

// https://pqina.nl/blog/cropping-images-to-an-aspect-ratio-with-javascript/
function cropImg(sourceImage){
	//document.getElementById('Submit').addEventListener('click', function(event){
	return new Promise(resolve => {
	//const aspectRatio = 1  ;
		// this image will hold our source image data
		const inputImage = new Image();
		inputImage.crossOrigin = "Anonymous";	 // this avoids chrome CORB error

		// we want to wait for our image to load
		inputImage.onload = () => {

			// let's store the width and height of our image
			const inputWidth = inputImage.naturalWidth;
			const inputHeight = inputImage.naturalHeight;

			// get the aspect ratio of the input image
			//const inputImageAspectRatio = inputWidth / inputHeight;

			// if it's bigger than our target aspect ratio
			let outputWidth = inputWidth;
			let outputHeight = inputHeight;
			
			// calculate the position to draw the image at
			const outputX = (outputWidth - inputWidth) * .5;
			const outputY = (outputHeight - inputHeight) * .5;

			// create a canvas that will present the output image
			//const outputImage = document.createElement('canvas');
			const outputImage = document.getElementById('canvas');

			var borderPosX = 0
  			var borderPosY = 0
  			var borderThickness = document.getElementById('borderThickness').value;
			
			// set it to the same size as the image
			outputImage.width = outputWidth+2*borderThickness;
			outputImage.height = outputHeight+2*borderThickness;	
			//outputImage.setAttribute('width', 132);
      		//outputImage.setAttribute('height', 150);
			document.getElementById('forCanvas').appendChild(outputImage);

			const ctx = outputImage.getContext('2d');
			
			
			// draw orange box
  			ctx.fillStyle = document.getElementById('color').value;
  			ctx.fillRect(borderPosX, borderPosY, inputWidth+2*borderThickness, inputHeight+2*borderThickness);
  			ctx.fillRect( 10, 10, 150, 100 );
			
			// draw our image at position 0, 0 on the canvas
			ctx.drawImage(inputImage,  (borderPosX+borderThickness), (borderPosY+borderThickness));
			resolve(outputImage);
			console.log("made it to drawimage")
			
			//window.location = canvas.toDataURL("image/png");
			
			var dataURL = canvas.toDataURL("image/png");
			console.log("made it to dataurl")
			
			
		    //submitToServer();
		    sendMessage(dataURL);
		     
		};

		// start loading our image
		inputImage.src = sourceImage; //"https://i.imgur.com/fRdrkI1.jpg"; //document.getElementById('stockPhoto').value;
   		event.preventDefault(); 
   		      

	});
	
//});

}

//Sending image data to server
function sendMessage(dataURL){
   var msg = JSON.stringify(dataURL);
   //console.log(msg);
   var xhr = new XMLHttpRequest();
   xhr.open('POST', '../'); // '../framed' and '/framed' don't return error
   xhr.send(msg);
   //alert('file is saved');
}

});
*/


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
