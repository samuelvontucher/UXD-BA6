const url = "http://localhost:8000/query";

let canvas;
let cheatBtn;
let sendBtn;
let title;
let btn;

let inputImage;
let fileInput;

let img;
let genImg;

let catchImg = true;

let backgroundWorker = new Worker("analyse.js");
let pixelsChanged = false;
let pictureGenerated = false;

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
    background(29);
    fill(231);
    noStroke();
    text("Drop Image File here", width / 2, height / 2);
    // draw loaded image on canvas
    if (img) {
        image(img, width / 2, height / 2, 500, 500);
    }
    if(catchImg) {
        strokeWeight(2);
        stroke(231);
        noFill();
        rect(2, 2, width- 4, height-4)
    }
    //ellipse(mouseX, mouseY, 40, 40);
}

function handleFile(file) {
    print(file);
    if (file.type === 'image') {
        img = loadImage(file.data, imageLoaded);
        inputImage.src = file.data;
        pixelsChanged = false;
        pictureGenerated = false;
    } else {
        img = null;
    }
}

function imageLoaded() {
    print("Image loaded");
    title.textContent = "Bild geladen"
    btn.style.display ="inline";
    inputImage.style.visibility = "visible";
    catchImg = false;
    resizeCanvas(500, 500);
    image(img, width / 2, height / 2, 500, 500);
}

function setUpDOM() {
    title = document.querySelector("#title");
    btn = document.querySelector("#btn");
    btn.addEventListener("click", generateImage, false);
    inputImage = document.querySelector("#input_image");
}

function generateImage() {
    sendToWorker();
}

function cheatFun() {
    print("Image Filter");
    img.filter(BLUR, 1.15);
}
// send pixels of img to worker
function sendToWorker() {
    if (img != null) {
        img.loadPixels();
        let data = [img.pixels, img.width, img.height];
        backgroundWorker.postMessage(data);
        console.log("Message posted to worker");
    } else {
        console.log("Image not loaded");
    }

}

backgroundWorker.onmessage = (e) => {
    console.log(e.data);
    img.loadPixels();
    console.log(img.pixels);
    for (let i = 0; i < e.data.length; i++) {
        img.pixels[i] = e.data[i];
    }
    console.log(img.pixels);
    img.updatePixels();
    console.log(img.pixels);
    console.log("image pixels updated");
    pixelsChanged = true;
    sendImage();
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
            pictureGenerated = true;
            getImage(outputs);
            // use the outputs in your project
        });
}
//--

function getImage(data) {
    // create a new image based on the data from runway
    if (data) {
        print(data.output);
        img = loadImage(data.output);
        genImg = loadImage(data.output);
        newImg = createImg(data.output, "Generated Image");
    } else {
        console.log("Error");
    }

}