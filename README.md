AV <> BV Converter
===================

<https://www.bilibili.com/> AV <> BV converter adapted from a script on the Internet. Unsupported API,
use at your own risk.

## Usage

```javascript
const { avFromBv, bvFromAv, avToBv, bvToAv } = require('avbv')
const AV = require('avbv/av')
avFromBv('BV17x411w7KC') // -> 'av170001'
bvToAv('BV17x411w7KC') // -> 'av170001'
AV.fromBv('BV17x411w7KC') // -> 'av170001'

bvFromAv('170001') // -> 'BV17x411w7KC'
avToBv('av170001') // -> 'BV17x411w7KC'
AV.toBv(170001) // -> 'BV17x411w7KC'
AV.toBv(170001n) // -> 'BV17x411w7KC'
```

## License

WTFPL
