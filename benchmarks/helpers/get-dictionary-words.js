var fs = require('fs'); // Load fs module for node.
export default getDictionaryWords;

function getDictionaryWords(fn){ // TODO: Make Promise?
  fs.readFile('/usr/share/dict/words', "utf8", function(err, data) {
    if (err) { throw err; }

    fn(data.split('\n'));
  });
}