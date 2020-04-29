//  variable to store the classifier
let classifier;
// live video that will be classified
let video;
let resultsP;

function setup() {
    createCanvas(640, 480);
    background(255, 255, 60);
    video = createCapture(VIDEO);
    video.hide();

    classifier = ml5.imageClassifier('MobileNet', video, ModelReady);
    resultsP = createP("loading model and video...");
}

// callback function to check if the model has loaded correctly
function ModelReady() {
    console.log("Model is ready!!");
    ClassifyVideo();
}

function ClassifyVideo() {
    classifier.classify(GotResults);
}
// callback function to handle the results and to check for errrors
function GotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        resultsP.html(results[0].label + ' ' + nf(results[0].confidence, 0, 2));
        ClassifyVideo();
    }
}

function draw() {
    image(video, 0, 0);
}