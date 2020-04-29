const container = document.querySelector(".container");

let canvas;
let saveB;
//  variable to store the classifier
let features;
let knn;
let ready = false;
// live video that will be classified
let video;
let label = "nothing";
let labelP;
// for the mini game
let x;
let y;

function setup() {
    canvas = createCanvas(320, 240);
    canvas.parent("canvas_container");
    background(255, 255, 60);
    video = createCapture(VIDEO);
    video.size(320, 240);
    video.style("transform", "scale(-1, 1)");
    video.parent(container);

    features = ml5.featureExtractor('MobileNet', ModelReady);
    knn = ml5.KNNClassifier();
    x = width / 2;
    y = height / 2;

    setupDOM();
}

// callback function to check if the model has loaded correctly
function ModelReady() {
    console.log("Model is ready!!");
}

// when a key is pressed the logits of the video are saved and used to 
// train the KNN model
function keyPressed() {
    const logits = features.infer(video);
    if (key == 'l') {
        knn.addExample(logits, 'left');
        console.log('left');
    } else if (key == 'r') {
        knn.addExample(logits, 'right');
        console.log('right');
    } else if (key == 'u') {
        knn.addExample(logits, 'up');
        console.log('up');
    } else if (key == 'd') {
        knn.addExample(logits, 'down');
        console.log('down');
    } else if (key == 's') {
        save(knn, 'model.json');
    }
}


function ClassifyVideo() {
    const logits = features.infer(video);
    knn.classify(logits, function (error, result) {
        if (error) {
            console.error(error);
        } else {
            label = result.label;
            labelP.html(result.label);
            ClassifyVideo();
        }
    });

}

function draw() {
    fill(255);
    noStroke();


    if (label == 'left') {
        x -= 2;
        background(255, 0, 255, 150);
    } else if (label == 'right') {
        x += 2;
        background(255, 255, 0, 150);
    } else if (label == 'up') {
        y -= 2;
        background(255, 0, 0, 150);
    } else if (label == 'down') {
        y += 2;
        background(0, 0, 255, 150);
    }
    ellipse(x, y, 24);
    x = constrain(x, 0, width);
    y = constrain(y, 0, height);

    //image(video, 0, 0);
    if (!ready && knn.getNumLabels() > 0) {
        ClassifyVideo();
        ready = true;
    }
}

function setupDOM() {
    labelP = createP("need trainig data!");
    labelP.parent(container);
    saveB = select("#save_button")
    saveB.mousePressed(() => {
        knn.save("model.json");
    })
}