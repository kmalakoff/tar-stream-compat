var major = +process.versions.node.split('.')[0]
module.exports = major <= 10 ? require('./readable-stream-2.3.7').default : require('readable-stream');
