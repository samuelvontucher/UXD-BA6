const url = "http://localhost:8000/query";

let canvas;
let statusText;
let generateBtn;
let sendBtn;

let inputImage;
let fileInput;

let img;

function setup() {
    canvas = createCanvas(800, 600);
    canvas.parent("canvas_container");
    background(255);
    textAlign(CENTER);
    imageMode(CENTER);
    setUpDOM();
    canvas.drop(handleFile);
}

function draw() {
    background(255);
    text("Drop Image File here", width/2, height/2);
    // draw loaded image on canvas
    if(img) {
        image(img, width/2, height/2);
    }
}


function setUpDOM() {
    statusText = document.querySelector("#image_status");
    sendBtn = createButton("Send Image");
    sendBtn.mousePressed(sendImage);
    inputImage = document.querySelector("#input_image");
}

function handleFile(file) {
    print(file);
    statusText.innerHTML = "image loaded!";
    if (file.type === 'image') {
        img = loadImage(file.data);
        inputImage.src = file.data;
    } else {
        img = null;
    }
}

//---
// Function to access runway
function sendImage() {
    img.loadPixels();
    postImage = img.canvas.toDataURL("image/jpeg");
    const inputs = {
        "semantic_map": postImage
    };

    fetch('http://localhost:8000/query', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputs)
        })
        .then(response => response.json())
        .then(outputs => {
            const {
                output
            } = outputs;
            print("Data from Runway")
            print(outputs);
            generateImage(outputs);
            // use the outputs in your project
        });
}
//--

function generateImage(data) {
    // create a new image based on the data from runway
    if(data) {
        print(data.output);
        img = loadImage(data.output);
        newImg = createImg(data.output, "Generated Image");
    } else {
        console.log("Error");
    }
    
}