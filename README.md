# refry-js

Refrying that hash. (Hashing functions reimplemented in Javascript.)

---

## Currently available hashing functions:

- Murmur 2 (+ in a faster descending variant)

## Build (How To, Commands):

Install dependencies: `npm install`

Test speed: `babel-node benchmarks/speed/*.js` (where * is the type of input you're comparing)

Test collisions: `babel-node benchmarks/collisions/*.js` (where * is the type of input you're comparing)

Compile to ES5: `npm run makeES5`

_For words tests to work, one must have /usr/share/dict/words_

---

## Recent test runs:

### Speed

#### Words

```
Comparing SPEED, 235887 dictionary words, using seed: 1393
refry Murmur2 port x 35.10 ops/sec ±1.93% (59 runs sampled)
refry Murmur2 port descending-modified x 36.80 ops/sec ±0.73% (62 runs sampled)
internet example x 27.09 ops/sec ±0.35% (48 runs sampled)
Fastest is refry Murmur2 port descending-modified
```

#### Ascending Integers

```
Testing SPEED, 1000000 ascending Integers, using seed: 1393
refry Murmur2 port x 26.76 ops/sec ±2.29% (47 runs sampled)
refry Murmur2 port descending-modified x 28.79 ops/sec ±0.43% (50 runs sampled)
internet example x 14.77 ops/sec ±0.40% (40 runs sampled)
Fastest is refry Murmur2 port descending-modified
```

### Collisions

NOTICE:
This test is largely dependant on the seed.

However, you'll find that `internet example` and `refry Murmur2 port` always achieve the exact same collision count. In all my tests they hash to the same numbers (this may differ out of ASCII range?)

Some seeds benefit descending, some benefit ascending; on average they're very close.
This mostly acts as a sanity check 😻

#### Words

```
Testing 235887 dictionary words, using seed: 1393
Collisions detected for refry Murmur2 port: 2
Collisions detected for refry Murmur2 port descending-modified: 2
Collisions detected for internet example: 2
Fewest collisions detected on: refry Murmur2 port
```

#### Ascending Integers

```
Testing 1000000 ascending Integers, using seed: 1393
Collisions detected for refry Murmur2 port: 41
Collisions detected for refry Murmur2 port descending-modified: 35
Collisions detected for internet example: 41
Fewest collisions detected on: refry Murmur2 port descending-modified
```
