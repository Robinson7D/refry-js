const M =  0x5bd1e995;
const IMUL = Math.imul || imulPolyfill;

export default decrMurmur2_32;

/*
 * Based on aappleby's original implementation
 *   (Available at: https://github.com/aappleby/smhasher).
 *
 * Modified lightly as Javascript does not have a nice way to point to arbitrary memory.
 * As such, Extended ASCII (0-255) only! Otherwise you're in trouble.
 *
 * Additionally modified to work backward, because this version happens to be faster in JS
 * than the original port.
*/
function decrMurmur2_32(seed, str) {
  var position = str.length - 1,
      h = seed ^ position, // Off by one from original spec (but should be fine?)
      curValue = 0;

  while(position >= 3) { // Going backward instead of forward for simplicity
    curValue = str.charCodeAt(position--)
            | (str.charCodeAt(position--) <<  8)
            | (str.charCodeAt(position--) << 16)
            | (str.charCodeAt(position--) << 24);

    curValue = IMUL(curValue, M);
    curValue ^= curValue >>> 24 ;

    h = IMUL(h, M) ^ IMUL(curValue, M); // Hash curValue back into h
  }

  switch(position) {
    case 2: h ^= str.charCodeAt(position--) << 16;
    case 1: h ^= str.charCodeAt(position--) << 8;
    case 0: h ^= str.charCodeAt(position);
      h = IMUL(h, M);
  };

  h ^= (h >>> 13);
  h = IMUL(h, M);
  h ^= (h >>> 15);

  return h;
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
