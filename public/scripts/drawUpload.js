

document.addEventListener('DOMContentLoaded', addBorder);
//document.addEventListener('DOMContentLoaded', downloadCanvas);
//document.addEventListener('DOMContentLoaded', download);





// https://pqina.nl/blog/cropping-images-to-an-aspect-ratio-with-javascript/
function addBorder(){
	document.getElementById('Submit').addEventListener('click', function(event){
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
		    //downloadCanvas('canvas');
		    
			//download(dataURL, "image.png");
			//document.getElementById("buttonDiv").style.visibility = 'visible';
		     
		};

		// start loading our image
		//inputImage.src = "http://upload.wikimedia.org/wikipedia/commons/thumb/0/08/01_Schwarzb%C3%A4r.jpg/320px-01_Schwarzb%C3%A4r.jpg"; 
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

/*
function download(href, name){
	document.getElementById('download').addEventListener('click', function(event){
			  download.download = name;
			  download.href = href;
			  
			console.log("running download function");
		});
		event.preventDefault(); 
	}		
*/

/*
function downloadCanvas(){
	document.getElementById('download').addEventListener('click', function(event){
		var myCanvas = document.getElementById('canvas');
        //myCanvas.css("margin-left", "50px");
        var myImg = myCanvas.toDataURL();
	});	
}
*/

/*
function draw() {
	document.getElementById('zipSubmit').addEventListener('click', function(event){

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  // Draw slice
  ctx.drawImage(document.getElementById('source'),
                33, 71, 104, 124, 21, 20, 87, 104);

  // Draw frame
  ctx.drawImage(document.getElementById('frame'), 0, 0);
  		      event.preventDefault();

});
}
*/
