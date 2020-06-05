let img = null;
let canvas;
let inputImg;
let statusText;

let button;

let backgroundWorker = new Worker("analyse.js");

function setup() {
    canvas = createCanvas(600, 600);
    canvas.parent("canvas_container");
    statusText = document.querySelector("#status_text");
    statusText.textContent = ":P";
    button = createButton("Analyse Image");
    button.mousePressed(sendToWorker);
    canvas.drop(handleFile);
    imageMode(CENTER);
}

function draw() {
    background(245);
    text("Drop Image File here", width/2, height/2);
    // draw loaded image on canvas
    if(img) {
        image(img, width/2, height/2);
    }
    ellipse(mouseX, mouseY, 40, 40);
    
}

function sendToWorker() {
    if(img != null) {
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
}

function handleFile(file) {
    print(file);
    if (file.type === 'image') {
        statusText.textContent = "Image Loading"
        img = loadImage(file.data, imageLoaded);
        inputImg = createImg(file.data, "input");
    } else {
        img = null;
    }
}

function imageLoaded() {
    print("Image loaded");
    statusText.textContent = "Image Loaded";
    resizeCanvas(img.width, img.height);
    image(img, width/2, height/2);
    //analysePixels();
}
