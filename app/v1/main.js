let statusText;

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
    document.querySelector('input[type="file"]').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            statusText.innerHTML = "image loading"
            var img = document.querySelector("#input_image"); 
            img.src = URL.createObjectURL(this.files[0]); 
            img.onload = imageIsLoaded;
        }
    });
}