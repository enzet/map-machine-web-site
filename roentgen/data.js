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
    {action: "fade_in", steps: 50},
    {action: "pause", steps: 50},
    {action: "grid_fade_in", steps: 50},
    {action: "change", direction: 1, steps: 100},
    {action: "grid_fade_out", steps: 50},
    {action: "pause", steps: 100},
    {action: "grid_fade_in", steps: 50},
    {action: "change",  direction: -1, steps: 100},
    {action: "grid_fade_out", steps: 50},
    {action: "pause", steps: 50},
    {action: "fade_out", steps: 50},
]

gridModes = [
    {action: "in", steps: 40},
    {action: "stroke", steps: 100},
    {action: "pause", steps: 20},
    {action: "fill", steps: 100},
    {action: "out", steps: 40},
    {action: "pause", steps: 50},
    {action: "unfill", steps: 50},
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
