adventofcode.activate(8);

adventofcode.day8_part1 = function(input) {
    const program = this.day8_parse(input);

    this.accumulator = 0;

    this.day8_run(program);

    return this.accumulator;
};

adventofcode.day8_part2 = function(input) {
    const program = this.day8_parse(input);

    // we could do it faster if we only checked lines we encounter during a program run
    // but then I'd have to keep track of every run, handle duplicates and so on
    // this runs reasonably fast, so I'll skip the optimization process in favor of readability

    for (let change = 0; change < program.length; change++) {
        if (program[change][0] === 'acc' || (program[change][0] === 'nop' && program[change][1] === 0)) {
            continue;
        }

        this.accumulator = 0;

        // deep copy... otherwise JS messes with references
        let new_program = JSON.parse(JSON.stringify(program));

        new_program[change][0] = new_program[change][0] === 'nop' ? 'jmp' : 'nop';

        if (this.day8_run(new_program)) {
            break;
        }
    }

    return this.accumulator;
};

/**
 * parse the input to a nested array containing the operation as first and its modifier as second key
 * @param {String} input
 * @returns {Array[]}
 */
adventofcode.day8_parse = function(input) {
    let program = [];

    input.split("\n").forEach(line => {
        let [instruction, modifier] = line.split(" ");

        program.push([instruction, parseInt(modifier)]);
    });

    return program;
};

/**
 * run the program, keep track of infinite loops
 * @param {Array[]} program
 * @returns {boolean} run without encountering an infinite loop?
 */
adventofcode.day8_run = function(program) {
    let seen_instruction = [];
    let location = 0;
    let infinite_loop = false;

    while (!(infinite_loop = seen_instruction.includes(location)) && location < program.length) {
        seen_instruction.push(location);

        console.log(program[location]);

        switch (program[location][0]) {
            case 'acc':
                this.accumulator += program[location][1];
                location++;
                break;
            case 'jmp':
                location += program[location][1];
                break;
            case 'nop':
                location++;
                break;
        }
    }

    return !infinite_loop;
};