adventofcode.activate(6);

adventofcode.day6_part1 = function(input) {
    let groups = input.split("\n\n");

    let counter = 0;

    groups.forEach(group => {
        group = group.replaceAll("\n", "");

        let answers = group.split("");

        let unique_answers = answers.filter(function(value, index, self) {
            return self.indexOf(value) === index;
        });

        counter += unique_answers.length;
    });

    return counter;
};

adventofcode.day6_part2 = function(input) {
    let groups = input.split("\n\n");

    let counter = 0;

    groups.forEach(group => {
        let persons = group.split("\n");

        // sort by length of answers, to only check against the shortest list of answers
        persons.sort((a, b) => { return a.length - b.length });

        if (persons.length === 1) {
            counter += persons[0].length;
        } else {
            for (let i = 0; i < persons[0].length; i++) {
                let answered_by_all = true;

                for (let j = 1; j < persons.length; j++) {
                    if (!persons[j].includes(persons[0][i])) {
                        answered_by_all = false;
                        break;
                    }
                }

                if (answered_by_all) {
                    counter++;
                }
            }
        }
    });

    return counter;
};