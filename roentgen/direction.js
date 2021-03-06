window.setInterval(directionRun, 25);

directionIcon = icons.cctv

directionSector = document.getElementById("direction_sector");
directionIconFill = document.getElementById("direction_icon");
directionIconFill.setAttribute("d", directionIcon.d)
directionText = document.getElementById("direction_text");

// Initialization.

modeIndex = 0;
directionIterator = 0;

function directionRun() {

    minSectorSize = 10;
    maxSectorSize = 25;
    radius = 120;
    directionCenter = [150, 140];

    directionIterator = (directionIterator < 360) ? directionIterator + 4 : 0

    // Convert to [-1, 1].
    if (directionIterator >= 90 && directionIterator <= 270) {
        d = (directionIterator - 180) / 90;
    } else {
        d = (directionIterator >= 270) ? directionIterator / 90 : (directionIterator - 360) / 90
    }
    d = smooth(smooth(d));
    speed = Math.abs(d);

    // Convert back.
    if (directionIterator >= 90 && directionIterator <= 270) {
        d = d * 90 + 180;
    } else {
        d = (d >= 0) ? d * 90 : d * 90 + 360;
    }
    size = maxSectorSize - speed * (maxSectorSize - minSectorSize);
    directionText.innerHTML = "direction: " + Math.round(d);
    degree = d - 90;

    scale = directionIterator > 180 ? "-4,4" : "4";
    point1 = descartes(degree - size, directionCenter, radius);
    point2 = descartes(degree + size, directionCenter, radius);

    directionSector.setAttribute(
        "d",
        "M " + toCoordinates(point1) + " L " + toCoordinates(directionCenter)
        + " L " + toCoordinates(point2)
    )
    directionIconFill.setAttribute(
        "transform",
        "translate(150,150) scale(" + scale + ") "
        + "translate(" + directionIcon.x + "," + directionIcon.y + ")"
    )
}
