var typedArrayPrototoStringTag = require('which-typed-array')
var isInteger = require('is-integer')

var major = +process.versions.node.split('.')[0]

function isUint8Array (value) {
  var tag = typedArrayPrototoStringTag(value)
  return tag === 'Uint8Array' || tag === false
}

var min = -2147483648
var max = 2147483647

function validateInt32 (value) {
  return isInteger(value) && value >= min && value <= max
}

var ERR_INVALID_ARG_TYPE = Error

function compareOffset (source, target, targetStart, sourceStart, targetEnd,
  sourceEnd) {
  var sourceLength = sourceEnd - sourceStart
  var targetLength = targetEnd - targetStart
  var length = Math.min(sourceLength, targetLength)

  for (var index = 0; index < length; index++) {
    var sourceValue = source[sourceStart + index]
    var targetValue = target[targetStart + index]
    if (sourceValue > targetValue) return 1
    else if (sourceValue < targetValue) return -1
  }
  return 0
}

function bufferComparePolyfill (source, target, targetStart, targetEnd, sourceStart, sourceEnd) {
  if (!isUint8Array(target)) {
    throw new ERR_INVALID_ARG_TYPE('target', ['Buffer', 'Uint8Array'], target)
  }
  if (arguments.length === 1) { return source.compare(target) }

  if (targetStart === undefined) { targetStart = 0 } else { validateInt32(targetStart, 'targetStart', 0) }

  if (targetEnd === undefined) { targetEnd = target.length } else { validateInt32(targetEnd, 'targetEnd', 0, target.length) }

  if (sourceStart === undefined) { sourceStart = 0 } else { validateInt32(sourceStart, 'sourceStart', 0) }

  if (sourceEnd === undefined) { sourceEnd = source.length } else { validateInt32(sourceEnd, 'sourceEnd', 0, source.length) }

  if (sourceStart >= sourceEnd) { return (targetStart >= targetEnd ? 0 : -1) }
  if (targetStart >= targetEnd) { return 1 }

  return compareOffset(source, target, targetStart, sourceStart, targetEnd,
    sourceEnd)
}

function bufferCompareNative (source, target, targetStart, targetEnd, sourceStart, sourceEnd) {
  return source.compare(target, targetStart, targetEnd, sourceStart, sourceEnd)
}

module.exports = major <= 4 ? bufferComparePolyfill : bufferCompareNative
