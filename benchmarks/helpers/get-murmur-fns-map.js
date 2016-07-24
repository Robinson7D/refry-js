import murmur2_32 from '../../src/murmur2';
import decr_murmur2_32 from '../../src/decrementing-murmur2';
var murmurhash2_32_gc = require("murmurhash-js").murmur2;

export default getSeededMurmurMap;

function getSeededMurmurMap(SEED){
  return new Map([
    ['refry Murmur2 port', (word)=> murmur2_32(SEED, word)],
    ['refry Murmur2 port descending-modified', (word)=> decr_murmur2_32(SEED, word)],
    ['internet example', (word)=> murmurhash2_32_gc(word, SEED)],
  ]);
}