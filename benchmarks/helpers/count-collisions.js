export {
  getCollisionsCount as getCollisionsCount,
  consoleCompareCollisions as consoleCompareCollisions
};

function consoleCompareCollisions(words, hashingFnsToCompareMap) {
  var leastComparisons = Infinity,
      leastComparisonsTitle = "";

  hashingFnsToCompareMap.forEach(function(hashingFn, title){
    let count = getCollisionsCount(words, hashingFn);

    console.log(`Collisions detected for ${title}: ${count}`);
    if(count < leastComparisons){
      leastComparisons = count;
      leastComparisonsTitle = title;
    }
  });
  console.log(`Fewest collisions detected on: ${leastComparisonsTitle}`)
}

function getCollisionsCount(words, hashingFn){
  let seen = new Set(), collisionsCount = 0;

  words.forEach(function(word){
    let hashed = hashingFn(word);

    if(seen.has(hashed)) collisionsCount++;
    else seen.add(hashed);
  });

  return collisionsCount;
}
