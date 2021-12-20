window.setInterval(sizeRun, 25);

sizeIterator = 0
sizeModeIndex = 0
minIconSize = 14
maxIconSize = 128
sizeCenter = [150.0, 150.0]
sizeIcons = [
    icons.diving_platform,
    icons.wind_turbine,
    icons.binoculars,
    icons.telescope_radio,
    icons.mausoleum, // toy_horse
]
sizeIconIndex = 0
sizeCanvas = document.getElementById("size_canvas");
sizeIconFill = document.getElementById("size_icon");

sizeLines = new Array(4);

for (i in [...Array(4).keys()]) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.style.stroke = "#555";
    path.style.strokeWidth = "1px";
    sizeCanvas.appendChild(path);

    sizeLines[i] = path;
}
sizeText = document.getElementById("size_text")

function changeGridOpacity(opacity) {
    for (i in [...Array(4).keys()]) {
        sizeLines[i].style.opacity = opacity;
    }
}

function sizeRun() {

    if (sizeIterator == 0 && sizeModeIndex == 0) {
        sizeIcon = sizeIcons[sizeIconIndex]
        sizeIconFill.setAttribute("d", sizeIcon.d)
        sizeIconIndex = sizeIconIndex < sizeIcons.length - 1 ? sizeIconIndex + 1 : 0
        sizeIconFill.setAttribute(
            "transform",
            "translate(150,150) "
            + "translate(" + sizeIcon.x + "," + sizeIcon.y + ")"
        )
    }

    [sizeIterator, sizeModeIndex] =
        increment(sizeIterator, sizeModeIndex, sizeModes, 3);

    sizeMode = sizeModes[sizeModeIndex]

    sizeScale = (sizeIterator / sizeMode.steps * 2) - 1
    sizeScale = smooth(smooth(sizeScale));
    sizeScale = (sizeScale + 1) / 2

    if (sizeMode.action == "change") {

        maxScale = maxIconSize / minIconSize

        if (sizeMode.direction == 1) {
            sizeScale = 1 + (sizeScale * (maxScale - 1))
        } else {
            sizeScale = maxScale - sizeScale * (maxScale - 1)
        }

        sizeIconFill.setAttribute(
            "transform",
            "translate(150,150) scale(" + sizeScale + ") "
            + "translate(" + sizeIcon.x + "," + sizeIcon.y + ")"
        )
        s = sizeScale * minIconSize / 2

        p = [
            [[-s - 20, -s], [s + 20, -s]],
            [[-s - 20, s], [s + 20, s]],
            [[-s, -s - 20], [-s, s + 20]],
            [[s, -s - 20], [s, s + 20]],
        ]
        for (i in [...Array(4).keys()]) {
            sizeLines[i].setAttribute("d",
                line(plus(sizeCenter, p[i][0]), plus(sizeCenter, p[i][1])))
        }
        sizeText.setAttribute("x", 150 + s + 70)
        sizeText.innerHTML = Math.round(s * 2) + " px"
    } else if (sizeMode.action == "fade_in") {
        sizeIconFill.style.opacity = sizeScale
        sizeText.style.opacity = sizeScale
    } else if (sizeMode.action == "fade_out") {
        sizeIconFill.style.opacity = (1 - sizeScale)
        sizeText.style.opacity = (1 - sizeScale)
    } else if (sizeMode.action == "grid_fade_in") {
        changeGridOpacity(sizeScale)
    } else if (sizeMode.action == "grid_fade_out") {
        changeGridOpacity(1 - sizeScale)
    // Next two modes make Safari happy: opacity should be exactly 0 or 1.
    } else if (sizeMode.action == "after_grid_fade_in") {
        changeGridOpacity(1)
    } else if (sizeMode.action == "after_grid_fade_out") {
        changeGridOpacity(0)
    }
}
