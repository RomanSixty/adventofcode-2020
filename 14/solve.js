adventofcode.activate(14);

adventofcode.day14_part1 = function(input) {
    return this.day14_solve(input, 1);
};

adventofcode.day14_part2 = function(input) {
    return this.day14_solve(input, 2);
};

adventofcode.day14_solve = function(input, part) {
    input = input.split("\n");

    let memory = {};
    let mask = '';

    input.forEach(line => {
        const [operation, op_value] = line.match(/^(mask|mem\[[0-9]+]) = ([0-9X]+)$/);

        if (operation === 'mask') {
            mask = op_value;
        } else {
            const [dummy, memory_address] = operation.match(/mem\[([0-9]+)]/);

            if (part === 1) {
                // convert number in a string to the binary representation as array
                // with the same length as the bitmask
                let binary = parseInt(op_value).toString(2).padStart(mask.length, '0').split('');

                for (let i in binary) {
                    if (mask[i] !== 'X') {
                        binary[i] = mask[i];
                    }
                }

                memory[memory_address] = parseInt(binary.join(''), 2);
            } else {
                // compile a list of addresses to write to
                let address_list = [parseInt(memory_address).toString(2).padStart(mask.length, '0').split('')];

                for (let position = 0; position < mask.length; position++) {
                    if (mask[position] === '1') {
                        address_list.forEach((value, index) => address_list[index][position] = '1');
                    }
                    else if (mask[position] === 'X') {
                        // each 'X' duplicates the current address list with 0 and 1 on the current position
                        address_list.forEach((value, index) => {
                            // damn JS for its reference fetish...
                            let mask_base = JSON.parse(JSON.stringify(address_list[index]));

                            address_list[index][position] = '0';

                            mask_base[position] = '1';

                            address_list.push(mask_base);
                        });
                    }
                }

                // finally write the value to all found addresses
                address_list.forEach(address => {
                    address = address.join('');

                    memory[address] = parseInt(op_value);
                });
            }
        }
    });

    let sum = 0;

    for(let mem in memory) {
        sum += memory[mem];
    }

    return sum;
};