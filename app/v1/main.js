let statusText;
let inputImage;

function setup() {
    canvas = createCanvas(512, 512);
    canvas.parent("canvas_container");
    background(240, 170, 40);
    setUpDOM();
}



function imageIsLoaded() { 
    statusText.innerHTML = "image loaded";
}

function setUpDOM() {
    statusText = document.querySelector("#image_status");
    // upload image, display the image on the page
    document.querySelector('input[type="file"]').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            statusText.innerHTML = "image loading"
            let img = document.querySelector("#input_image"); 
            img.src = URL.createObjectURL(this.files[0]);
            // display loaded image on canvas
            image(img, 0, 0);
            img.onload = imageIsLoaded;
        }
    });
}