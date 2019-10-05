/**
 * Prints a given string reps number of times
 * @param {String} str
 * @param {Integer} reps
 */
function echo(str, reps = 1) {
    for (let i = 0; i < reps; ++i) {
        console.log(str);
    }
}

echo("hello");
echo("world", 5);
