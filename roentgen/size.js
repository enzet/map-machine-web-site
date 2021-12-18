window.setInterval(sizeRun, 1);

sizeIterator = 0
sizeModeIndex = 0

sizeIcon = document.getElementById("size_icon");
sizeLine1 = document.getElementById("size_line_1")
sizeLine2 = document.getElementById("size_line_2")
sizeLine3 = document.getElementById("size_line_3")
sizeLine4 = document.getElementById("size_line_4")
sizeText = document.getElementById("size_text")

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
        s = scale * 7

        sizeLine1.setAttribute("d", "M " + (150 - s - 20) + "," + (150 - s) + " L " + (150 + s + 20) + "," + (150 - s))
        sizeLine2.setAttribute("d", "M " + (150 - s - 20) + "," + (150 + s) + " L " + (150 + s + 20) + "," + (150 + s))
        sizeLine3.setAttribute("d", "M " + (150 - s) + "," + (150 - s - 20) + " L " + (150 - s) + "," + (150 + s + 20))
        sizeLine4.setAttribute("d", "M " + (150 + s) + "," + (150 - s - 20) + " L " + (150 + s) + "," + (150 + s + 20))
        sizeText.setAttribute("x", 150 + s + 70)
        sizeText.innerHTML = Math.floor(s * 2) + " px"
    }

//    scale = directionIterator / 180 - 1 // [-1, 1]
//    scale = Math.PI * (scale + 0.5); // [-0.5pi, 1.5pi]
//    scale = Math.sin(scale) // [-1, 1]
//    scale = Math.PI * scale / 2; // [-0.5pi, 1.5pi]
//    scale = Math.sin(scale) // [-1, 1]
//
//    scale = 1 + (scale + 1) * 4.25

}
