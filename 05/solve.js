adventofcode.activate(5);

adventofcode.day5_part1 = function(input) {
    input = input.split("\n");

    let max_id = 0;

    input.forEach(seat => {
        max_id = Math.max(max_id, this.day5_get_seat_id(seat));
    });

    return max_id;
};

adventofcode.day5_part2 = function(input) {
    input = input.split("\n");

    let min_id = 1024, max_id = 0;

    let seats = [];

    input.forEach(seat => {
        let seat_id = this.day5_get_seat_id(seat);

        seats.push(seat_id);

        min_id = Math.min(min_id, seat_id);
        max_id = Math.max(max_id, seat_id);
    });

    for (let i = min_id+1; i < max_id; i++) {
        if (!seats.includes(i)) {
            return i;
        }
    }
};

adventofcode.day5_get_seat_id = function(seat) {
    let min_row = 0, max_row = 127;
    let min_col = 0, max_col = 7;

    seat = seat.split("");

    seat.forEach(char => {
        switch (char) {
            case 'F': max_row -= Math.floor((max_row - min_row) / 2); break;
            case 'B': min_row += Math.ceil((max_row - min_row) / 2); break;
            case 'L': max_col -= Math.floor((max_col - min_col) / 2); break;
            case 'R': min_col += Math.ceil((max_col - min_col) / 2); break;
        }
    });

    return Math.floor(min_row) * 8 + Math.floor(min_col);
};