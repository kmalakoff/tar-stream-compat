var major = +process.versions.node.split('.')[0]
module.exports = major <= 10 ? require('./concat-stream-1.6.2').default : require('concat-stream');
