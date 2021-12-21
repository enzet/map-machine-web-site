window.setInterval(gridRun, 25);

gridIterator = 0
gridModeIndex = 0
gridCenter = [150.5, 150.5]
gridScale = 12
gridIcons = [
    icons.city_gate,
    icons.fountain_toret,
    icons.crane,
    icons.telephone,
    icons.two_people_together,
]
gridIconIndex = 0


gridCanvas = document.getElementById("grid_canvas");
gridIconFill = document.getElementById("grid_icon");
gridIconStroke = document.getElementById("grid_icon_stroke");
gridLines = new Array(30);


for (i in [...Array(30).keys()]) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");  
    path.style.stroke = "#555";
    path.style.strokeWidth = "1px";
    gridCanvas.prepend(path);

    gridLines[i] = path;
}

function gridRun() {

    if (gridIterator == 0 && gridModeIndex == 0) {

        gridIcon = gridIcons[gridIconIndex]

        gridIconFill.setAttribute("d", gridIcon.d)
        gridIconFill.setAttribute(
            "transform",
            "translate(150,150) scale(" + gridScale + ") "
            + "translate(" + gridIcon.x + "," + gridIcon.y + ")"
        )
        gridIconStroke.setAttribute("d", gridIcon.d)
        gridIconStroke.setAttribute(
            "transform",
            "translate(150,150) scale(" + gridScale + ") "
            + "translate(" + gridIcon.x + "," + gridIcon.y + ")"
        )
        gridIconIndex = gridIconIndex < gridIcons.length - 1 ? gridIconIndex + 1 : 0
    }

    [gridIterator, gridModeIndex] =
        increment(gridIterator, gridModeIndex, gridModes, 2);

    mode = gridModes[gridModeIndex]

    for (i in [...Array(30).keys()]) {

        if (i < 15) {
            localIterator = gridIterator // + i * 2
        } else {
            localIterator = gridIterator // + (i - 15) * 2 // Try also (i - 35).
        }

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
                gridLines[i].style.opacity = s
            } else if (mode.action == "out") {
                gridLines[i].style.opacity = 1 - s
            }
        }
        if (mode.action == "stroke") {
            gridIconStroke.style.opacity = s2
        }
        if (mode.action == "fill") {
            gridIconFill.style.opacity = s2
            gridIconStroke.style.opacity = 1 - s2
        }
        if (mode.action == "unfill") {
            gridIconStroke.setAttribute("d", "")
            gridIconFill.style.opacity = 1 - s2
        }
    }
}
