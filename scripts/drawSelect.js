
var apiKey = '6e3c81d045bcc34e1b94b00b3cf64f53';
//document.addEventListener('DOMContentLoaded', weather);
document.addEventListener('DOMContentLoaded', cropImg);
document.addEventListener('DOMContentLoaded', downloadCanvas);





function cropImg(){
	document.getElementById('Submit').addEventListener('click', function(event){
	return new Promise(resolve => {
	//const aspectRatio = 1  ;
		// this image will hold our source image data
		const inputImage = new Image();

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
			const outputImage = document.createElement('canvas');

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
			
			// draw our image at position 0, 0 on the canvas
			ctx.drawImage(inputImage,  (borderPosX+borderThickness), (borderPosY+borderThickness));
			resolve(outputImage);
		};

		// start loading our image
		inputImage.src = document.getElementById('stockPhoto').value;
   		      event.preventDefault(); 

	});
	


});

}

function downloadCanvas(){
	document.getElementById('download').addEventListener('click', function(event){
		var myCanvas = document.find('#canvas');
        myCanvas.css("margin-left", "50px");
        var myImg = myCanvas.get(0).toDataURL();
    			console.log("got to doc write part");
	});	
}

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
