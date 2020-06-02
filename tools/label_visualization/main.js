let table;
let rows;

function preload() {
  table = loadTable("../SPADE-COCO_Labels.csv", 'csv', 'header');
}

function setup() {
    noCanvas();
    rows = table.getRowCount();
    print(rows);
    for (let i = 0; i < rows; i++) {
        color = table.getString(i, 2);
        div = createDiv();
        label = createSpan(table.getString(i, 0));
        cS = createSpan(".");
        colorL = createSpan(color);
        
        label.parent(div);
        cS.parent(div);
        colorL.parent(div);
        
        div.style("padding", "0.4em");
        label.style("display", "inline-block");
        label.style("width", "100px");
        cS.style("display", "inline-block");
        cS.style("width", "100px");
        cS.style("height", "1.5em");
        cS.style("background-color", color);
        
    }
}