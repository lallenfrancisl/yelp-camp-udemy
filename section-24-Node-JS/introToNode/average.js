/**
 * Computes the average of the array passed
 * @param {Array} array
 */
function average (array) {
    let sum = 0;

    for (let i = 0; i < array.length; ++i) {
        sum += array[i];
    }

    return Math.round(sum / array.length);
}


let array1 = [90, 98, 89, 100, 100, 86, 94];
console.log(average(array1));
