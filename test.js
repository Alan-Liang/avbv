const assert = require('assert').equal
const { toAv, toBv } = require('./core')
const Av = require('./av'), Bv = require('./bv')

const videos = {
  2: 'BV1xx411c7mD',
  7: 'BV1xx411c7m9',
  114514: 'BV1fx411c7Z8',
  170001: 'BV17x411w7KC',
  314159: 'BV1gx411F7pF',
  1111111: 'BV1ox411K7kp',
  3141592: 'BV12s41127if',
  12345678: 'BV1fx411v7eo',
  55553519: 'BV1K4411N7Vw',
  56093550: 'BV1N4411V7Wi',
  58793314: 'BV11t41157eU',
  98393198: 'BV1iE411F7wR',
  98630396: 'BV1p7411m7Uk',
}

const toAvAliases = [ toAv, Av.fromBv, Bv.toAv ]
const toBvAliases = [ toBv, Bv.fromAv, Av.toBv ]

for (let aid in videos) {
  for (const fn of toAvAliases) {
    assert(fn(videos[aid]), `av${aid}`, 'should encode AV correctly')
    assert(fn('bv' + videos[aid].substring(2)), `av${aid}`, 'should encode AV with lowercase bv')
    let err
    try { fn(170001) } catch (e) { err = e }
    assert(err && err.code, 'EINVALID_BV', 'should throw EINVALID_BV when passing a non-string')
    err = null
    try { fn('notBv') } catch (e) { err = e }
    assert(err && err.code, 'EINVALID_BV', 'should throw EINVALID_BV when passing a non-BV string')
  }
  for (const fn of toBvAliases) {
    assert(fn(Number(aid)), videos[aid], 'should encode BV correctly')
    assert(fn(BigInt(aid)), videos[aid], 'should encode BV with BigInt')
    assert(fn(aid), videos[aid], 'should encode BV with string')
    assert(fn(`av${aid}`), videos[aid], 'should encode BV with avxxxxxx')
    let err
    try { fn({ not: 'av' }) } catch (e) { err = e }
    assert(err && err.code, 'EINVALID_AV', 'should throw EINVALID_AV when passing a non-(string|number|bigint)')
    err = null
    try { fn('notAv') } catch (e) { err = e }
    assert(err && err.code, 'EINVALID_AV', 'should throw EINVALID_AV when passing a non-AV string')
  }
}
