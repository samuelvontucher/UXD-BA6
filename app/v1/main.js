const url = "http://localhost:8000/query";

let canvas;
let statusText;
let generateBtn;
let sendBtn;

let inputImage;
let fileInput;

let img;

function setup() {
    canvas = createCanvas(512, 512);
    canvas.parent("canvas_container");
    background(240, 200, 40);
    setUpDOM();
    canvas.drop(handleFile);
}

function draw() {
    // draw loaded image on canvas
    if(img) {
        image(img, 0, 0);
    }
}

//---
// Function to access runway
function sendImage() {
    const canvasElt = canvas.elt;
    const imageData = canvasElt.toDataURL("image/jpeg")

    const inputs = {
        "semantic_map": "<base 64 image>"
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
            print(outputs);
            generateImage(outputs);
            // use the outputs in your project
        });
}

//--


function setUpDOM() {
    statusText = document.querySelector("#image_status");
    sendBtn = createButton("Send Image");
    sendBtn.mousePressed(sendImage);
    textAlign(CENTER);
    text("Drop Image File here", width/2, height/2);
}

function handleFile(file) {
    print(file);
    statusText.innerHTML = "image loaded!";
    if (file.type === 'image') {
        img = loadImage(file.data);
        inputImage = loadImage(file.data);
        fileInput = createImg(file.data, '');
        fileInput.style("width", "100px");
        fileInput.style("height", "100px");
        fileInput.parent("display_input");
    } else {
        inputImage = null;
        img = null;
    }
}

function generateImage(data) {
    newImg = createImg(data.results);
    image(0,0);
}