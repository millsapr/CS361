
var apiKey = '6e3c81d045bcc34e1b94b00b3cf64f53';
//document.addEventListener('DOMContentLoaded', weather);
document.addEventListener('DOMContentLoaded', addBorder);
//document.addEventListener('DOMContentLoaded', downloadCanvas);




// https://pqina.nl/blog/cropping-images-to-an-aspect-ratio-with-javascript/
function addBorder(){
	document.getElementById('Submit').addEventListener('click', function(event){
	return new Promise(resolve => {
	//const aspectRatio = 1  ;
		// this image will hold our source image data
		const inputImage = new Image();
		const backgroundImage = new Image();
		inputImage.crossOrigin = "Anonymous";	 // this avoids chrome CORB error

		// we want to wait for our image to load
		inputImage.onload = () => {

			// let's store the width and height of our image
			const inputWidth = inputImage.naturalWidth;
			const inputHeight = inputImage.naturalHeight;

			
			// if it's bigger than our target aspect ratio
			let outputWidth = 380;
			let outputHeight = 750;
			
			// calculate the position to draw the image at
			//const outputX = (outputWidth - inputWidth) * .5;
			//const outputY = (outputHeight - inputHeight) * .5;

			// create a canvas that will present the output image
			//const outputImage = document.createElement('canvas');
			const outputImage = document.getElementById('canvas');

			
			// set it to the same size as the image
			outputImage.width = outputWidth; //+2*borderThickness;
			outputImage.height = outputHeight; //+2*borderThickness;	
			document.getElementById('forCanvas').appendChild(outputImage);

			const ctx = outputImage.getContext('2d');
			
			//og frame image 1484x2978
			// draw background box for frame
			//ctx.drawImage(backgroundImage,0,0, 371, 745);
  			//ctx.fillStyle = document.getElementById('color').value;
  			//ctx.fillRect(borderPosX, borderPosY, inputWidth+2*borderThickness, inputHeight+2*borderThickness);
			
			if (backgroundImage.naturalWidth > 500) {
				// draw our image at position 0, 0 on the canvas
				ctx.drawImage(inputImage,24,22, 323, 702);
				//ctx.drawImage(inputImage,40,52, 323, 694);
				ctx.drawImage(backgroundImage,0,0, 371, 745);
			} else {
				// draw our image at position 0, 0 on the canvas
				ctx.drawImage(inputImage,10,55, 225, 420);
				//ctx.drawImage(inputImage,40,52, 323, 694);
				ctx.drawImage(backgroundImage,0,0, 245, 512);
			}
			console.log(document.getElementById('stockPhoto').value);
			resolve(outputImage);
			
			
			var dataURL = canvas.toDataURL("image/png");
			
			
		    sendMessage(dataURL);
		    displayDownloadable();
		     
		};

		// start loading our image
		//inputImage.src = "http://upload.wikimedia.org/wikipedia/commons/thumb/0/08/01_Schwarzb%C3%A4r.jpg/320px-01_Schwarzb%C3%A4r.jpg"; 
		backgroundImage.src = document.getElementById('stockPhoto').value;
		inputImage.src = document.getElementById('imageURL').value;
   		event.preventDefault(); 
   		      

	});
	
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
		



