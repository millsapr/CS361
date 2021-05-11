function draw() {
	document.getElementById('Submit').addEventListener('click', function(event){

  var canvas = document.getElementById('canvas');
  const inputImage = new Image();
   inputImage.onload = () => {
  
  var ctx = canvas.getContext('2d');
  var borderPosX = 25
  var borderPosY = 25
  var borderThickness = 8
  
  //const sourceWidth = document.getElementById('source').naturalWidth;
  //const sourceHeight = document.getElementById('source').naturalHeight;
  const sourceWidth = inputImage.naturalWidth;
  const sourceHeight = inputImage.naturalHeight;
  console.log(sourceWidth);


  // draw orange box
  ctx.fillStyle = 'pink';
  ctx.fillRect(borderPosX, borderPosY, sourceWidth+2*borderThickness, sourceHeight+2*borderThickness);

  // Draw frame
  //ctx.drawImage(document.getElementById('frame'), 0, 0);
  
  // Draw slice
  ctx.drawImage(inputImage,
                (borderPosX+borderThickness), (borderPosY+borderThickness));
  		      event.preventDefault();
  		      
  // start loading our image
    inputImage.src = document.getElementById('imageURL').value;
	console.log(document.getElementById('imageURL').value)
	};
});

}