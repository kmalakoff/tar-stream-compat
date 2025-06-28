import Module from 'module';
import type t from 'tar-stream';

const _require = typeof require === 'undefined' ? Module.createRequire(import.meta.url) : require;
const major = +process.versions.node.split('.')[0];

const tar = major <= 10 ? _require('../../assets/tar-stream.cjs') : _require('tar-stream');

export const extract = tar.extract as typeof t.extract;
export const pack = tar.pack as typeof t.pack;
export default { extract, pack };
