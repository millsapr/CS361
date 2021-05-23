
var apiKey = '6e3c81d045bcc34e1b94b00b3cf64f53';
//document.addEventListener('DOMContentLoaded', weather);
document.addEventListener('DOMContentLoaded', cropImg);
//document.addEventListener('DOMContentLoaded', downloadCanvas);




// https://pqina.nl/blog/cropping-images-to-an-aspect-ratio-with-javascript/
function cropImg(){
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

			// get the aspect ratio of the input image
			//const inputImageAspectRatio = inputWidth / inputHeight;

			// if it's bigger than our target aspect ratio
			let outputWidth = inputWidth;
			let outputHeight = inputHeight;
			/*
			if (inputImageAspectRatio > aspectRatio) {
				outputWidth = inputHeight * aspectRatio;
			} else if (inputImageAspectRatio < aspectRatio) {
				outputHeight = inputWidth / aspectRatio;
			}
			*/
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
		    
		    var request;
		    const download = (url, path, callback) => {
			  request.head(url, (err, res, body) => {
				request(url)
				  .pipe(fs.createWriteStream(path))
				  .on('close', callback)
			  })
			}

			const url = 'https://i.imgur.com/fRdrkI1.jpg'
			const path = './upload/image.png'

			download(url, path, () => {
			  console.log('✅ Done!')
})
		     
		};

		// start loading our image
		inputImage.src = "https://i.imgur.com/fRdrkI1.jpg"; //document.getElementById('stockPhoto').value;
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
   //alert('file is saved');
}


 async function submitToServer() {
			  
			  let imageBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));

			  let formData = new FormData();
			  formData.append("image", imageBlob, "image.png");
				
			
			  // modify the url accordingly
			  let response = await fetch('../', {
				method: 'POST',
				body: formData
			  });
	
			  // convert the response to json, modify it accordingly based on the returned response from your remote server
			  let result = await response.text();
			  //console.log(result);
			  console.log("made it through submittoserver");
			  
			  
			  /*
			  // also display a downloadable version of image
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
			*/
				
			/*
				  let xhr = new XMLHttpRequest();
				  xhr.withCredentials = true;

					
					//https://javascript.info/xmlhttprequest
				  // track upload progress
				  xhr.upload.onprogress = function(event) {
					console.log(`Uploaded ${event.loaded} of ${event.total}`);
				  };

				  // track completion: both successful or not
				  xhr.onloadend = function() {
					if (xhr.status == 200) {
					  console.log("success");
					} else {
					  console.log("error " + this.status);
					}
				  };

				  xhr.open('POST', '../');
				  xhr.setRequestHeader('Content-Type', 'multipart/form-data');
				  xhr.send(formData);
			  */
				  console.log("made it through submittoserver"); 
}


