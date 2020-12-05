adventofcode.activate(1);

adventofcode.day1_part1 = function(input) {
    input = input.split("\n");

    input = input.map(value => parseInt(value));

    let found = 0;

    input.some(value => {
        found = value;
        return input.includes(2020-value);
    });

    return found*(2020-found);
};

adventofcode.day1_part2 = function(input) {
    input = input.split("\n");

    input = input.map(value => parseInt(value));

    let found1, found2 = 0;

    while (input.length > 0) {
        found1 = input.pop();

        found2 = 0;

        if (input.some(value => {
            found2 = value;
            return input.includes(2020-found1-value);
        })) {
            break;
        }
    }

    return found1*found2*(2020-found1-found2);
};