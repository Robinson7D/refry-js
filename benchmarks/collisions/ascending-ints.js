import getFunctionsMap from '../helpers/get-murmur-fns-map';
import {consoleCompareCollisions} from '../helpers/count-collisions';

const SEED = process.env.seed || 1393; // A pretty good seed!
const testSize = process.env.test_size || 1000000; // One million!
const NUMBERS = [];

for(var i = 0; i < testSize; i++){ NUMBERS.push("" + i); }

console.log(`Testing ${testSize} ascending Integers, using seed: ${SEED}`);
consoleCompareCollisions(NUMBERS, getFunctionsMap(SEED));