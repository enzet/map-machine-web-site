window.setInterval(gridRun, 10);

gridIterator = 0
gridModeIndex = 0
gridCenter = [150, 150]
gridScale = 12

gridCanvas = document.getElementById("grid_canvas");
gridIcon = document.getElementById("grid_icon");
gridIcon.setAttribute("d", cctv)
gridLines = new Array(30);

for (i in [...Array(30).keys()]) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");  
    path.style.stroke = "#EEF";
    path.style.strokeWidth = "0.3px";
    gridCanvas.appendChild(path);

    gridLines[i] = path;
}

function gridRun() {

    [gridIterator, gridModeIndex] =
        increment(gridIterator, gridModeIndex, gridModes, 1);

    mode = gridModes[gridModeIndex]

    for (i in [...Array(30).keys()]) {

        if (i < 15) {
            localIterator = gridIterator // + i * 2
        } else {
            localIterator = gridIterator // + (i - 15) * 2 // Try also (i - 35).
        }

        if (localIterator > 100) {
            localIterator -= 100
        }
        console.log(localIterator)

        if (mode.action == "in" || mode.action == "out") {
            s = (smooth((localIterator / 50) - 1) + 1) / 2 // [0, 1]
            if (i < 15) {
                if (mode.action == "in") {
                    point1 = plus(gridCenter, [(parseInt(i) - 7) * gridScale, 50 * (s - 1) - 7 * 12])
                    point2 = plus(gridCenter, [(parseInt(i) - 7) * gridScale, 50 * (s - 1) + 7 * 12])
                } else if (mode.action == "out") {
                    point1 = plus(gridCenter, [(parseInt(i) - 7) * gridScale, 50 * s - 7 * 12])
                    point2 = plus(gridCenter, [(parseInt(i) - 7) * gridScale, 50 * s + 7 * 12])
                }
            } else {
                if (mode.action == "in") {
                    point1 = plus(gridCenter, [50 * (s - 1) - 7 * 12, (parseInt(i) - 15 - 7) * gridScale])
                    point2 = plus(gridCenter, [50 * (s - 1) + 7 * 12, (parseInt(i) - 15 - 7) * gridScale])
                } else if (mode.action == "out") {
                    point1 = plus(gridCenter, [50 * s - 7 * 12, (parseInt(i) - 15 - 7) * gridScale])
                    point2 = plus(gridCenter, [50 * s + 7 * 12, (parseInt(i) - 15 - 7) * gridScale])
                }
            }
            gridLines[i].setAttribute("d", line(point1, point2))

            if (mode.action == "in") {
                gridLines[i].style.strokeWidth = Math.abs(s * 0.3)
            } else if (mode.action == "out") {
                gridLines[i].style.strokeWidth = Math.abs(0.3 - s * 0.3)
            }
        }
    }
}
