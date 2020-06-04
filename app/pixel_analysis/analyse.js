importScripts("../../libs/color-classifier/color-classifier.min.js");    
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

onmessage = (info) => {
    pixels = info.data[0];
    w = info.data[1];
    h = info.data[2];
    console.log(w);
    console.log('Message received from main script');
    for (let i = 0; i < 4 * (w * h); i += 4) {
        let r = pixels[i];
        let g = pixels[i + 1];
        let b = pixels[i + 2];
        let a = pixels[i + 3];
        let c = colorClassifier.classify({r: r, g: g, b: b}, "hex");
        if(c === colors.tree.light || c === colors.tree.dark) {
            pixels[i] = labelColors.tree.r;
            pixels[i + 1] = labelColors.tree.g;
            pixels[i + 2] = labelColors.tree.b;
        } else if (c === colors.sky.light || c === colors.sky.dark) {
            pixels[i] = labelColors.sky.r;
            pixels[i + 1] = labelColors.sky.g;
            pixels[i + 2] = labelColors.sky.b;
        } else if (c === colors.grass.light || c === colors.grass.dark) {
            pixels[i] = labelColors.grass.r;
            pixels[i + 1] = labelColors.grass.g;
            pixels[i + 2] = labelColors.grass.b;
        } else if (c === colors.river.light || c === colors.river.dark) {
            pixels[i] = labelColors.river.r;
            pixels[i + 1] = labelColors.river.g;
            pixels[i + 2] = labelColors.river.b;
        }
    }
    console.log("finished analysing");
    postMessage(pixels);
}