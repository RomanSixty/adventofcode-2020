adventofcode.activate(2);

adventofcode.day2_part1 = function(input) {
    input = input.split("\n");

    let valid_passwords = 0;

    input.forEach(line => {
        [source, min, max, letter, password] = line.match(/^([0-9]+)-([0-9]+) ([a-z]): ([a-z]+)$/);

        let lettercount = 0;

        for (let i=0; i<password.length; i++) {
            if (password[i] === letter) {
                lettercount++;
            }
        }

        if (lettercount >= min && lettercount <= max) {
            valid_passwords++;
        }
    });

    return valid_passwords;
};

adventofcode.day2_part2 = function(input) {
    input = input.split("\n");

    let valid_passwords = 0;

    input.forEach(line => {
        [source, pos1, pos2, letter, password] = line.match(/^([0-9]+)-([0-9]+) ([a-z]): ([a-z]+)$/);

        let matches = 0;

        if (password[pos1-1] === letter) {
            matches++;
        }

        if (password[pos2-1] === letter) {
            matches++;
        }

        if (matches === 1) {
            valid_passwords++;
        }
    });

    return valid_passwords;
};