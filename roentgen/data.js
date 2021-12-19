cctv = "M 580 19 C 578.892 19 578 19.892 578 21 L 578 22 C 578 23.108 578.892 24 580 24 L 581.27344 24 A 2 2 0 0 0 582 24.716797 L 582 25.382812 L 579 26.882812 L 579 26 L 578 26 L 578 30 L 579 30 L 579 28.994141 A 1 1 0 0 0 579.44727 28.894531 L 583.44727 26.894531 A 1.0001 1.0001 0 0 0 584 26 L 584 24.716797 A 2 2 0 0 0 584.72656 24 L 585 24 L 587 24 L 587 22 L 587 21 L 587 20.5 L 588.5 19 L 585 19 L 584 19 L 580 19 z M 588.91406 20 L 588 20.914062 L 588 23 L 589.5 23 C 589.777 23 590 22.777 590 22.5 L 590 20.5 C 590 20.223 589.777 20 589.5 20 L 588.91406 20 z";

show = {
    "amenity: bench": "bench_no_backrest",
    "memorial: bench": "bench_with_sculpture",
};

benchModes = [
    {action: "write", from: "", to: "amenity: bench"},
    {action: "pause", steps: 20},
    {action: "clear", from: "amenity: bench", to: ""},
    {action: "write", from: "", to: "memorial: bench"},
    {action: "pause", steps: 20},
    {action: "clear", from: "memorial: bench", to: ""},
];

sizeModes = [
    {action: "change", direction: 1, steps: 200},
    {action: "pause", steps: 200},
    {action: "change",  direction: -1, steps: 200},
    {action: "pause", steps: 200},
]

gridModes = [
    {action: "in", steps: 100},
    {action: "pause", steps: 100},
    {action: "out", steps: 100},
]

speedModes = [
    {action: "pause", steps: 5},
    {action: "write", from: "", to: "maxspeed: 42"},
    {action: "pause", steps: 10},
    {action: "clear", from: "maxspeed: 42", to: "maxspeed: "},
    {action: "pause", steps: 5},
    {action: "write", from: "maxspeed: ", to: "maxspeed: 70"},
    {action: "pause", steps: 10},
    {action: "clear", from: "maxspeed: 70", to: "maxspeed: "},
    {action: "pause", steps: 5},
    {action: "write", from: "maxspeed: ", to: "maxspeed: 35"},
    {action: "pause", steps: 10},
    {action: "clear", from: "maxspeed: 35", to: "maxspeed: "},
    {action: "pause", steps: 5},
    {action: "write", from: "maxspeed: ", to: "maxspeed: 65"},
    {action: "pause", steps: 20},
    {action: "clear", from: "maxspeed: 65", to: ""},
];
