adventofcode.activate(3);

adventofcode.day3_part1 = function(input) {
    input = input.split("\n");

    return this.day3_check_slope(input, 3, 1);
};

adventofcode.day3_part2 = function(input) {
    input = input.split("\n");

    return this.day3_check_slope(input, 1, 1)
         * this.day3_check_slope(input, 3, 1)
         * this.day3_check_slope(input, 5, 1)
         * this.day3_check_slope(input, 7, 1)
         * this.day3_check_slope(input, 1, 2);
};

adventofcode.day3_check_slope = function(field, right, down) {
    const field_width = field[0].length;

    let trees_encountered = 0;
    let pos_x = 0;

    for (let i=down; i<field.length; i+=down) {
        pos_x = (pos_x + right) % field_width;

        if (field[i][pos_x] === '#') {
            trees_encountered++;
        }
    }

    return trees_encountered;
};