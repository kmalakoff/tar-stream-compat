require('core-js/actual/math/trunc')

// buffer
if (!Buffer.from) Buffer.from = require('buffer-from');
if (!Buffer.alloc) Buffer.alloc = require('./buffer-alloc');
var major = +process.versions.node.split('.')[0]
if(major <= 4) Buffer.prototype.compare = require('./buffer-compare');
require('buffer-v6-polyfill')
