AV <> BV Converter
===================

An AV <> BV converter adapted from a script on the Internet for a website. Unsupported API, use at your own risk.

## Usage

```javascript
const { avFromBv, bvFromAv, avToBv, bvToAv } = require('avbv')
const Av = require('avbv/av')
const Bv = require('avbv/bv')
avFromBv('BV17x411w7KC') // -> 'av170001'
bvToAv('BV17x411w7KC') // -> 'av170001'
Av.fromBv('BV17x411w7KC') // -> 'av170001'
Bv.toAv('bv17x411w7KC') // -> 'av170001'

bvFromAv('170001') // -> 'BV17x411w7KC'
avToBv('av170001') // -> 'BV17x411w7KC'
Av.toBv(170001) // -> 'BV17x411w7KC'
Bv.fromAv(170001n) // -> 'BV17x411w7KC'
```

## License

WTFPL
