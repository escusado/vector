/* eslint-disable */
"use strict";
exports.__esModule = true;
exports.generateTerrainMap = void 0;
/**
 * Generates a terrain map using the diamond square algorithm
 * @param size the size of the terrain map
 * @param range the degree of randomness
 */
function generateTerrainMap(size, range) {
    // Create a 2d array filled with zeros
    var map = new Array(size);
    for (var i = 0; i < size; i++) {
        // @ts-ignore (Array.prototype.fill is not yet in lib.d.ts)
        map[i] = new Array(size).fill(0);
    }
    /* Use the diamond step / cloud fractal algorithm to generate a random height map */
    // Initialise corners with random values (map[y][x])
    map[0][0] = Math.random() * range - 1;
    map[0][size - 1] = Math.random() * range - 1;
    map[size - 1][0] = Math.random() * range - 1;
    map[size - 1][size - 1] = Math.random() * range - 1;
    // Do an initial diamond and square step
    diamondStep(map, size, size, range);
    squareStep(map, size, size, range);
    // Calculate the next side length
    var sideLength = Math.floor(size / 2);
    // Loop until the side length is less than 2
    while (sideLength >= 2) {
        // Perform a diamond and a square step
        diamondStep(map, size, sideLength + 1, range);
        squareStep(map, size, sideLength + 1, range);
        // Half the side length and range
        sideLength = Math.floor(sideLength / 2);
        range = Math.floor(range / 2);
    }
    return map;
}
exports.generateTerrainMap = generateTerrainMap;
/**
 * Performs a diamond step
 * @param map the two dimensional terrain array
 * @param size the size of the map
 * @param sideLength the side length of the square
 * @param range
 */
function diamondStep(map, size, sideLength, range) {
    var halfSideLength = Math.floor(sideLength / 2);
    // For each row of squares
    for (var y = 0; y < Math.floor(size / (sideLength - 1)); y++) {
        // For each column of squares
        for (var x = 0; x < Math.floor(size / (sideLength - 1)); x++) {
            // Find the center of the square
            var centerX = x * (sideLength - 1) + halfSideLength;
            var centerY = y * (sideLength - 1) + halfSideLength;
            // Find the average corners value
            var average = (map[y * (sideLength - 1)][x * (sideLength - 1)] +
                map[(y + 1) * (sideLength - 1)][x * (sideLength - 1)] +
                map[y * (sideLength - 1)][(x + 1) * (sideLength - 1)] +
                map[(y + 1) * (sideLength - 1)][(x + 1) * (sideLength - 1)]) /
                4.0;
            // Set the center midpoint of the square to be the average of the four corner points plus a random value between -range to range
            map[centerY][centerX] =
                average + +(-range + Math.random() * (range - -range + 1));
        }
    }
}
/**
 * Performs a square step
 * @param map the two dimensional terrain array
 * @param size the size of the map
 * @param sideLength the side length of the diamond
 * @param range the degree of randomness
 */
function squareStep(map, size, sideLength, range) {
    var halfSideLength = Math.floor(sideLength / 2);
    // For each row of squares
    for (var y = 0; y < Math.floor(size / (sideLength - 1)); y++) {
        // For each column of squares
        for (var x = 0; x < Math.floor(size / (sideLength - 1)); x++) {
            // Store the four diamond midpoints
            [
                [y * (sideLength - 1) + halfSideLength, x * (sideLength - 1)],
                [y * (sideLength - 1) + halfSideLength, (x + 1) * (sideLength - 1)],
                [y * (sideLength - 1), x * (sideLength - 1) + halfSideLength],
                [(y + 1) * (sideLength - 1), x * (sideLength - 1) + halfSideLength],
            ] // bottom
                .map(function (diamondMidPoint) {
                // Find the sum of the diamond corner values
                var counter = 0;
                var sum = 0;
                if (diamondMidPoint[1] !== 0) {
                    // left
                    counter += 1.0;
                    sum += map[diamondMidPoint[0]][diamondMidPoint[1] - halfSideLength];
                }
                if (diamondMidPoint[0] !== 0) {
                    // top
                    counter += 1.0;
                    sum += map[diamondMidPoint[0] - halfSideLength][diamondMidPoint[1]];
                }
                if (diamondMidPoint[1] !== size - 1) {
                    // right
                    counter += 1.0;
                    sum += map[diamondMidPoint[0]][diamondMidPoint[1] + halfSideLength];
                }
                if (diamondMidPoint[0] !== size - 1) {
                    // bottom
                    counter += 1.0;
                    sum += map[diamondMidPoint[0] + halfSideLength][diamondMidPoint[1]];
                }
                // Set the center point to be the average of the diamond corner values
                map[diamondMidPoint[0]][diamondMidPoint[1]] =
                    sum / counter + (-range + Math.random() * (range - -range + 1));
            });
        }
    }
}
