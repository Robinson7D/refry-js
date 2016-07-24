import getFunctionsMap from '../helpers/get-murmur-fns-map';
import {consoleCompareCollisions} from '../helpers/count-collisions';
import getDictionaryWords from '../helpers/get-dictionary-words';

const SEED = process.env.seed || 1393; // A pretty good seed!

getDictionaryWords(function(words){
  console.log(`Testing ${words.length} dictionary words, using seed: ${SEED}`);
  consoleCompareCollisions(words, getFunctionsMap(SEED));
});