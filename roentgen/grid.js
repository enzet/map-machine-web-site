window.setInterval(gridRun, 25);

gridIterator = 0
gridModeIndex = 0
gridCenter = [150, 150]
gridScale = 12
icon = icons.cctv

gridCanvas = document.getElementById("grid_canvas");
gridIcon = document.getElementById("grid_icon");
gridIcon.setAttribute("d", icon.d)
gridIconStroke = document.getElementById("grid_icon_stroke");
gridIconStroke.setAttribute("d", icons.cctv.d)
gridLines = new Array(30);

gridIcon.setAttribute(
    "transform",
    "translate(150,150) scale(" + gridScale + ") "
    + "translate(" + icon.x + "," + icon.y + ")"
)
gridIconStroke.setAttribute(
    "transform",
    "translate(150,150) scale(" + gridScale + ") "
    + "translate(" + icon.x + "," + icon.y + ")"
)

for (i in [...Array(30).keys()]) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");  
    path.style.stroke = "#EEF";
    path.style.strokeWidth = "0.3px";
    gridCanvas.appendChild(path);

    gridLines[i] = path;
}

function gridRun() {

    [gridIterator, gridModeIndex] =
        increment(gridIterator, gridModeIndex, gridModes, 2);

    mode = gridModes[gridModeIndex]

    for (i in [...Array(30).keys()]) {

        if (i < 15) {
            localIterator = gridIterator // + i * 2
        } else {
            localIterator = gridIterator // + (i - 15) * 2 // Try also (i - 35).
        }

        console.log(localIterator)
        s = (smooth((localIterator / mode.steps * 2) - 1) + 1) / 2 // [0, 1]
        s2 = (smooth(smooth((localIterator / mode.steps * 2) - 1)) + 1) / 2 // [0, 1]

        if (mode.action == "in" || mode.action == "out") {
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
        if (mode.action == "fill") {
            gridIcon.style.opacity = s2
        }
        if (mode.action == "stroke") {
            gridIconStroke.style.opacity = s2
        }
        if (mode.action == "unfill") {
            gridIcon.style.opacity = 1 - s2
            gridIconStroke.style.opacity = 1 - s2
        }
    }
}
