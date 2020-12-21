adventofcode.activate(16);

adventofcode.day16_part1 = function(input) {
    this.day16_parse_input(input);

    let sum_invalid = 0;

    this.day16_nearby_tickets.forEach(ticket => {
        ticket.forEach(value => {
            let valid = false;

            for (let field in this.day16_fields) {
                if ((value >= this.day16_fields[field].boundary1[0] && value <= this.day16_fields[field].boundary1[1]) ||
                    (value >= this.day16_fields[field].boundary2[0] && value <= this.day16_fields[field].boundary2[1])) {
                    valid = true;
                    break;
                }
            }

            if (!valid) {
                sum_invalid += value;
            }
        });
    });

    return sum_invalid;
};

// this is (hopefully) the ugliest solution of this year's AOC... way too many nested loops for my taste
// but it's fast...
adventofcode.day16_part2 = function(input) {
    this.day16_parse_input(input);

    let valid_tickets = [adventofcode.day16_ticket];

    this.day16_nearby_tickets.forEach(ticket => {
        let ticket_valid = true;

        for (let pos = 0; pos < ticket.length; pos++) {
            let valid = false;

            for (let field in this.day16_fields) {
                if ((ticket[pos] >= this.day16_fields[field].boundary1[0] && ticket[pos] <= this.day16_fields[field].boundary1[1]) ||
                    (ticket[pos] >= this.day16_fields[field].boundary2[0] && ticket[pos] <= this.day16_fields[field].boundary2[1])) {
                    valid = true;
                    break;
                }
            }

            if (!valid) {
                ticket_valid = false;
                break;
            }
        }

        if (ticket_valid) {
            valid_tickets.push(ticket);
        }
    });

    // check each position of each ticket if it's plausible for each field boundary
    for (let field in this.day16_fields) {
        field_nr: for (let pos = 0; pos < this.day16_ticket.length; pos++) {
            for (let ticket of valid_tickets) {
                if (!(ticket[pos] >= this.day16_fields[field].boundary1[0] && ticket[pos] <= this.day16_fields[field].boundary1[1]) &&
                    !(ticket[pos] >= this.day16_fields[field].boundary2[0] && ticket[pos] <= this.day16_fields[field].boundary2[1])) {
                    continue field_nr;
                }
            }

            this.day16_fields[field].possibleKeys[pos] = true;
        }

        // transform object to array of keys for easier handling
        this.day16_fields[field].possibleKeys = Object.keys(this.day16_fields[field].possibleKeys);
    }

    // now we have a list of possible positions for each field, but there are many which may fit more than one position
    // so we need to weed out and check for fields with only one possibility and remove that from the other fields
    let changed = true;

    while (changed) {
        changed = false;

        for (let field in this.day16_fields) {
            if (this.day16_fields[field].possibleKeys.length === 1) {
                for (let field2 in this.day16_fields) {
                    if (field !== field2) {
                        let i = this.day16_fields[field2].possibleKeys.indexOf(this.day16_fields[field].possibleKeys[0]);

                        if (i !== -1) {
                            this.day16_fields[field2].possibleKeys.splice(i, 1);
                            changed = true;
                        }
                    }
                }
            }
        }
    }

    // now finally check the "departure" values of my own ticket and return their product

    let product = 1;

    for (let field in this.day16_fields) {
        if (field.match(/^departure/)) {
            product *= this.day16_ticket[this.day16_fields[field].possibleKeys[0]];
        }
    }

    return product;
};

adventofcode.day16_parse_input = function(input) {
    const [raw_fields, raw_ticket, raw_nearby_tickets] = input.split("\n\n");

    // own ticket
    adventofcode.day16_ticket = raw_ticket.replace(/your ticket:\n/, '').split(',').map(value => parseInt(value));

    // nearby tickets
    adventofcode.day16_nearby_tickets = [];

    raw_nearby_tickets.replace(/nearby tickets:\n/, '').split("\n").forEach(ticket => {
        adventofcode.day16_nearby_tickets.push(ticket.split(',').map(value => parseInt(value)));
    });

    // possible fields
    adventofcode.day16_fields = {};

    raw_fields.split("\n").forEach(line => {
        let matches = line.match(/^([^:]+): ([0-9]+)-([0-9]+) or ([0-9]+)-([0-9]+)$/);

        adventofcode.day16_fields[matches[1]] = {
            boundary1:    [parseInt(matches[2]), parseInt(matches[3])],
            boundary2:    [parseInt(matches[4]), parseInt(matches[5])],
            possibleKeys: {}
        };
    });
};