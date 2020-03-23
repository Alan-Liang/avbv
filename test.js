const assert = require('assert').equal
const { toAv, toBv } = require('./core')

const videos = {
  170001: 'BV17x411w7KC',
  58793314: 'BV11t41157eU',
  98630396: 'BV1p7411m7Uk',
}

for (let aid in videos) {
  assert(toAv(videos[aid]), `av${aid}`, 'should encode AV')
  assert(toBv(aid), videos[aid], 'should encode BV')
  assert(toBv(String(aid)), videos[aid], 'should encode BV with string')
  assert(toBv(`av${aid}`), videos[aid], 'should encode BV with avxxxxxx')
}
