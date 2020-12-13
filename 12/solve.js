adventofcode.activate(12);

adventofcode.day12_part1 = function(input) {
    const nav_code = input.split("\n").map(value => [value[0], parseInt(value.substring(1))]);

    let ship_position = [0, 0];
    let ship_orientation = 90; // N:0, E:90, S:180, W:270

    nav_code.forEach(code => {
        // we treat "forward" the same as direction instructions
        if (code[0] === 'F') {
            switch (ship_orientation) {
                case   0: code[0] = 'N'; break;
                case  90: code[0] = 'E'; break;
                case 180: code[0] = 'S'; break;
                case 270: code[0] = 'W'; break;
            }
        }

        switch (code[0]) {
            case 'N': ship_position[0] -= code[1]; break;
            case 'E': ship_position[1] += code[1]; break;
            case 'S': ship_position[0] += code[1]; break;
            case 'W': ship_position[1] -= code[1]; break;

            case 'R': ship_orientation = (ship_orientation       + code[1]) % 360; break;
            case 'L': ship_orientation = (ship_orientation + 360 - code[1]) % 360; break;
        }
    });

    return Math.abs(ship_position[0]) + Math.abs(ship_position[1]);
};

adventofcode.day12_part2 = function(input) {
    const nav_code = input.split("\n").map(value => [value[0], parseInt(value.substring(1))]);

    let ship_position = [ 0,  0];
    let waypoint      = [-1, 10];

    nav_code.forEach(code => {
        // counterclockwise to clockwise conversion
        if (code[0] === 'L') {
            code[0] = 'R';

            if (code[1] === 90) {
                code[1] = 270;
            } else if (code[1] === 270) {
                code[1] = 90;
            }
        }

        switch (code[0]) {
            case 'N': waypoint[0] -= code[1]; break;
            case 'E': waypoint[1] += code[1]; break;
            case 'S': waypoint[0] += code[1]; break;
            case 'W': waypoint[1] -= code[1]; break;

            case 'F':
                for (let i = 0; i < code[1]; i++) {
                    ship_position[0] += waypoint[0];
                    ship_position[1] += waypoint[1];
                }
                break;

            case 'R':
                switch (code[1]) {
                    case  90: waypoint = [ waypoint[1], -waypoint[0]]; break;
                    case 180: waypoint = [-waypoint[0], -waypoint[1]]; break;
                    case 270: waypoint = [-waypoint[1],  waypoint[0]]; break;
                }
                break;
        }
    });

    return Math.abs(ship_position[0]) + Math.abs(ship_position[1]);
};