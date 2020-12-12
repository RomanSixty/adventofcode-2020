adventofcode.activate(10);

adventofcode.day10_part1 = function(input) {
    let adapters = input.split("\n").map(value => parseInt(value));

    // outlet value
    adapters.push(0);

    // JavaScript sorts alphabetically, hence the custom sorting
    adapters.sort((a, b) => a - b);

    // differences...
    // the last one to the device is always 3, so it's initialized with 1 already
    let counters = [0, 0, 1];

    for (const i in adapters) {
        let diff = adapters[i] - adapters[i-1];

        counters[diff-1]++;
    }

    return counters[0] * counters[2];
};

adventofcode.day10_part2 = function(input) {
    let adapters = input.split("\n").map(value => parseInt(value));

    adapters.sort((a, b) => a - b);

    const final_device = adapters[adapters.length-1] + 3;

    adapters.push(final_device);

    // we sum up the number of possibilities leading to each of the adapters

    let arrangements = [ 1 ]; // one possibility is the starting point

    for (const i of adapters) {
        // we definitely have to keep the previous number of arrangements
        // additional arrangements may appear when the previous adapter had a
        // joltage difference of 2 or 1

        arrangements[i] = ( arrangements[i-3] || 0 ) + ( arrangements[i-2] || 0 ) + ( arrangements[i-1] || 0 );
    }

    return arrangements.pop();
};