const primes = require("./primes");

/// PUBLIC FUNCTIONS ///

function factors (number) {
    // Special cases
    if (number === 0) return []; // The number 0 has no factors
    if (number === 1) return [1]; // The number 1 has one factor, itself
    if (!isInt(number)) {
        throw "factors function expects integer as input, can't factorize decimal numbers";
    }
    if (number > primes[primes.length - 1]) {
        throw "number is too large, " + primes[primes.length - 1] + " is the limit";
    }

    // Init variables
    let result = [];
    let current = number;
    let sucess = false;

    // Calculate the factors
    for (let i = 0; i < primes.length && !sucess; i++) {
        while (true) {
            let next = current / primes[i];
            if (next > 0 && isInt(next)) {
                result.push(primes[i]);
                current = next;
            } else break;
            if (current === 1) sucess = true;
        }
    }

    // If not all factors was found
    if (!sucess) {
        throw "could not calculate all factors";
    }

    // Return array of factors;
    return result;
}

function simplify (numerator, denomerator) {
    // Check if both arguments is defined
    if (numerator === undefined || denomerator === undefined) {
        throw "the function expects two arguments, numerator and denomerator";
    }

    // Special cases
    if (denomerator === 0) {
        throw "denomerator can't be 0"; // A fraction can't have 0 as the denomerator
    }
    if (numerator === 0) return [0, 1]; // 0 divided by any number is 0

    // Remove any decimals in the fraction
    let fraction = removeDecimals(numerator, denomerator);

    // Calculate the factors for the numerator and the denomerator
    // and remove the similar factors
    let shortFraction = removeSimilarFactors(factors(fraction[0]), factors(fraction[1]));

    // Return the simplified fraction
    return [product(shortFraction[0]), product(shortFraction[1])];
}

function decimal (fraction) {
    // Check if the argument is an array of length 2
    if (!Array.isArray(fraction) || !fraction.length === 2) {
        throw "first argument should be an array of size 2";
    }

    // Check if the denomerator is 0
    if (fraction[1] === 0) {
        throw "denomerator can't be 0";
    }

    // Reuturn the answer in decimal form
    return fraction[0] / fraction[1];
}

function mixedNumber (fraction) {
    let wholeNumber = Math.floor(fraction[0] / fraction[1]);
    let newNumerator = fraction[0] % fraction[1];
    return [newNumerator, fraction[1], wholeNumber];
}

/// PRIVATE FUNCTIONS ///

function isInt (number) {
    // Check if the number has decimals
    return number === Math.floor(number);
}

function product (factors) {
    let product = 1;

    // Multiply the factors
    for (let i = 0; i < factors.length; i++) {
        product *= factors[i];
    }

    // Return the product of the factors
    return product;
}

function removeDecimals (numerator, denomerator) {
    // Init variables
    let newNum = numerator;
    let newDen = denomerator;
    let count = 0;

    // While numerator or denomerator is not integer, move decimal place one place
    while (!isInt(newNum) || !isInt(newDen)) {
        newNum *= 10;
        newDen *= 10;
        count++;

        // Limit the move to 100 times to make sure it doesn't get stuck in the loop
        if (count > 100) {
            throw "too many decimals";
        }
    }

    // Return the new fraction without decimal numbers
    return [newNum, newDen];
}

function removeSimilarFactors (numerator, denomerator) {
    // Remove all similar factors
    for (let i = numerator.length - 1; i >= 0; i--) {
        for (let j = denomerator.length - 1; j >= 0; j--) {
            if (numerator[i] === denomerator[j]) {
                numerator.splice(i, 1);
                denomerator.splice(j, 1);
            }
        }
    }

    return [numerator, denomerator];
}

/// EXPORT PUBLIC FUNCTIONS ///

module.exports = {
    factors,
    simplify,
    decimal,
    mixedNumber
}