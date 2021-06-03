
var apiKey = '6e3c81d045bcc34e1b94b00b3cf64f53';
document.addEventListener('DOMContentLoaded', imageSearch);
//document.addEventListener('DOMContentLoaded', downloadCanvas);


function imageSearch(){
	console.log("imageSearch called");
	document.getElementById('Submit').addEventListener('click', function(event){
		var req = new XMLHttpRequest();
		console.log("search req starting");
		var keyword = document.getElementById('searchTerm').value;
		var searchUrl = '';
		req.open('GET', 'http://flip3.engr.oregonstate.edu:2130/' + keyword, true);
		req.setRequestHeader('Content-Type', 'application/json');
		req.addEventListener('load',function(){
				if(req.status >= 200 && req.status < 400){
				var response = JSON.parse(req.responseText);
				console.log("response is " + response);
				searchUrl = response.url;
				console.log("searchUrl is " + searchUrl);
				 } else {
				console.log("Error in network request: " + req.statusText);
			  }
			addBorder(searchUrl);
		});
		//req.crossOrigin = "Anonymous";
		req.send();
		event.preventDefault();
	}
)};

// https://pqina.nl/blog/cropping-images-to-an-aspect-ratio-with-javascript/
function addBorder(searchUrl){
	console.log("addborder is running");
	return new Promise(resolve => {
	//const aspectRatio = 1  ;
		// this image will hold our source image data
		const inputImage = new Image();
		inputImage.crossOrigin = "Anonymous";	 // this avoids chrome CORB error

		// we want to wait for our image to load
		inputImage.onload = () => {

			// let's store the width and height of our image
			const inputWidth = inputImage.naturalWidth;
			console.log("inputwidth is " + inputWidth);
			const inputHeight = inputImage.naturalHeight;


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
			document.getElementById('forCanvas').appendChild(outputImage);

			const ctx = outputImage.getContext('2d');
			
			
			// draw background box for frame
  			ctx.fillStyle = document.getElementById('color').value;
  			ctx.fillRect(borderPosX, borderPosY, inputWidth+2*borderThickness, inputHeight+2*borderThickness);
			
			// draw our image at position 0, 0 on the canvas
			ctx.drawImage(inputImage,  (borderPosX+borderThickness), (borderPosY+borderThickness));
			resolve(outputImage);
			console.log("made it to drawimage")
			
			
			var dataURL = canvas.toDataURL("image/png");
			console.log("made it to dataurl")
			
			
		    sendMessage(dataURL);
		    displayDownloadable();
		     
		};

		// start loading our image
		//inputImage.src = "http://upload.wikimedia.org/wikipedia/commons/thumb/0/08/01_Schwarzb%C3%A4r.jpg/320px-01_Schwarzb%C3%A4r.jpg"; 
		inputImage.src = "http:" + searchUrl; //document.getElementById('stockPhoto').value;
   		event.preventDefault(); 
	});
}


//Sending image data to server
function sendMessage(dataURL){
	   var msg = JSON.stringify(dataURL);
	   //console.log(msg);
	   var xhr = new XMLHttpRequest();
	   xhr.open('POST', '../'); // '../framed' and '/framed' don't return error
	   xhr.send(msg);
}
		
// also display a downloadable version of image
function displayDownloadable(){
	  var canvas = document.getElementById('canvas');

		canvas.toBlob(function(blob) {
		  var newImg = document.createElement('img'),
			  url = URL.createObjectURL(blob);

		  newImg.onload = function() {
			// no longer need to read the blob so it's revoked
			URL.revokeObjectURL(url);
		  };

		  newImg.src = url;
		  document.body.appendChild(newImg);
		  });
}
		
