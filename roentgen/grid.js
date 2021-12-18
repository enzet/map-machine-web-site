window.setInterval(gridRun, 10);

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

    for (i in [...Array(30).keys()]) {

        if (i < 15) {
            localIterator = gridIterator + i * 2
        } else {
            localIterator = gridIterator + (i - 15) * 2 // Try also (i - 35).
        }

        if (localIterator > 300) {
            localIterator -= 300
        }

        if (localIterator <= 100 || localIterator >= 200) {
            s = (smooth(smooth((localIterator / 50) - 1)) + 1) / 2
            if (i < 15) {
                if (localIterator <= 100) {
                    point1 = plus(gridCenter, [(parseInt(i) - 7) * gridScale, 50 * (s - 1) - 7 * 12])
                    point2 = plus(gridCenter, [(parseInt(i) - 7) * gridScale, 50 * (s - 1) + 7 * 12])
                } else if (localIterator <= 300) {
                    point1 = plus(gridCenter, [(parseInt(i) - 7) * gridScale, 50 * s - 7 * 12])
                    point2 = plus(gridCenter, [(parseInt(i) - 7) * gridScale, 50 * s + 7 * 12])
                }
            } else {
                if (localIterator <= 100) {
                    point1 = plus(gridCenter, [50 * (s - 1) - 7 * 12, (parseInt(i) - 15 - 7) * gridScale, ])
                    point2 = plus(gridCenter, [50 * (s - 1) + 7 * 12, (parseInt(i) - 15 - 7) * gridScale, ])
                } else if (localIterator <= 300) {
                    point1 = plus(gridCenter, [50 * s - 7 * 12, (parseInt(i) - 15 - 7) * gridScale, ])
                    point2 = plus(gridCenter, [50 * s + 7 * 12, (parseInt(i) - 15 - 7) * gridScale, ])
                }
            }
            gridLines[i].setAttribute("d", line(point1, point2))

            if (localIterator <= 100) {
                gridLines[i].style.strokeWidth = Math.abs(s / 3)
            } else if (localIterator <= 300) {
                gridLines[i].style.strokeWidth = Math.abs(1 / 3 - s / 3)
            }
        }
    }
}
