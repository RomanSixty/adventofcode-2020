adventofcode.activate(9);

adventofcode.day9_part1 = function(input) {
    const numbers = input.split("\n").map(value => parseInt(value));

    return this.day9_get_breaker(numbers);
};

adventofcode.day9_part2 = function(input) {
    const numbers = input.split("\n").map(value => parseInt(value));

    const broken_number = this.day9_get_breaker(numbers);

    let i, j;

    outer: for (i = 0; i < numbers.length; i++) {
        let sum = numbers[i];

        for (j = i+1; j < numbers.length; j++) {
            sum += numbers[j];

            if (sum > broken_number) {
                break;
            } else if (sum === broken_number) {
                break outer;
            }
    }

    const summands = numbers.slice(i, j+1);

    summands.sort();

    return summands.pop() + summands.shift();
};

/**
 * return the first number that doesn't add up (literally)
 * @param {Array} numbers
 * @param {int} preamble_length
 * @returns {int}
 */
adventofcode.day9_get_breaker = function(numbers, preamble_length = 25) {
    let current_number = 0;

    for (let i = preamble_length; i < numbers.length; i++) {
        current_number = numbers[i];

        let compare = numbers.slice(i - preamble_length, i);

        let works_out = false;

        // we need at least 2 values left to compare to each other
        while (compare.length > 1) {
            let check = compare.pop();

            if (compare.includes(current_number - check)) {
                works_out = true;
                break;
            }
        }

        if (!works_out) {
            break;
        }
    }

    return current_number;
};