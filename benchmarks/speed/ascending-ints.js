import Benchmark from '../../node_modules/benchmark/benchmark';
import getFunctionsMap from '../helpers/get-murmur-fns-map';
import {consoleCompareCollisions} from '../helpers/count-collisions';

const SEED = process.env.seed || 1393; // A pretty good seed!
const testSize = process.env.test_size || 1000000; // One million!
const NUMBERS = [];

for(var i = 0; i < testSize; i++){ NUMBERS.push("" + i); }

console.log(`Testing SPEED, ${testSize} ascending Integers, using seed: ${SEED}`);
let benchmark = new Benchmark.Suite();

getFunctionsMap(SEED).forEach(function(fn, title){
  benchmark.add(title, function(){ NUMBERS.forEach(fn); });
});

benchmark.on('cycle', ({target})=> console.log(String(target)))
         .on('complete', function(){
           console.log('Fastest is ' + this.filter('fastest').map('name'));
         })
         .run();

/*
 * RECENT RUN:
 *
 *    Testing SPEED, 1000000 ascending Integers, using seed: 1393
 *    refry Murmur2 port x 26.68 ops/sec ±4.10% (48 runs sampled)
 *    refry Murmur2 port descending-modified x 32.12 ops/sec ±0.42% (55 runs sampled)
 *    internet example x 14.72 ops/sec ±0.35% (40 runs sampled)
 *    Fastest is refry Murmur2 port descending-modified
*/