window.setInterval(sizeRun, 25);

sizeIterator = 0
sizeModeIndex = 0
minIconSize = 14
maxIconSize = 128
sizeCenter = [150.0, 150.0]
icon = icons.cctv

sizeIcon = document.getElementById("size_icon");
sizeIcon.setAttribute("d", icon.d)
sizeCanvas = document.getElementById("size_canvas");
sizeLines = new Array(4);

for (i in [...Array(4).keys()]) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.style.stroke = "#EEF";
    path.style.strokeWidth = "0.3px";
    sizeCanvas.appendChild(path);

    sizeLines[i] = path;
}
sizeText = document.getElementById("size_text")

function sizeRun() {

    [sizeIterator, sizeModeIndex] =
        increment(sizeIterator, sizeModeIndex, sizeModes, 3);

    mode = sizeModes[sizeModeIndex]

    if (mode.action == "change") {

        scale = (sizeIterator / mode.steps * 2) - 1
        scale = smooth(smooth(scale));
        scale = (scale + 1) / 2

        maxScale = maxIconSize / minIconSize

        if (mode.direction == 1) {
            scale = 1 + (scale * (maxScale - 1))
        } else {
            scale = maxScale - scale * (maxScale - 1)
        }

        sizeIcon.setAttribute(
            "transform",
            "translate(150,150) scale(" + scale + ") "
            + "translate(" + icon.x + "," + icon.y + ")"
        )
        s = scale * minIconSize / 2

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
    }
}
