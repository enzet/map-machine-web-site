function descartes(degree, center, radius) {
    return [
        center[0] + Math.cos(degree / 180 * Math.PI) * radius,
        center[1] + Math.sin(degree / 180 * Math.PI) * radius,
    ];
}

function toCoordinates(vector) {
    return vector[0] + "," + vector[1];
}

function line(point1, point2) {
    return "M " + toCoordinates(point1) + " L " + toCoordinates(point2);
}

function plus(point1, point2) {
    return [
        point1[0] + point2[0],
        point1[1] + point2[1],
    ]
}

function smooth(value) {
    return Math.sin(value * Math.PI / 2);
}

function increment(iterator, modeIndex, modes) {

    mode = modes[modeIndex];

    if (iterator < mode.steps) {
        iterator += 1;
    } else {
        iterator = 0;
        if (modeIndex < modes.length - 1) {
            modeIndex += 1;
        } else {
            modeIndex = 0;
        }
    }
    return [iterator, modeIndex]
}