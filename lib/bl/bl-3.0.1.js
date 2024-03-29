'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, '__esModule', {
  value: true
});

var require$$0 = require('../readable-stream');

var require$$1 = require('util');

function _interopDefaultLegacy(e) {
  return e && _typeof(e) === 'object' && 'default' in e ? e : {
    'default': e
  };
}

var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);

var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);

var DuplexStream = require$$0__default["default"].Duplex,
    util = require$$1__default["default"];

function BufferList(callback) {
  if (!(this instanceof BufferList)) return new BufferList(callback);
  this._bufs = [];
  this.length = 0;

  if (typeof callback == 'function') {
    this._callback = callback;

    var piper = function piper(err) {
      if (this._callback) {
        this._callback(err);

        this._callback = null;
      }
    }.bind(this);

    this.on('pipe', function onPipe(src) {
      src.on('error', piper);
    });
    this.on('unpipe', function onUnpipe(src) {
      src.removeListener('error', piper);
    });
  } else {
    this.append(callback);
  }

  DuplexStream.call(this);
}

util.inherits(BufferList, DuplexStream);

BufferList.prototype._offset = function _offset(offset) {
  var tot = 0,
      i = 0,
      _t;

  if (offset === 0) return [0, 0];

  for (; i < this._bufs.length; i++) {
    _t = tot + this._bufs[i].length;

    if (offset < _t || i == this._bufs.length - 1) {
      return [i, offset - tot];
    }

    tot = _t;
  }
};

BufferList.prototype._reverseOffset = function (blOffset) {
  var bufferId = blOffset[0];
  var offset = blOffset[1];

  for (var i = 0; i < bufferId; i++) {
    offset += this._bufs[i].length;
  }

  return offset;
};

BufferList.prototype.append = function append(buf) {
  var i = 0;

  if (Buffer.isBuffer(buf)) {
    this._appendBuffer(buf);
  } else if (Array.isArray(buf)) {
    for (; i < buf.length; i++) {
      this.append(buf[i]);
    }
  } else if (buf instanceof BufferList) {
    // unwrap argument into individual BufferLists
    for (; i < buf._bufs.length; i++) {
      this.append(buf._bufs[i]);
    }
  } else if (buf != null) {
    // coerce number arguments to strings, since Buffer(number) does
    // uninitialized memory allocation
    if (typeof buf == 'number') buf = buf.toString();

    this._appendBuffer(Buffer.from(buf));
  }

  return this;
};

BufferList.prototype._appendBuffer = function appendBuffer(buf) {
  this._bufs.push(buf);

  this.length += buf.length;
};

BufferList.prototype._write = function _write(buf, encoding, callback) {
  this._appendBuffer(buf);

  if (typeof callback == 'function') callback();
};

BufferList.prototype._read = function _read(size) {
  if (!this.length) return this.push(null);
  size = Math.min(size, this.length);
  this.push(this.slice(0, size));
  this.consume(size);
};

BufferList.prototype.end = function end(chunk) {
  DuplexStream.prototype.end.call(this, chunk);

  if (this._callback) {
    this._callback(null, this.slice());

    this._callback = null;
  }
};

BufferList.prototype.get = function get(index) {
  if (index > this.length || index < 0) {
    return undefined;
  }

  var offset = this._offset(index);

  return this._bufs[offset[0]][offset[1]];
};

BufferList.prototype.slice = function slice(start, end) {
  if (typeof start == 'number' && start < 0) start += this.length;
  if (typeof end == 'number' && end < 0) end += this.length;
  return this.copy(null, 0, start, end);
};

BufferList.prototype.copy = function copy(dst, dstStart, srcStart, srcEnd) {
  if (typeof srcStart != 'number' || srcStart < 0) srcStart = 0;
  if (typeof srcEnd != 'number' || srcEnd > this.length) srcEnd = this.length;
  if (srcStart >= this.length) return dst || Buffer.alloc(0);
  if (srcEnd <= 0) return dst || Buffer.alloc(0);

  var copy = !!dst,
      off = this._offset(srcStart),
      len = srcEnd - srcStart,
      bytes = len,
      bufoff = copy && dstStart || 0,
      start = off[1],
      l,
      i; // copy/slice everything


  if (srcStart === 0 && srcEnd == this.length) {
    if (!copy) {
      // slice, but full concat if multiple buffers
      return this._bufs.length === 1 ? this._bufs[0] : Buffer.concat(this._bufs, this.length);
    } // copy, need to copy individual buffers


    for (i = 0; i < this._bufs.length; i++) {
      this._bufs[i].copy(dst, bufoff);

      bufoff += this._bufs[i].length;
    }

    return dst;
  } // easy, cheap case where it's a subset of one of the buffers


  if (bytes <= this._bufs[off[0]].length - start) {
    return copy ? this._bufs[off[0]].copy(dst, dstStart, start, start + bytes) : this._bufs[off[0]].slice(start, start + bytes);
  }

  if (!copy) // a slice, we need something to copy in to
    dst = Buffer.allocUnsafe(len);

  for (i = off[0]; i < this._bufs.length; i++) {
    l = this._bufs[i].length - start;

    if (bytes > l) {
      this._bufs[i].copy(dst, bufoff, start);

      bufoff += l;
    } else {
      this._bufs[i].copy(dst, bufoff, start, start + bytes);

      bufoff += l;
      break;
    }

    bytes -= l;
    if (start) start = 0;
  } // safeguard so that we don't return uninitialized memory


  if (dst.length > bufoff) return dst.slice(0, bufoff);
  return dst;
};

