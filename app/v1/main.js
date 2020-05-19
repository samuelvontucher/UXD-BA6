let statusText;

let inputImage;
let fileInput;

function setup() {
    canvas = createCanvas(512, 512);
    canvas.parent("canvas_container");
    background(240, 200, 40);
    setUpDOM();
}

function draw() {
            // draw loaded image on canvas
            if(inputImage) {
                image(inputImage, 0, 0);
            } else {
                print("image not loaded");
            }
}


function imageIsLoaded() { 
    statusText.innerHTML = "image loaded";
}

function setUpDOM() {
    statusText = document.querySelector("#image_status");
    input = createFileInput(handleFile);
    input.parent("input_container");
}

function handleFile(file) {
    print(file);
    statusText.innerHTML = "image loaded!";
    if (file.type === 'image') {
      inputImage = createImg(file.data, '');
      inputImage.hide();
    } else {
      inputImage = null;
    }
}