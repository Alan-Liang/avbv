const avRegex = /^[Aa]?[Vv]?\d{2,10}$/
const bvCharmap = [ 11, 10, 3, 8, 4, 6, 2, 9, 5, 7 ]
const bvStart = 'BV', avStart = 'av'
const fiftyEight = BigInt('58')
const magicAdd = BigInt('100618342136696320')
const magicXor = BigInt('177451812')
const sscMap = 'fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF'
const sscReverseMap = new Map(Array.from(sscMap).map((c, i) => [ c, BigInt(i) ]))
const bvRegex = new RegExp(`^[Bb][Vv][${sscMap}]{${bvCharmap.length}}$`)

/**
 * Converts an BV to AV.
 * @param {string} bv BV string
 * @returns {string} AV string
 */
exports.toAv = bv => {
  if (typeof bv !== 'string' || !bvRegex.test(bv)) {
    const err = new Error('Invalid BV, should be a string starting with BV or bv.')
    err.code = 'EINVALID_BV'
    throw err
  }
  let encodedAvNumber = BigInt(0)
  for (const i of bvCharmap.keys()) encodedAvNumber += sscReverseMap.get(bv[bvCharmap[i]]) * fiftyEight ** BigInt(i)
  const avNumber = (encodedAvNumber - magicAdd) ^ magicXor
  return `${avStart}${avNumber}`
}

/**
 * Converts an AV to BV.
 * @param {string|number|bigint} av AV number or string
 * @returns {string} BV string
 */
exports.toBv = av => {
  if (typeof av !== 'string' && typeof av !== 'bigint' && typeof av !== 'number' || !avRegex.test(String(av))) {
    const err = new Error('Invalid AV, should be string|number|bigint')
    err.code = 'EINVALID_AV'
    throw err
  }
  if (typeof av === 'string' && av.toLowerCase().startsWith(avStart.toLowerCase())) av = av.substring(avStart.length)
  if (typeof av !== 'bigint') av = BigInt(av)
  av = (av ^ magicXor) + magicAdd
  let bv = [ ...bvStart ]
  for (const i of bvCharmap.keys()) bv[bvCharmap[i]] = sscMap[ av / fiftyEight ** BigInt(i) % fiftyEight ]
  return bv.join('')
}
