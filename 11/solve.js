adventofcode.activate(11);

adventofcode.day11_part1 = function(input) {
    return this.day11_solve(input, 1);
};

adventofcode.day11_part2 = function(input) {
    return this.day11_solve(input, 2);
};

adventofcode.day11_solve = function(input, part) {
    let cb_function = this.day11_seat_occupation_1;
    let occupied_needed = 4;

    if (part === 2) {
        cb_function = this.day11_seat_occupation_2;
        occupied_needed = 5;
    }

    let grid = input.split("\n");

    this.grid_width  = grid[0].length;
    this.grid_height = grid.length;

    let states = [grid];

    let unstable = true;

    while (unstable) {
        unstable = false;

        const old_state = states[states.length - 1];
        let new_state = [];

        for (let row in old_state) {
            row = parseInt(row);

            new_state[row] = [];

            for (let col in old_state[row]) {
                col = parseInt(col);

                new_state[row][col] = old_state[row][col];

                switch (old_state[row][col]) {
                    case '#':
                        if (cb_function(old_state, row, col) >= occupied_needed) {
                            new_state[row][col] = 'L';
                            unstable = true;
                        }
                        break;
                    case 'L':
                        if (cb_function(old_state, row, col) === 0) {
                            new_state[row][col] = '#';
                            unstable = true;
                        }
                        break;
                }
            }
        }

        states.push(new_state);
    }

    const final_state = states[states.length - 1].join('').replace(/[^#]+/g, '');

    return final_state.length;
};

/**
 * Part 1: check directly adjacent seats
 * @param {String} grid last state of affairs
 * @param {int} row
 * @param {int} col
 * @returns {number} of adjacent occupied seats
 */
adventofcode.day11_seat_occupation_1 = function(grid, row, col) {
    let count_occupied = 0;

    const not_first_col = col > 0;
    const not_last_col  = col < adventofcode.grid_width - 1;

    if (not_first_col && grid[row][col-1] === '#') { count_occupied++; }
    if (not_last_col  && grid[row][col+1] === '#') { count_occupied++; }

    if (row > 0) {
        if (grid[row-1][col] === '#') { count_occupied++; }

        if (not_first_col && grid[row-1][col-1] === '#') { count_occupied++; }
        if (not_last_col  && grid[row-1][col+1] === '#') { count_occupied++; }
    }

    if (row < adventofcode.grid_height - 1) {
        if (grid[row+1][col] === '#') { count_occupied++; }

        if (not_first_col && grid[row+1][col-1] === '#') { count_occupied++; }
        if (not_last_col  && grid[row+1][col+1] === '#') { count_occupied++; }
    }

    return count_occupied;
};

/**
 * Part 2: check visible seats
 * @param {String} grid last state of affairs
 * @param {int} row
 * @param {int} col
 * @returns {number} of visibly occupied seats
 */
adventofcode.day11_seat_occupation_2 = function(grid, row, col) {
    let count_occupied = 0;

    // N ↑
    for (let r = row - 1; r >= 0; r--) {
        if (grid[r][col] === '#') {
            count_occupied++;
            break;
        } else if (grid[r][col] === 'L') {
            break;
        }
    }

    // NE ↗
    for (let r = row - 1, c = col + 1; r >= 0 && c < adventofcode.grid_width; r--, c++) {
        if (grid[r][c] === '#') {
            count_occupied++;
            break;
        } else if (grid[r][c] === 'L') {
            break;
        }
    }

    // E →
    for (let c = col + 1; c < adventofcode.grid_width; c++) {
        if (grid[row][c] === '#') {
            count_occupied++;
            break;
        } else if (grid[row][c] === 'L') {
            break;
        }
    }

    // SE ↘
    for (let r = row + 1, c = col + 1; r < adventofcode.grid_height && c < adventofcode.grid_width; r++, c++) {
        if (grid[r][c] === '#') {
            count_occupied++;
            break;
        } else if (grid[r][c] === 'L') {
            break;
        }
    }

    // S ↓
    for (let r = row + 1; r < adventofcode.grid_height; r++) {
        if (grid[r][col] === '#') {
            count_occupied++;
            break;
        } else if (grid[r][col] === 'L') {
            break;
        }
    }

    // SW ↙
    for (let r = row + 1, c = col - 1; r < adventofcode.grid_height && c >= 0; r++, c--) {
        if (grid[r][c] === '#') {
            count_occupied++;
            break;
        } else if (grid[r][c] === 'L') {
            break;
        }
    }

    // W ←
    for (let c = col - 1; c >= 0; c--) {
        if (grid[row][c] === '#') {
            count_occupied++;
            break;
        } else if (grid[row][c] === 'L') {
            break;
        }
    }

    // NW ↖
    for (let r = row - 1, c = col - 1; r >= 0 && c >= 0; r--, c--) {
        if (grid[r][c] === '#') {
            count_occupied++;
            break;
        } else if (grid[r][c] === 'L') {
            break;
        }
    }

    return count_occupied;
};