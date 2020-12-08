adventofcode.activate(7);

adventofcode.day7_part1 = function(input) {
    const bag_list = this.day7_bag_list(input);

    let counter = 0;

    // list of colors to check
    // (will be added to in the loop below)
    let check_against = ['shiny gold'];

    // to not count the same colors multiple times
    this.already_checked = [];

    while (check_against.length > 0) {
        let found_colors = this.day7_contains_color(bag_list, check_against.pop());

        check_against = check_against.concat(found_colors);

        counter += found_colors.length;
    }

    return counter;
};

adventofcode.day7_part2 = function(input) {
    const bag_list = this.day7_bag_list(input);

    let sum = 0;

    for (let color in bag_list['shiny gold']) {
        sum += this.day7_get_content(bag_list, color, bag_list['shiny gold'][color]);
    }

    return sum;
};

/**
 * parse input and return a list of all colors and the
 * number and colors of bags they directly contain
 * @param {String} input
 * @returns {Object}
 */
adventofcode.day7_bag_list = function(input) {
    input = input.replace(/ bags?\.?/g, '');

    let bag_list = {};

    input.split("\n").forEach(bags => {
        let [outer_color, inner_bags] = bags.split(' contain ');

        bag_list[outer_color] = {};

        inner_bags = inner_bags.split(', ');

        inner_bags.forEach(inner => {
            if (inner !== 'no other') {
                bag_list[outer_color][inner.substring(2)] = parseInt(inner);
            }
        });
    });

    return bag_list;
};

/**
 * check which bags directly contain <inner_color>
 * @param {Object} bag_list from above
 * @param {String} inner_color to check
 * @returns {Array} color names directly containing <inner_color>
 */
adventofcode.day7_contains_color = function(bag_list, inner_color) {
    let colors = [];

    for (const outer_color in bag_list) {
        if (bag_list[outer_color].hasOwnProperty(inner_color) && !this.already_checked.includes(outer_color)) {
            colors.push(outer_color);

            this.already_checked.push(outer_color);
        }
    }

    return colors;
};

/**
 * recursively count the bag contents
 * @param {Object} bag_list from above
 * @param {String} color to check
 * @param {int} times how many outer bags (for multiplication)
 * @returns {int} number of bags contained
 */
adventofcode.day7_get_content = function(bag_list, color, times) {
    if (Object.keys(bag_list[color]).length > 0) {
        let sum = 0;

        for (let inner_color in bag_list[color]) {
            let contents = this.day7_get_content(bag_list, inner_color, bag_list[color][inner_color]);

            sum += contents;
        }

        return times + times * sum;
    } else {
        return times;
    }
};