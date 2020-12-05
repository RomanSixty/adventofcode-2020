adventofcode.activate(4);

adventofcode.day4_part1 = function(input) {
    let passports = input.split("\n\n");

    let valid_passports = 0;

    passports.forEach(data => {
        if (data.includes('byr') &&
            data.includes('iyr') &&
            data.includes('eyr') &&
            data.includes('hgt') &&
            data.includes('hcl') &&
            data.includes('ecl') &&
            data.includes('pid')) {
            valid_passports++;
        }
    });

    return valid_passports;
};

adventofcode.day4_part2 = function(input) {
    let passports = input.split("\n\n");

    let valid_passports = 0;

    while (passports.length > 0) {
        let passport = passports.pop();

        let validated_fields = 0;

        passport.split(/\s/).forEach(data => {
            [key, value] = data.split(':');

            if ((key === 'byr' && value >= 1920 && value <= 2002) ||
                (key === 'iyr' && value >= 2010 && value <= 2020) ||
                (key === 'eyr' && value >= 2020 && value <= 2030)) {
                validated_fields++;
            } else if ((key === 'hcl' && value.match(/^#[0-9a-f]{6}$/)) ||
                       (key === 'ecl' && value.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/)) ||
                       (key === 'pid' && value.match(/^[0-9]{9}$/))) {
                validated_fields++;
            } else if (key === 'hgt') {
                let height = parseInt(value);

                if ((value.includes('in') && height >=  59 && height <=  76) ||
                    (value.includes('cm') && height >= 150 && height <= 193)) {
                    validated_fields++;
                }
            }
        });

        if (validated_fields === 7) {
            valid_passports++;
        }
    }

    return valid_passports;
};