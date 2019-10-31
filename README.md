# Prime-Factorizer
This NPM-package can simplify fractions and prime factorize numbers.

# Install
```bash
npm install prime-factorizer --save
```

# Examples
```javascript
const Factorizer = require('prime-factorizer');


/// Simple factorization ///

let myArrayOfFactors = Factorizer.factors(210);
console.log(myArrayOfFactors);
// > [ '2', '3', '5', '7' ]


/// Fraction simplification ///

let mySimplifiedFraction = Factorizer.simplify(130, 35);
console.log(mySimplifiedFraction);
// > [ 26, 7 ]
```
