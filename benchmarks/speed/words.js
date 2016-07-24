import Benchmark from '../../node_modules/benchmark/benchmark';
import getFunctionsMap from '../helpers/get-murmur-fns-map';
import getDictionaryWords from '../helpers/get-dictionary-words';

const SEED = process.env.seed || 1393; // A pretty good seed!

getDictionaryWords(function(words){
  console.log(`Comparing SPEED, ${words.length} dictionary words, using seed: ${SEED}`);

  let benchmark = new Benchmark.Suite();
  getFunctionsMap(SEED).forEach(function(fn, title){
    benchmark.add(title, function(){ words.forEach(fn); });
  });

  benchmark.on('cycle', ({target})=> console.log(String(target)))
           .on('complete', function(){
             console.log('Fastest is ' + this.filter('fastest').map('name'));
           })
           .run();
});