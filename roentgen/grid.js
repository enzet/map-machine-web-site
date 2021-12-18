window.setInterval(gridRun, 25);

gridIterator = 0
gridCenter = [150, 150]
gridScale = 12

gridCanvas = document.getElementById("grid_canvas");
gridIcon = document.getElementById("grid_icon");
gridIcon.setAttribute("d", cctv)
gridLines = new Array(30);

for (i in [...Array(30).keys()]) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");  
    path.style.stroke = "#444";   
    path.style.strokeWidth = "0.3px";  
    gridCanvas.appendChild(path);
    
    gridLines[i] = path;
}

function gridRun() {
    gridIterator = (gridIterator < 300) ? gridIterator + 1 : 0

    for (i in [...Array(15).keys()]) {
        point1 = plus(gridCenter, [(parseInt(i) - 7) * gridScale, gridIterator - 50 - 250])
        point2 = plus(gridCenter, [(parseInt(i) - 7) * gridScale, gridIterator + 50 - 250])
        gridLines[i].setAttribute("d", line(point1, point2))
    }
    for (i in [...Array(15).keys()]) {
        point1 = plus(gridCenter, [-gridIterator, (parseInt(i) - 7) * gridScale])
        point2 = plus(gridCenter, [gridIterator, (parseInt(i) - 7) * gridScale])
        gridLines[parseInt(i) + 15].setAttribute("d", line(point1, point2))
    }
}
