adventofcode.activate(15);

adventofcode.day15_part1 = function(input) {
    return this.day15_get_nth_number(input, 2020);
};

adventofcode.day15_part2 = function(input) {
    return this.day15_get_nth_number(input, 30000000);
};

adventofcode.day15_get_nth_number = function(input, turns) {
    const numbers = input.split(',').map(value => parseInt(value));

    // contains the turn all numbers up to the second last number have been last spoken
    let turn_last_spoken = {};

    let number;

    numbers.forEach((value, index) => {
        if (index < numbers.length - 1) { // up to second last number...
            turn_last_spoken[value] = index;
        } else {
            number = value; // last number
        }
    });

    // for high turn counts we could check for loops to boost performance
    // but this is still reasonably fast for a one-off task

    for (let turn = numbers.length; turn < turns; turn++) {
        let new_number = 0;

        if (typeof turn_last_spoken[number] !== 'undefined') {
            new_number = turn-1 - turn_last_spoken[number];
        }

        turn_last_spoken[number] = turn-1;

        number = new_number;
    }

    return number;
};