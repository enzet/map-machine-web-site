function descartes(degree, center, radius) {
    return {
        x: center.x + Math.cos(degree / 180 * Math.PI) * radius,
        y: center.y + Math.sin(degree / 180 * Math.PI) * radius
    };
}

function toCoordinates(vector) {
    return vector.x + "," + vector.y;
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