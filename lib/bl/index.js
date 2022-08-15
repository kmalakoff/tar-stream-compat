var major = +process.versions.node.split('.')[0]
module.exports = major <= 10 ? require('./bl-2.2.1').default : require('bl');
