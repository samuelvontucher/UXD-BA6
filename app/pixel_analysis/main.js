// input colors (from real paint)
let colors = {
}
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

function setup() {
    canvas = createCanvas(600, 600);
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
        img = loadImage(file.data, imageLoaded);
        inputImg = createImg(file.data, "input");
    } else {
        img = null;
    }
}

function imageLoaded() {
    print("Image loaded");
    resizeCanvas(img.width, img.height);
    analysePixels()
}

function analysePixels() {
    img.loadPixels();
    print(img.width);
    print(img.pixels);
    for (let i = 0; i < 4 * (img.width * img.height); i += 4) {
        let r = img.pixels[i];
        let g = img.pixels[i + 1];
        let b = img.pixels[i + 2];
        let a = img.pixels[i + 3];
        // river
        if((r <=40 && r >= 0) && (g <=45 && g >= 5) && (b <=45 && b >= 0)) {
            img.pixels[i] = labelColors.river.r;
            img.pixels[i + 1] = labelColors.river.g;
            img.pixels[i + 2] = labelColors.river.b;
        }
        //grass
        else if((r <=200 && r >= 50) && (g <=255 && g >= 108) && (b <=145 && b >= 25)) {
            img.pixels[i] = labelColors.grass.r;
            img.pixels[i + 1] = labelColors.grass.g;
            img.pixels[i + 2] = labelColors.grass.b;
        }
        // tree
        else if((r <=240 && r >= 40) && (g <=200 && g >= 25) && (b <=160 && b >= 15)) {
            img.pixels[i] = labelColors.tree.r;
            img.pixels[i + 1] = labelColors.tree.g;
            img.pixels[i + 2] = labelColors.tree.b;
        }
        //sky
        else if(b <=255 && b >= 150) {
            img.pixels[i] = labelColors.sky.r;
            img.pixels[i + 1] = labelColors.sky.g;
            img.pixels[i + 2] = labelColors.sky.b;
        }
    }
    img.updatePixels();
}