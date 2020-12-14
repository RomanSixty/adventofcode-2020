adventofcode.activate(13);

adventofcode.day13_part1 = function(input) {
    let [timestamp, bus_ids] = input.split("\n");

    bus_ids = bus_ids.split(',').filter(value => value !== 'x').map(value => parseInt(value));

    // first key: waiting time
    // second key: bus ID
    let shortest_waiting = [999, 999];

    bus_ids.forEach((value, index) => {
        const waiting_time = Math.ceil(timestamp/value)*value - timestamp;

        if (waiting_time < shortest_waiting[0]) {
            shortest_waiting[0] = waiting_time;
            shortest_waiting[1] = value;
        }
    });

    return shortest_waiting[0] * shortest_waiting[1];
};

adventofcode.day13_part2 = function(input) {
    const [dummy, bus_ids] = input.split("\n");

    // prepare a list of only the relevant bus departures
    // with array elements busID and delay
    let departures = bus_ids.split(',')
                            .map((bus_id, delay) => bus_id === 'x' ? 0 : {busID: parseInt(bus_id), busDelay: delay})
                            .filter(element => element !== 0);

    // first bus has no delay, its ID is the base multiplier to check all other buses against
    let multiplier = departures.shift().busID;

    let timestamp = 0;

    for (let dep of departures) {
        while (true) {
            if((timestamp + dep.busDelay) % dep.busID === 0) {
                multiplier *= dep.busID;
                break;
            }

            timestamp += multiplier;
        }
    }

    return timestamp;
};