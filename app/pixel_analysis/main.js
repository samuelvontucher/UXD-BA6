// input colors (from real paint)
let colors = {
    tree: {
        light: "#bc8c64",
        dark: "#2c2211"
    },
    sky: {
        light: "#a5d9e2",
        dark: "#2796c4"
    },
    grass: {
        light: "#c5e97e",
        dark: "#336e1a"
    },
    river: {
        light: "#02070d",
        dark: "#02070d"
    }
    
}
// tree, sky, grass, river
const realColors = [colors.tree.light, colors.tree.dark, colors.sky.light, colors.sky.dark, colors.grass.light, colors.grass.dark,
    colors.river.light, colors.river.dark];
const colorClassifier = new ColorClassifier(realColors);
//const color = colorClassifier.classify("color to classify");




// label colors from runway
let labelColors = {
    sky : {
        r: 90,
        g: 219, 
        b: 255,
    },
    tree : {
        r: 140,
        g: 104,
        b: 47
    },
    grass: {
        r: 29,
        g: 195,
        b: 49
    },
    river: {
        r: 0,
        g: 57, 
        b:150
    }
}
let img = null;
let canvas;
let inputImg;
let statusText;

function setup() {
    canvas = createCanvas(600, 600);
    canvas.parent("canvas_container");
    statusText = document.querySelector("#status_text");
    statusText.textContent = ":P";
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
    analysePixels();
}

function analysePixels() {
    img.loadPixels();
    print(img.width);
    for (let i = 0; i < 4 * (img.width * img.height); i += 4) {
        let r = img.pixels[i];
        let g = img.pixels[i + 1];
        let b = img.pixels[i + 2];
        let a = img.pixels[i + 3];
        let c = colorClassifier.classify({r: r, g: g, b: b}, "hex");
        if(c === colors.tree.light || c === colors.tree.dark) {
            img.pixels[i] = labelColors.tree.r;
            img.pixels[i + 1] = labelColors.tree.g;
            img.pixels[i + 2] = labelColors.tree.b;
        } else if (c === colors.sky.light || c === colors.sky.dark) {
            img.pixels[i] = labelColors.sky.r;
            img.pixels[i + 1] = labelColors.sky.g;
            img.pixels[i + 2] = labelColors.sky.b;
        } else if (c === colors.grass.light || c === colors.grass.dark) {
            img.pixels[i] = labelColors.grass.r;
            img.pixels[i + 1] = labelColors.grass.g;
            img.pixels[i + 2] = labelColors.grass.b;
        } else if (c === colors.river.light || c === colors.river.dark) {
            img.pixels[i] = labelColors.river.r;
            img.pixels[i + 1] = labelColors.river.g;
            img.pixels[i + 2] = labelColors.river.b;
        }
    }
    img.updatePixels();
    statusText.textContent = "Pixels changed";
}