var major = +process.versions.node.split('.')[0]
module.exports = major <= 10 ? require('./bl-3.0.1').default : require('bl');
