window.setInterval(sizeRun, 1);

sizeIterator = 0
sizeModeIndex = 0
minIconSize = 14
sizeCenter = [150.0, 150.0]

sizeIcon = document.getElementById("size_icon");
sizeLines = new Array(4);
for (i in [...Array(4).keys()]) {
    console.log("size_line_" + (i + 1));
    sizeLines[i] = document.getElementById("size_line_" + (parseInt(i) + 1));
}
sizeText = document.getElementById("size_text")

function line(point1, point2) {
    return "M " + point1[0] + "," + point1[1] + " L " + point2[0] + "," + point2[1];
}

function plus(point1, point2) {
    return [
        point1[0] + point2[0],
        point1[1] + point2[1],
    ]
}

function sizeRun() {

    [sizeIterator, sizeModeIndex] =
        increment(sizeIterator, sizeModeIndex, sizeModes);

    mode = sizeModes[sizeModeIndex]

    if (mode.action == "change") {

        scale = (sizeIterator / mode.steps * 2) - 1
        scale = smooth(smooth(scale));
        scale = (scale + 1) / 2

        if (mode.direction == 1) {
            scale = 1 + scale * 8.49
        } else {
            scale = 9.5 - scale * 8.49
        }

        sizeIcon.setAttribute(
            "transform",
            "translate(150,150) scale(" + scale + ") translate(-584,-24)"
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
        sizeText.innerHTML = Math.floor(s * 2) + " px"
    }
}