BufferList.prototype.shallowSlice = function shallowSlice(start, end) {
  start = start || 0;
  end = typeof end !== 'number' ? this.length : end;
  if (start < 0) start += this.length;
  if (end < 0) end += this.length;

  if (start === end) {
    return new BufferList();
  }

  var startOffset = this._offset(start),
      endOffset = this._offset(end),
      buffers = this._bufs.slice(startOffset[0], endOffset[0] + 1);

  if (endOffset[1] == 0) buffers.pop();else buffers[buffers.length - 1] = buffers[buffers.length - 1].slice(0, endOffset[1]);
  if (startOffset[1] != 0) buffers[0] = buffers[0].slice(startOffset[1]);
  return new BufferList(buffers);
};

BufferList.prototype.toString = function toString(encoding, start, end) {
  return this.slice(start, end).toString(encoding);
};

BufferList.prototype.consume = function consume(bytes) {
  // first, normalize the argument, in accordance with how Buffer does it
  bytes = Math.trunc(bytes); // do nothing if not a positive number

  if (Number.isNaN(bytes) || bytes <= 0) return this;

  while (this._bufs.length) {
    if (bytes >= this._bufs[0].length) {
      bytes -= this._bufs[0].length;
      this.length -= this._bufs[0].length;

      this._bufs.shift();
    } else {
      this._bufs[0] = this._bufs[0].slice(bytes);
      this.length -= bytes;
      break;
    }
  }

  return this;
};

BufferList.prototype.duplicate = function duplicate() {
  var i = 0,
      copy = new BufferList();

  for (; i < this._bufs.length; i++) {
    copy.append(this._bufs[i]);
  }

  return copy;
};

BufferList.prototype._destroy = function _destroy(err, cb) {
  this._bufs.length = 0;
  this.length = 0;
  cb(err);
};

BufferList.prototype.indexOf = function (search, offset, encoding) {
  if (encoding === undefined && typeof offset === 'string') {
    encoding = offset;
    offset = undefined;
  }

  if (typeof search === 'function' || Array.isArray(search)) {
    throw new TypeError('The "value" argument must be one of type string, Buffer, BufferList, or Uint8Array.');
  } else if (typeof search === 'number') {
    search = Buffer.from([search]);
  } else if (typeof search === 'string') {
    search = Buffer.from(search, encoding);
  } else if (search instanceof BufferList) {
    search = search.slice();
  } else if (!Buffer.isBuffer(search)) {
    search = Buffer.from(search);
  }

  offset = Number(offset || 0);

  if (isNaN(offset)) {
    offset = 0;
  }

  if (offset < 0) {
    offset = this.length + offset;
  }

  if (offset < 0) {
    offset = 0;
  }

  if (search.length === 0) {
    return offset > this.length ? this.length : offset;
  }

  var blOffset = this._offset(offset);

  var blIndex = blOffset[0]; // index of which internal buffer we're working on

  var buffOffset = blOffset[1]; // offset of the internal buffer we're working on
  // scan over each buffer

  for (blIndex; blIndex < this._bufs.length; blIndex++) {
    var buff = this._bufs[blIndex];

    while (buffOffset < buff.length) {
      var availableWindow = buff.length - buffOffset;

      if (availableWindow >= search.length) {
        var nativeSearchResult = buff.indexOf(search, buffOffset);

        if (nativeSearchResult !== -1) {
          return this._reverseOffset([blIndex, nativeSearchResult]);
        }

        buffOffset = buff.length - search.length + 1; // end of native search window
      } else {
        var revOffset = this._reverseOffset([blIndex, buffOffset]);

        if (this._match(revOffset, search)) {
          return revOffset;
        }

        buffOffset++;
      }
    }

    buffOffset = 0;
  }

  return -1;
};

BufferList.prototype._match = function (offset, search) {
  if (this.length - offset < search.length) {
    return false;
  }

  for (var searchOffset = 0; searchOffset < search.length; searchOffset++) {
    if (this.get(offset + searchOffset) !== search[searchOffset]) {
      return false;
    }
  }

  return true;
};

(function () {
  var methods = {
    'readDoubleBE': 8,
    'readDoubleLE': 8,
    'readFloatBE': 4,
    'readFloatLE': 4,
    'readInt32BE': 4,
    'readInt32LE': 4,
    'readUInt32BE': 4,
    'readUInt32LE': 4,
    'readInt16BE': 2,
    'readInt16LE': 2,
    'readUInt16BE': 2,
    'readUInt16LE': 2,
    'readInt8': 1,
    'readUInt8': 1,
    'readIntBE': null,
    'readIntLE': null,
    'readUIntBE': null,
    'readUIntLE': null
  };

  for (var m in methods) {
    (function (m) {
      if (methods[m] === null) {
        BufferList.prototype[m] = function (offset, byteLength) {
          return this.slice(offset, offset + byteLength)[m](0, byteLength);
        };
      } else {
        BufferList.prototype[m] = function (offset) {
          return this.slice(offset, offset + methods[m])[m](0);
        };
      }
    })(m);
  }
})();

var bl = BufferList;
exports["default"] = bl;
