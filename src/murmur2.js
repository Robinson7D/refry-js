const M =  0x5bd1e995;
const IMUL = Math.imul || imulPolyfill;

export default murmur2_32;

/*
 * Based on aappleby's original implementation
 *   (Available at: https://github.com/aappleby/smhasher).
 *
 * Modified lightly as Javascript does not have a nice way to point to arbitrary memory.
 * As such, Extended ASCII (0-255) only! Otherwise you're in trouble.
*/
function murmur2_32(seed, str) {
  var position = 0,
      len = str.length,
      h = seed ^ len, // Off by one from original spec (but should be fine?)
      curValue = 0;

  while(len >= 4) { // Going backward instead of forward for simplicity
    curValue = str.charCodeAt(position)
            | (str.charCodeAt(position+1) <<  8)
            | (str.charCodeAt(position+2) << 16)
            | (str.charCodeAt(position+3) << 24);

    curValue = IMUL(curValue, M);
    curValue ^= curValue >>> 24 ;

    h = IMUL(h, M) ^ IMUL(curValue, M); // Hash curValue back into h

    len -= 4;
    position += 4;
  }

  switch(len) {
    case 3: h ^= str.charCodeAt(position+2) << 16;
    case 2: h ^= str.charCodeAt(position+1) << 8;
    case 1: h ^= str.charCodeAt(position);
      h = IMUL(h, M);
  };

  h ^= (h >>> 13);
  h = IMUL(h, M);
  h ^= (h >>> 15);

  return h >>> 0;
}

// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul
function imulPolyfill(a, b) {
  var ah = (a >>> 16) & 0xffff;
  var al = a & 0xffff;
  var bh = (b >>> 16) & 0xffff;
  var bl = b & 0xffff;
  // the shift by 0 fixes the sign on the high part
  // the final |0 converts the unsigned value into a signed value
  return ((al * bl) + (((ah * bl + al * bh) << 16) >>> 0)|0);
}
