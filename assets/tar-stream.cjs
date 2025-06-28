/* COMPATIBILITY POLYFILLS */

var major = +process.versions.node.split(".")[0];

var Buffer = require('safe-buffer').Buffer;
var BufferComparePolyfill = require("./buffer-compare.cjs");
var BufferCompare = major > 4 ? function (source) { return source.compare.apply(source, Array.prototype.slice.call(arguments, 1)); } : function (_source) { return BufferComparePolyfill.apply(null, Array.prototype.slice.call(arguments)); }

var MathTrunc = Math.trunc || function (val) { return val < 0 ? Math.ceil(val) : Math.floor(val); };
/* COMPATIBILITY POLYFILLS */
var require$$1 = require('util');
var require$$0 = require('stream');
var require$$2 = require('events');
var require$$0$1 = require('buffer');
var require$$11 = require('string_decoder');
var require$$0$2 = require('fs');
var require$$1$1 = require('constants');

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var tarStream = {};

var readable = {
    exports: {}
};

var processNextickArgs = {
    exports: {}
};

var hasRequiredProcessNextickArgs;
function requireProcessNextickArgs() {
    if (hasRequiredProcessNextickArgs) return processNextickArgs.exports;
    hasRequiredProcessNextickArgs = 1;
    if (typeof process === 'undefined' || !process.version || process.version.indexOf('v0.') === 0 || process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
        processNextickArgs.exports = {
            nextTick: nextTick
        };
    } else {
        processNextickArgs.exports = process;
    }
    function nextTick(fn, arg1, arg2, arg3) {
        if (typeof fn !== 'function') {
            throw new TypeError('"callback" argument must be a function');
        }
        var len = arguments.length;
        var args, i;
        switch(len){
            case 0:
            case 1:
                return process.nextTick(fn);
            case 2:
                return process.nextTick(function afterTickOne() {
                    fn.call(null, arg1);
                });
            case 3:
                return process.nextTick(function afterTickTwo() {
                    fn.call(null, arg1, arg2);
                });
            case 4:
                return process.nextTick(function afterTickThree() {
                    fn.call(null, arg1, arg2, arg3);
                });
            default:
                args = new Array(len - 1);
                i = 0;
                while(i < args.length){
                    args[i++] = arguments[i];
                }
                return process.nextTick(function afterTick() {
                    fn.apply(null, args);
                });
        }
    }
    return processNextickArgs.exports;
}

var isarray;
var hasRequiredIsarray;
function requireIsarray() {
    if (hasRequiredIsarray) return isarray;
    hasRequiredIsarray = 1;
    var toString = {}.toString;
    isarray = Array.isArray || function(arr) {
        return toString.call(arr) == '[object Array]';
    };
    return isarray;
}

var stream;
var hasRequiredStream;
function requireStream() {
    if (hasRequiredStream) return stream;
    hasRequiredStream = 1;
    stream = require$$0;
    return stream;
}

var safeBuffer = {
    exports: {}
};

var hasRequiredSafeBuffer;
function requireSafeBuffer() {
    if (hasRequiredSafeBuffer) return safeBuffer.exports;
    hasRequiredSafeBuffer = 1;
    (function(module, exports) {
        var buffer = require$$0$1;
        var Buffer = buffer.Buffer;
        // alternative to using Object.keys for old browsers
        function copyProps(src, dst) {
            for(var key in src){
                dst[key] = src[key];
            }
        }
        if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
            module.exports = buffer;
        } else {
            // Copy properties from require('buffer')
            copyProps(buffer, exports);
            exports.Buffer = SafeBuffer;
        }
        function SafeBuffer(arg, encodingOrOffset, length) {
            return Buffer(arg, encodingOrOffset, length);
        }
        // Copy static methods from Buffer
        copyProps(Buffer, SafeBuffer);
        SafeBuffer.from = function(arg, encodingOrOffset, length) {
            if (typeof arg === 'number') {
                throw new TypeError('Argument must not be a number');
            }
            return Buffer(arg, encodingOrOffset, length);
        };
        SafeBuffer.alloc = function(size, fill, encoding) {
            if (typeof size !== 'number') {
                throw new TypeError('Argument must be a number');
            }
            var buf = Buffer(size);
            if (fill !== undefined) {
                if (typeof encoding === 'string') {
                    buf.fill(fill, encoding);
                } else {
                    buf.fill(fill);
                }
            } else {
                buf.fill(0);
            }
            return buf;
        };
        SafeBuffer.allocUnsafe = function(size) {
            if (typeof size !== 'number') {
                throw new TypeError('Argument must be a number');
            }
            return Buffer(size);
        };
        SafeBuffer.allocUnsafeSlow = function(size) {
            if (typeof size !== 'number') {
                throw new TypeError('Argument must be a number');
            }
            return buffer.SlowBuffer(size);
        };
    })(safeBuffer, safeBuffer.exports);
    return safeBuffer.exports;
}

var util = {};

function _instanceof$9(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var hasRequiredUtil;
function requireUtil() {
    if (hasRequiredUtil) return util;
    hasRequiredUtil = 1;
    // Copyright Joyent, Inc. and other Node contributors.
    //
    // Permission is hereby granted, free of charge, to any person obtaining a
    // copy of this software and associated documentation files (the
    // "Software"), to deal in the Software without restriction, including
    // without limitation the rights to use, copy, modify, merge, publish,
    // distribute, sublicense, and/or sell copies of the Software, and to permit
    // persons to whom the Software is furnished to do so, subject to the
    // following conditions:
    //
    // The above copyright notice and this permission notice shall be included
    // in all copies or substantial portions of the Software.
    //
    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
    // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
    // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
    // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
    // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
    // USE OR OTHER DEALINGS IN THE SOFTWARE.
    // NOTE: These type checking functions intentionally don't use `instanceof`
    // because it is fragile and can be easily faked with `Object.create()`.
    function isArray(arg) {
        if (Array.isArray) {
            return Array.isArray(arg);
        }
        return objectToString(arg) === '[object Array]';
    }
    util.isArray = isArray;
    function isBoolean(arg) {
        return typeof arg === 'boolean';
    }
    util.isBoolean = isBoolean;
    function isNull(arg) {
        return arg === null;
    }
    util.isNull = isNull;
    function isNullOrUndefined(arg) {
        return arg == null;
    }
    util.isNullOrUndefined = isNullOrUndefined;
    function isNumber(arg) {
        return typeof arg === 'number';
    }
    util.isNumber = isNumber;
    function isString(arg) {
        return typeof arg === 'string';
    }
    util.isString = isString;
    function isSymbol(arg) {
        return (typeof arg === "undefined" ? "undefined" : _type_of(arg)) === 'symbol';
    }
    util.isSymbol = isSymbol;
    function isUndefined(arg) {
        return arg === void 0;
    }
    util.isUndefined = isUndefined;
    function isRegExp(re) {
        return objectToString(re) === '[object RegExp]';
    }
    util.isRegExp = isRegExp;
    function isObject(arg) {
        return (typeof arg === "undefined" ? "undefined" : _type_of(arg)) === 'object' && arg !== null;
    }
    util.isObject = isObject;
    function isDate(d) {
        return objectToString(d) === '[object Date]';
    }
    util.isDate = isDate;
    function isError(e) {
        return objectToString(e) === '[object Error]' || _instanceof$9(e, Error);
    }
    util.isError = isError;
    function isFunction(arg) {
        return typeof arg === 'function';
    }
    util.isFunction = isFunction;
    function isPrimitive(arg) {
        return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || (typeof arg === "undefined" ? "undefined" : _type_of(arg)) === 'symbol' || // ES6 symbol
        typeof arg === 'undefined';
    }
    util.isPrimitive = isPrimitive;
    util.isBuffer = require$$0$1.Buffer.isBuffer;
    function objectToString(o) {
        return Object.prototype.toString.call(o);
    }
    return util;
}

var inherits = {
    exports: {}
};

var inherits_browser = {
    exports: {}
};

var hasRequiredInherits_browser;
function requireInherits_browser() {
    if (hasRequiredInherits_browser) return inherits_browser.exports;
    hasRequiredInherits_browser = 1;
    if (typeof Object.create === 'function') {
        // implementation from standard node.js 'util' module
        inherits_browser.exports = function inherits(ctor, superCtor) {
            if (superCtor) {
                ctor.super_ = superCtor;
                ctor.prototype = Object.create(superCtor.prototype, {
                    constructor: {
                        value: ctor,
                        enumerable: false,
                        writable: true,
                        configurable: true
                    }
                });
            }
        };
    } else {
        // old school shim for old browsers
        inherits_browser.exports = function inherits(ctor, superCtor) {
            if (superCtor) {
                ctor.super_ = superCtor;
                var TempCtor = function TempCtor() {};
                TempCtor.prototype = superCtor.prototype;
                ctor.prototype = new TempCtor();
                ctor.prototype.constructor = ctor;
            }
        };
    }
    return inherits_browser.exports;
}

var hasRequiredInherits;
function requireInherits() {
    if (hasRequiredInherits) return inherits.exports;
    hasRequiredInherits = 1;
    try {
        var util = require('util');
        /* istanbul ignore next */ if (typeof util.inherits !== 'function') throw '';
        inherits.exports = util.inherits;
    } catch (e) {
        /* istanbul ignore next */ inherits.exports = requireInherits_browser();
    }
    return inherits.exports;
}

var BufferList = {
    exports: {}
};

function _instanceof$8(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
var hasRequiredBufferList;
function requireBufferList() {
    if (hasRequiredBufferList) return BufferList.exports;
    hasRequiredBufferList = 1;
    (function(module) {
        function _classCallCheck(instance, Constructor) {
            if (!_instanceof$8(instance, Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        var Buffer = requireSafeBuffer().Buffer;
        var util = require$$1;
        function copyBuffer(src, target, offset) {
            src.copy(target, offset);
        }
        module.exports = function() {
            function BufferList() {
                _classCallCheck(this, BufferList);
                this.head = null;
                this.tail = null;
                this.length = 0;
            }
            BufferList.prototype.push = function push(v) {
                var entry = {
                    data: v,
                    next: null
                };
                if (this.length > 0) this.tail.next = entry;
                else this.head = entry;
                this.tail = entry;
                ++this.length;
            };
            BufferList.prototype.unshift = function unshift(v) {
                var entry = {
                    data: v,
                    next: this.head
                };
                if (this.length === 0) this.tail = entry;
                this.head = entry;
                ++this.length;
            };
            BufferList.prototype.shift = function shift() {
                if (this.length === 0) return;
                var ret = this.head.data;
                if (this.length === 1) this.head = this.tail = null;
                else this.head = this.head.next;
                --this.length;
                return ret;
            };
            BufferList.prototype.clear = function clear() {
                this.head = this.tail = null;
                this.length = 0;
            };
            BufferList.prototype.join = function join(s) {
                if (this.length === 0) return '';
                var p = this.head;
                var ret = '' + p.data;
                while(p = p.next){
                    ret += s + p.data;
                }
                return ret;
            };
            BufferList.prototype.concat = function concat(n) {
                if (this.length === 0) return Buffer.alloc(0);
                var ret = Buffer.allocUnsafe(n >>> 0);
                var p = this.head;
                var i = 0;
                while(p){
                    copyBuffer(p.data, ret, i);
                    i += p.data.length;
                    p = p.next;
                }
                return ret;
            };
            return BufferList;
        }();
        if (util && util.inspect && util.inspect.custom) {
            module.exports.prototype[util.inspect.custom] = function() {
                var obj = util.inspect({
                    length: this.length
                });
                return this.constructor.name + ' ' + obj;
            };
        }
    })(BufferList);
    return BufferList.exports;
}

var destroy_1;
var hasRequiredDestroy;
function requireDestroy() {
    if (hasRequiredDestroy) return destroy_1;
    hasRequiredDestroy = 1;
    /*<replacement>*/ var pna = requireProcessNextickArgs();
    /*</replacement>*/ // undocumented cb() API, needed for core, not for public API
    function destroy(err, cb) {
        var _this = this;
        var readableDestroyed = this._readableState && this._readableState.destroyed;
        var writableDestroyed = this._writableState && this._writableState.destroyed;
        if (readableDestroyed || writableDestroyed) {
            if (cb) {
                cb(err);
            } else if (err) {
                if (!this._writableState) {
                    pna.nextTick(emitErrorNT, this, err);
                } else if (!this._writableState.errorEmitted) {
                    this._writableState.errorEmitted = true;
                    pna.nextTick(emitErrorNT, this, err);
                }
            }
            return this;
        }
        // we set destroyed to true before firing error callbacks in order
        // to make it re-entrance safe in case destroy() is called within callbacks
        if (this._readableState) {
            this._readableState.destroyed = true;
        }
        // if this is a duplex stream mark the writable part as destroyed as well
        if (this._writableState) {
            this._writableState.destroyed = true;
        }
        this._destroy(err || null, function(err) {
            if (!cb && err) {
                if (!_this._writableState) {
                    pna.nextTick(emitErrorNT, _this, err);
                } else if (!_this._writableState.errorEmitted) {
                    _this._writableState.errorEmitted = true;
                    pna.nextTick(emitErrorNT, _this, err);
                }
            } else if (cb) {
                cb(err);
            }
        });
        return this;
    }
    function undestroy() {
        if (this._readableState) {
            this._readableState.destroyed = false;
            this._readableState.reading = false;
            this._readableState.ended = false;
            this._readableState.endEmitted = false;
        }
        if (this._writableState) {
            this._writableState.destroyed = false;
            this._writableState.ended = false;
            this._writableState.ending = false;
            this._writableState.finalCalled = false;
            this._writableState.prefinished = false;
            this._writableState.finished = false;
            this._writableState.errorEmitted = false;
        }
    }
    function emitErrorNT(self, err) {
        self.emit('error', err);
    }
    destroy_1 = {
        destroy: destroy,
        undestroy: undestroy
    };
    return destroy_1;
}

var node;
var hasRequiredNode;
function requireNode() {
    if (hasRequiredNode) return node;
    hasRequiredNode = 1;
    /**
	 * For Node.js, simply re-export the core `util.deprecate` function.
	 */ node = require$$1.deprecate;
    return node;
}

function _instanceof$7(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
var _stream_writable;
var hasRequired_stream_writable;
function require_stream_writable() {
    if (hasRequired_stream_writable) return _stream_writable;
    hasRequired_stream_writable = 1;
    /*<replacement>*/ var pna = requireProcessNextickArgs();
    /*</replacement>*/ _stream_writable = Writable;
    // It seems a linked list but it is not
    // there will be only 2 of these for each stream
    function CorkedRequest(state) {
        var _this = this;
        this.next = null;
        this.entry = null;
        this.finish = function() {
            onCorkedFinish(_this, state);
        };
    }
    /* </replacement> */ /*<replacement>*/ var asyncWrite = !process.browser && [
        'v0.10',
        'v0.9.'
    ].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : pna.nextTick;
    /*</replacement>*/ /*<replacement>*/ var Duplex;
    /*</replacement>*/ Writable.WritableState = WritableState;
    /*<replacement>*/ var util = Object.create(requireUtil());
    util.inherits = requireInherits();
    /*</replacement>*/ /*<replacement>*/ var internalUtil = {
        deprecate: requireNode()
    };
    /*</replacement>*/ /*<replacement>*/ var Stream = requireStream();
    /*</replacement>*/ /*<replacement>*/ var Buffer = requireSafeBuffer().Buffer;
    var OurUint8Array = (typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : {}).Uint8Array || function() {};
    function _uint8ArrayToBuffer(chunk) {
        return Buffer.from(chunk);
    }
    function _isUint8Array(obj) {
        return Buffer.isBuffer(obj) || _instanceof$7(obj, OurUint8Array);
    }
    /*</replacement>*/ var destroyImpl = requireDestroy();
    util.inherits(Writable, Stream);
    function nop() {}
    function WritableState(options, stream) {
        Duplex = Duplex || require_stream_duplex();
        options = options || {};
        // Duplex streams are both readable and writable, but share
        // the same options object.
        // However, some cases require setting options to different
        // values for the readable and the writable sides of the duplex stream.
        // These options can be provided separately as readableXXX and writableXXX.
        var isDuplex = _instanceof$7(stream, Duplex);
        // object stream flag to indicate whether or not this stream
        // contains buffers or objects.
        this.objectMode = !!options.objectMode;
        if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode;
        // the point at which write() starts returning false
        // Note: 0 is a valid value, means that we always return false if
        // the entire buffer is not flushed immediately on write()
        var hwm = options.highWaterMark;
        var writableHwm = options.writableHighWaterMark;
        var defaultHwm = this.objectMode ? 16 : 16 * 1024;
        if (hwm || hwm === 0) this.highWaterMark = hwm;
        else if (isDuplex && (writableHwm || writableHwm === 0)) this.highWaterMark = writableHwm;
        else this.highWaterMark = defaultHwm;
        // cast to ints.
        this.highWaterMark = Math.floor(this.highWaterMark);
        // if _final has been called
        this.finalCalled = false;
        // drain event flag.
        this.needDrain = false;
        // at the start of calling end()
        this.ending = false;
        // when end() has been called, and returned
        this.ended = false;
        // when 'finish' is emitted
        this.finished = false;
        // has it been destroyed
        this.destroyed = false;
        // should we decode strings into buffers before passing to _write?
        // this is here so that some node-core streams can optimize string
        // handling at a lower level.
        var noDecode = options.decodeStrings === false;
        this.decodeStrings = !noDecode;
        // Crypto is kind of old and crusty.  Historically, its default string
        // encoding is 'binary' so we have to make this configurable.
        // Everything else in the universe uses 'utf8', though.
        this.defaultEncoding = options.defaultEncoding || 'utf8';
        // not an actual buffer we keep track of, but a measurement
        // of how much we're waiting to get pushed to some underlying
        // socket or file.
        this.length = 0;
        // a flag to see when we're in the middle of a write.
        this.writing = false;
        // when true all writes will be buffered until .uncork() call
        this.corked = 0;
        // a flag to be able to tell if the onwrite cb is called immediately,
        // or on a later tick.  We set this to true at first, because any
        // actions that shouldn't happen until "later" should generally also
        // not happen before the first write call.
        this.sync = true;
        // a flag to know if we're processing previously buffered items, which
        // may call the _write() callback in the same tick, so that we don't
        // end up in an overlapped onwrite situation.
        this.bufferProcessing = false;
        // the callback that's passed to _write(chunk,cb)
        this.onwrite = function(er) {
            onwrite(stream, er);
        };
        // the callback that the user supplies to write(chunk,encoding,cb)
        this.writecb = null;
        // the amount that is being written when _write is called.
        this.writelen = 0;
        this.bufferedRequest = null;
        this.lastBufferedRequest = null;
        // number of pending user-supplied write callbacks
        // this must be 0 before 'finish' can be emitted
        this.pendingcb = 0;
        // emit prefinish if the only thing we're waiting for is _write cbs
        // This is relevant for synchronous Transform streams
        this.prefinished = false;
        // True if the error was already emitted and should not be thrown again
        this.errorEmitted = false;
        // count buffered requests
        this.bufferedRequestCount = 0;
        // allocate the first CorkedRequest, there is always
        // one allocated and free to use, and we maintain at most two
        this.corkedRequestsFree = new CorkedRequest(this);
    }
    WritableState.prototype.getBuffer = function getBuffer() {
        var current = this.bufferedRequest;
        var out = [];
        while(current){
            out.push(current);
            current = current.next;
        }
        return out;
    };
    (function() {
        try {
            Object.defineProperty(WritableState.prototype, 'buffer', {
                get: internalUtil.deprecate(function() {
                    return this.getBuffer();
                }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
            });
        } catch (_) {}
    })();
    // Test _writableState for inheritance to account for Duplex streams,
    // whose prototype chain only points to Readable.
    var realHasInstance;
    if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
        realHasInstance = Function.prototype[Symbol.hasInstance];
        Object.defineProperty(Writable, Symbol.hasInstance, {
            value: function value(object) {
                if (realHasInstance.call(this, object)) return true;
                if (this !== Writable) return false;
                return object && _instanceof$7(object._writableState, WritableState);
            }
        });
    } else {
        realHasInstance = function realHasInstance(object) {
            return _instanceof$7(object, this);
        };
    }
    function Writable(options) {
        Duplex = Duplex || require_stream_duplex();
        // Writable ctor is applied to Duplexes, too.
        // `realHasInstance` is necessary because using plain `instanceof`
        // would return false, as no `_writableState` property is attached.
        // Trying to use the custom `instanceof` for Writable here will also break the
        // Node.js LazyTransform implementation, which has a non-trivial getter for
        // `_writableState` that would lead to infinite recursion.
        if (!realHasInstance.call(Writable, this) && !_instanceof$7(this, Duplex)) {
            return new Writable(options);
        }
        this._writableState = new WritableState(options, this);
        // legacy.
        this.writable = true;
        if (options) {
            if (typeof options.write === 'function') this._write = options.write;
            if (typeof options.writev === 'function') this._writev = options.writev;
            if (typeof options.destroy === 'function') this._destroy = options.destroy;
            if (typeof options.final === 'function') this._final = options.final;
        }
        Stream.call(this);
    }
    // Otherwise people can pipe Writable streams, which is just wrong.
    Writable.prototype.pipe = function() {
        this.emit('error', new Error('Cannot pipe, not readable'));
    };
    function writeAfterEnd(stream, cb) {
        var er = new Error('write after end');
        // TODO: defer error events consistently everywhere, not just the cb
        stream.emit('error', er);
        pna.nextTick(cb, er);
    }
    // Checks that a user-supplied chunk is valid, especially for the particular
    // mode the stream is in. Currently this means that `null` is never accepted
    // and undefined/non-string values are only allowed in object mode.
    function validChunk(stream, state, chunk, cb) {
        var valid = true;
        var er = false;
        if (chunk === null) {
            er = new TypeError('May not write null values to stream');
        } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
            er = new TypeError('Invalid non-string/buffer chunk');
        }
        if (er) {
            stream.emit('error', er);
            pna.nextTick(cb, er);
            valid = false;
        }
        return valid;
    }
    Writable.prototype.write = function(chunk, encoding, cb) {
        var state = this._writableState;
        var ret = false;
        var isBuf = !state.objectMode && _isUint8Array(chunk);
        if (isBuf && !Buffer.isBuffer(chunk)) {
            chunk = _uint8ArrayToBuffer(chunk);
        }
        if (typeof encoding === 'function') {
            cb = encoding;
            encoding = null;
        }
        if (isBuf) encoding = 'buffer';
        else if (!encoding) encoding = state.defaultEncoding;
        if (typeof cb !== 'function') cb = nop;
        if (state.ended) writeAfterEnd(this, cb);
        else if (isBuf || validChunk(this, state, chunk, cb)) {
            state.pendingcb++;
            ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
        }
        return ret;
    };
    Writable.prototype.cork = function() {
        var state = this._writableState;
        state.corked++;
    };
    Writable.prototype.uncork = function() {
        var state = this._writableState;
        if (state.corked) {
            state.corked--;
            if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
        }
    };
    Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
        // node::ParseEncoding() requires lower case.
        if (typeof encoding === 'string') encoding = encoding.toLowerCase();
        if (!([
            'hex',
            'utf8',
            'utf-8',
            'ascii',
            'binary',
            'base64',
            'ucs2',
            'ucs-2',
            'utf16le',
            'utf-16le',
            'raw'
        ].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
        this._writableState.defaultEncoding = encoding;
        return this;
    };
    function decodeChunk(state, chunk, encoding) {
        if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
            chunk = Buffer.from(chunk, encoding);
        }
        return chunk;
    }
    Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
        // making it explicit this property is not enumerable
        // because otherwise some prototype manipulation in
        // userland will fail
        enumerable: false,
        get: function get() {
            return this._writableState.highWaterMark;
        }
    });
    // if we're already writing something, then just put this
    // in the queue, and wait our turn.  Otherwise, call _write
    // If we return false, then we need a drain event, so set that flag.
    function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
        if (!isBuf) {
            var newChunk = decodeChunk(state, chunk, encoding);
            if (chunk !== newChunk) {
                isBuf = true;
                encoding = 'buffer';
                chunk = newChunk;
            }
        }
        var len = state.objectMode ? 1 : chunk.length;
        state.length += len;
        var ret = state.length < state.highWaterMark;
        // we must ensure that previous needDrain will not be reset to false.
        if (!ret) state.needDrain = true;
        if (state.writing || state.corked) {
            var last = state.lastBufferedRequest;
            state.lastBufferedRequest = {
                chunk: chunk,
                encoding: encoding,
                isBuf: isBuf,
                callback: cb,
                next: null
            };
            if (last) {
                last.next = state.lastBufferedRequest;
            } else {
                state.bufferedRequest = state.lastBufferedRequest;
            }
            state.bufferedRequestCount += 1;
        } else {
            doWrite(stream, state, false, len, chunk, encoding, cb);
        }
        return ret;
    }
    function doWrite(stream, state, writev, len, chunk, encoding, cb) {
        state.writelen = len;
        state.writecb = cb;
        state.writing = true;
        state.sync = true;
        if (writev) stream._writev(chunk, state.onwrite);
        else stream._write(chunk, encoding, state.onwrite);
        state.sync = false;
    }
    function onwriteError(stream, state, sync, er, cb) {
        --state.pendingcb;
        if (sync) {
            // defer the callback if we are being called synchronously
            // to avoid piling up things on the stack
            pna.nextTick(cb, er);
            // this can emit finish, and it will always happen
            // after error
            pna.nextTick(finishMaybe, stream, state);
            stream._writableState.errorEmitted = true;
            stream.emit('error', er);
        } else {
            // the caller expect this to happen before if
            // it is async
            cb(er);
            stream._writableState.errorEmitted = true;
            stream.emit('error', er);
            // this can emit finish, but finish must
            // always follow error
            finishMaybe(stream, state);
        }
    }
    function onwriteStateUpdate(state) {
        state.writing = false;
        state.writecb = null;
        state.length -= state.writelen;
        state.writelen = 0;
    }
    function onwrite(stream, er) {
        var state = stream._writableState;
        var sync = state.sync;
        var cb = state.writecb;
        onwriteStateUpdate(state);
        if (er) onwriteError(stream, state, sync, er, cb);
        else {
            // Check if we're actually ready to finish, but don't emit yet
            var finished = needFinish(state);
            if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
                clearBuffer(stream, state);
            }
            if (sync) {
                /*<replacement>*/ asyncWrite(afterWrite, stream, state, finished, cb);
            /*</replacement>*/ } else {
                afterWrite(stream, state, finished, cb);
            }
        }
    }
    function afterWrite(stream, state, finished, cb) {
        if (!finished) onwriteDrain(stream, state);
        state.pendingcb--;
        cb();
        finishMaybe(stream, state);
    }
    // Must force callback to be called on nextTick, so that we don't
    // emit 'drain' before the write() consumer gets the 'false' return
    // value, and has a chance to attach a 'drain' listener.
    function onwriteDrain(stream, state) {
        if (state.length === 0 && state.needDrain) {
            state.needDrain = false;
            stream.emit('drain');
        }
    }
    // if there's something in the buffer waiting, then process it
    function clearBuffer(stream, state) {
        state.bufferProcessing = true;
        var entry = state.bufferedRequest;
        if (stream._writev && entry && entry.next) {
            // Fast case, write everything using _writev()
            var l = state.bufferedRequestCount;
            var buffer = new Array(l);
            var holder = state.corkedRequestsFree;
            holder.entry = entry;
            var count = 0;
            var allBuffers = true;
            while(entry){
                buffer[count] = entry;
                if (!entry.isBuf) allBuffers = false;
                entry = entry.next;
                count += 1;
            }
            buffer.allBuffers = allBuffers;
            doWrite(stream, state, true, state.length, buffer, '', holder.finish);
            // doWrite is almost always async, defer these to save a bit of time
            // as the hot path ends with doWrite
            state.pendingcb++;
            state.lastBufferedRequest = null;
            if (holder.next) {
                state.corkedRequestsFree = holder.next;
                holder.next = null;
            } else {
                state.corkedRequestsFree = new CorkedRequest(state);
            }
            state.bufferedRequestCount = 0;
        } else {
            // Slow case, write chunks one-by-one
            while(entry){
                var chunk = entry.chunk;
                var encoding = entry.encoding;
                var cb = entry.callback;
                var len = state.objectMode ? 1 : chunk.length;
                doWrite(stream, state, false, len, chunk, encoding, cb);
                entry = entry.next;
                state.bufferedRequestCount--;
                // if we didn't call the onwrite immediately, then
                // it means that we need to wait until it does.
                // also, that means that the chunk and cb are currently
                // being processed, so move the buffer counter past them.
                if (state.writing) {
                    break;
                }
            }
            if (entry === null) state.lastBufferedRequest = null;
        }
        state.bufferedRequest = entry;
        state.bufferProcessing = false;
    }
    Writable.prototype._write = function(chunk, encoding, cb) {
        cb(new Error('_write() is not implemented'));
    };
    Writable.prototype._writev = null;
    Writable.prototype.end = function(chunk, encoding, cb) {
        var state = this._writableState;
        if (typeof chunk === 'function') {
            cb = chunk;
            chunk = null;
            encoding = null;
        } else if (typeof encoding === 'function') {
            cb = encoding;
            encoding = null;
        }
        if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);
        // .end() fully uncorks
        if (state.corked) {
            state.corked = 1;
            this.uncork();
        }
        // ignore unnecessary end() calls.
        if (!state.ending) endWritable(this, state, cb);
    };
    function needFinish(state) {
        return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
    }
    function callFinal(stream, state) {
        stream._final(function(err) {
            state.pendingcb--;
            if (err) {
                stream.emit('error', err);
            }
            state.prefinished = true;
            stream.emit('prefinish');
            finishMaybe(stream, state);
        });
    }
    function prefinish(stream, state) {
        if (!state.prefinished && !state.finalCalled) {
            if (typeof stream._final === 'function') {
                state.pendingcb++;
                state.finalCalled = true;
                pna.nextTick(callFinal, stream, state);
            } else {
                state.prefinished = true;
                stream.emit('prefinish');
            }
        }
    }
    function finishMaybe(stream, state) {
        var need = needFinish(state);
        if (need) {
            prefinish(stream, state);
            if (state.pendingcb === 0) {
                state.finished = true;
                stream.emit('finish');
            }
        }
        return need;
    }
    function endWritable(stream, state, cb) {
        state.ending = true;
        finishMaybe(stream, state);
        if (cb) {
            if (state.finished) pna.nextTick(cb);
            else stream.once('finish', cb);
        }
        state.ended = true;
        stream.writable = false;
    }
    function onCorkedFinish(corkReq, state, err) {
        var entry = corkReq.entry;
        corkReq.entry = null;
        while(entry){
            var cb = entry.callback;
            state.pendingcb--;
            cb(err);
            entry = entry.next;
        }
        // reuse the free corkReq.
        state.corkedRequestsFree.next = corkReq;
    }
    Object.defineProperty(Writable.prototype, 'destroyed', {
        get: function get() {
            if (this._writableState === undefined) {
                return false;
            }
            return this._writableState.destroyed;
        },
        set: function set(value) {
            // we ignore the value if the stream
            // has not been initialized yet
            if (!this._writableState) {
                return;
            }
            // backward compatibility, the user is explicitly
            // managing destroyed
            this._writableState.destroyed = value;
        }
    });
    Writable.prototype.destroy = destroyImpl.destroy;
    Writable.prototype._undestroy = destroyImpl.undestroy;
    Writable.prototype._destroy = function(err, cb) {
        this.end();
        cb(err);
    };
    return _stream_writable;
}

function _instanceof$6(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
var _stream_duplex;
var hasRequired_stream_duplex;
function require_stream_duplex() {
    if (hasRequired_stream_duplex) return _stream_duplex;
    hasRequired_stream_duplex = 1;
    /*<replacement>*/ var pna = requireProcessNextickArgs();
    /*</replacement>*/ /*<replacement>*/ var objectKeys = Object.keys || function(obj) {
        var keys = [];
        for(var key in obj){
            keys.push(key);
        }
        return keys;
    };
    /*</replacement>*/ _stream_duplex = Duplex;
    /*<replacement>*/ var util = Object.create(requireUtil());
    util.inherits = requireInherits();
    /*</replacement>*/ var Readable = require_stream_readable();
    var Writable = require_stream_writable();
    util.inherits(Duplex, Readable);
    {
        // avoid scope creep, the keys array can then be collected
        var keys = objectKeys(Writable.prototype);
        for(var v = 0; v < keys.length; v++){
            var method = keys[v];
            if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
        }
    }
    function Duplex(options) {
        if (!_instanceof$6(this, Duplex)) return new Duplex(options);
        Readable.call(this, options);
        Writable.call(this, options);
        if (options && options.readable === false) this.readable = false;
        if (options && options.writable === false) this.writable = false;
        this.allowHalfOpen = true;
        if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;
        this.once('end', onend);
    }
    Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
        // making it explicit this property is not enumerable
        // because otherwise some prototype manipulation in
        // userland will fail
        enumerable: false,
        get: function get() {
            return this._writableState.highWaterMark;
        }
    });
    // the no-half-open enforcer
    function onend() {
        // if we allow half-open state, or if the writable side ended,
        // then we're ok.
        if (this.allowHalfOpen || this._writableState.ended) return;
        // no more data can be written.
        // But allow more writes to happen in this tick.
        pna.nextTick(onEndNT, this);
    }
    function onEndNT(self) {
        self.end();
    }
    Object.defineProperty(Duplex.prototype, 'destroyed', {
        get: function get() {
            if (this._readableState === undefined || this._writableState === undefined) {
                return false;
            }
            return this._readableState.destroyed && this._writableState.destroyed;
        },
        set: function set(value) {
            // we ignore the value if the stream
            // has not been initialized yet
            if (this._readableState === undefined || this._writableState === undefined) {
                return;
            }
            // backward compatibility, the user is explicitly
            // managing destroyed
            this._readableState.destroyed = value;
            this._writableState.destroyed = value;
        }
    });
    Duplex.prototype._destroy = function(err, cb) {
        this.push(null);
        this.end();
        pna.nextTick(cb, err);
    };
    return _stream_duplex;
}

function _instanceof$5(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
var _stream_readable;
var hasRequired_stream_readable;
function require_stream_readable() {
    if (hasRequired_stream_readable) return _stream_readable;
    hasRequired_stream_readable = 1;
    /*<replacement>*/ var pna = requireProcessNextickArgs();
    /*</replacement>*/ _stream_readable = Readable;
    /*<replacement>*/ var isArray = requireIsarray();
    /*</replacement>*/ /*<replacement>*/ var Duplex;
    /*</replacement>*/ Readable.ReadableState = ReadableState;
    /*<replacement>*/ require$$2.EventEmitter;
    var EElistenerCount = function EElistenerCount(emitter, type) {
        return emitter.listeners(type).length;
    };
    /*</replacement>*/ /*<replacement>*/ var Stream = requireStream();
    /*</replacement>*/ /*<replacement>*/ var Buffer = requireSafeBuffer().Buffer;
    var OurUint8Array = (typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : {}).Uint8Array || function() {};
    function _uint8ArrayToBuffer(chunk) {
        return Buffer.from(chunk);
    }
    function _isUint8Array(obj) {
        return Buffer.isBuffer(obj) || _instanceof$5(obj, OurUint8Array);
    }
    /*</replacement>*/ /*<replacement>*/ var util = Object.create(requireUtil());
    util.inherits = requireInherits();
    /*</replacement>*/ /*<replacement>*/ var debugUtil = require$$1;
    var debug = void 0;
    if (debugUtil && debugUtil.debuglog) {
        debug = debugUtil.debuglog('stream');
    } else {
        debug = function debug() {};
    }
    /*</replacement>*/ var BufferList = requireBufferList();
    var destroyImpl = requireDestroy();
    var StringDecoder;
    util.inherits(Readable, Stream);
    var kProxyEvents = [
        'error',
        'close',
        'destroy',
        'pause',
        'resume'
    ];
    function prependListener(emitter, event, fn) {
        // Sadly this is not cacheable as some libraries bundle their own
        // event emitter implementation with them.
        if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn);
        // This is a hack to make sure that our error handler is attached before any
        // userland ones.  NEVER DO THIS. This is here only because this code needs
        // to continue to work with older versions of Node.js that do not include
        // the prependListener() method. The goal is to eventually remove this hack.
        if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);
        else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);
        else emitter._events[event] = [
            fn,
            emitter._events[event]
        ];
    }
    function ReadableState(options, stream) {
        Duplex = Duplex || require_stream_duplex();
        options = options || {};
        // Duplex streams are both readable and writable, but share
        // the same options object.
        // However, some cases require setting options to different
        // values for the readable and the writable sides of the duplex stream.
        // These options can be provided separately as readableXXX and writableXXX.
        var isDuplex = _instanceof$5(stream, Duplex);
        // object stream flag. Used to make read(n) ignore n and to
        // make all the buffer merging and length checks go away
        this.objectMode = !!options.objectMode;
        if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;
        // the point at which it stops calling _read() to fill the buffer
        // Note: 0 is a valid value, means "don't call _read preemptively ever"
        var hwm = options.highWaterMark;
        var readableHwm = options.readableHighWaterMark;
        var defaultHwm = this.objectMode ? 16 : 16 * 1024;
        if (hwm || hwm === 0) this.highWaterMark = hwm;
        else if (isDuplex && (readableHwm || readableHwm === 0)) this.highWaterMark = readableHwm;
        else this.highWaterMark = defaultHwm;
        // cast to ints.
        this.highWaterMark = Math.floor(this.highWaterMark);
        // A linked list is used to store data chunks instead of an array because the
        // linked list can remove elements from the beginning faster than
        // array.shift()
        this.buffer = new BufferList();
        this.length = 0;
        this.pipes = null;
        this.pipesCount = 0;
        this.flowing = null;
        this.ended = false;
        this.endEmitted = false;
        this.reading = false;
        // a flag to be able to tell if the event 'readable'/'data' is emitted
        // immediately, or on a later tick.  We set this to true at first, because
        // any actions that shouldn't happen until "later" should generally also
        // not happen before the first read call.
        this.sync = true;
        // whenever we return null, then we set a flag to say
        // that we're awaiting a 'readable' event emission.
        this.needReadable = false;
        this.emittedReadable = false;
        this.readableListening = false;
        this.resumeScheduled = false;
        // has it been destroyed
        this.destroyed = false;
        // Crypto is kind of old and crusty.  Historically, its default string
        // encoding is 'binary' so we have to make this configurable.
        // Everything else in the universe uses 'utf8', though.
        this.defaultEncoding = options.defaultEncoding || 'utf8';
        // the number of writers that are awaiting a drain event in .pipe()s
        this.awaitDrain = 0;
        // if true, a maybeReadMore has been scheduled
        this.readingMore = false;
        this.decoder = null;
        this.encoding = null;
        if (options.encoding) {
            if (!StringDecoder) StringDecoder = require$$11.StringDecoder;
            this.decoder = new StringDecoder(options.encoding);
            this.encoding = options.encoding;
        }
    }
    function Readable(options) {
        Duplex = Duplex || require_stream_duplex();
        if (!_instanceof$5(this, Readable)) return new Readable(options);
        this._readableState = new ReadableState(options, this);
        // legacy
        this.readable = true;
        if (options) {
            if (typeof options.read === 'function') this._read = options.read;
            if (typeof options.destroy === 'function') this._destroy = options.destroy;
        }
        Stream.call(this);
    }
    Object.defineProperty(Readable.prototype, 'destroyed', {
        get: function get() {
            if (this._readableState === undefined) {
                return false;
            }
            return this._readableState.destroyed;
        },
        set: function set(value) {
            // we ignore the value if the stream
            // has not been initialized yet
            if (!this._readableState) {
                return;
            }
            // backward compatibility, the user is explicitly
            // managing destroyed
            this._readableState.destroyed = value;
        }
    });
    Readable.prototype.destroy = destroyImpl.destroy;
    Readable.prototype._undestroy = destroyImpl.undestroy;
    Readable.prototype._destroy = function(err, cb) {
        this.push(null);
        cb(err);
    };
    // Manually shove something into the read() buffer.
    // This returns true if the highWaterMark has not been hit yet,
    // similar to how Writable.write() returns true if you should
    // write() some more.
    Readable.prototype.push = function(chunk, encoding) {
        var state = this._readableState;
        var skipChunkCheck;
        if (!state.objectMode) {
            if (typeof chunk === 'string') {
                encoding = encoding || state.defaultEncoding;
                if (encoding !== state.encoding) {
                    chunk = Buffer.from(chunk, encoding);
                    encoding = '';
                }
                skipChunkCheck = true;
            }
        } else {
            skipChunkCheck = true;
        }
        return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
    };
    // Unshift should *always* be something directly out of read()
    Readable.prototype.unshift = function(chunk) {
        return readableAddChunk(this, chunk, null, true, false);
    };
    function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
        var state = stream._readableState;
        if (chunk === null) {
            state.reading = false;
            onEofChunk(stream, state);
        } else {
            var er;
            if (!skipChunkCheck) er = chunkInvalid(state, chunk);
            if (er) {
                stream.emit('error', er);
            } else if (state.objectMode || chunk && chunk.length > 0) {
                if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
                    chunk = _uint8ArrayToBuffer(chunk);
                }
                if (addToFront) {
                    if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event'));
                    else addChunk(stream, state, chunk, true);
                } else if (state.ended) {
                    stream.emit('error', new Error('stream.push() after EOF'));
                } else {
                    state.reading = false;
                    if (state.decoder && !encoding) {
                        chunk = state.decoder.write(chunk);
                        if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);
                        else maybeReadMore(stream, state);
                    } else {
                        addChunk(stream, state, chunk, false);
                    }
                }
            } else if (!addToFront) {
                state.reading = false;
            }
        }
        return needMoreData(state);
    }
    function addChunk(stream, state, chunk, addToFront) {
        if (state.flowing && state.length === 0 && !state.sync) {
            stream.emit('data', chunk);
            stream.read(0);
        } else {
            // update the buffer info.
            state.length += state.objectMode ? 1 : chunk.length;
            if (addToFront) state.buffer.unshift(chunk);
            else state.buffer.push(chunk);
            if (state.needReadable) emitReadable(stream);
        }
        maybeReadMore(stream, state);
    }
    function chunkInvalid(state, chunk) {
        var er;
        if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
            er = new TypeError('Invalid non-string/buffer chunk');
        }
        return er;
    }
    // if it's past the high water mark, we can push in some more.
    // Also, if we have no data yet, we can stand some
    // more bytes.  This is to work around cases where hwm=0,
    // such as the repl.  Also, if the push() triggered a
    // readable event, and the user called read(largeNumber) such that
    // needReadable was set, then we ought to push more, so that another
    // 'readable' event will be triggered.
    function needMoreData(state) {
        return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
    }
    Readable.prototype.isPaused = function() {
        return this._readableState.flowing === false;
    };
    // backwards compatibility.
    Readable.prototype.setEncoding = function(enc) {
        if (!StringDecoder) StringDecoder = require$$11.StringDecoder;
        this._readableState.decoder = new StringDecoder(enc);
        this._readableState.encoding = enc;
        return this;
    };
    // Don't raise the hwm > 8MB
    var MAX_HWM = 0x800000;
    function computeNewHighWaterMark(n) {
        if (n >= MAX_HWM) {
            n = MAX_HWM;
        } else {
            // Get the next highest power of 2 to prevent increasing hwm excessively in
            // tiny amounts
            n--;
            n |= n >>> 1;
            n |= n >>> 2;
            n |= n >>> 4;
            n |= n >>> 8;
            n |= n >>> 16;
            n++;
        }
        return n;
    }
    // This function is designed to be inlinable, so please take care when making
    // changes to the function body.
    function howMuchToRead(n, state) {
        if (n <= 0 || state.length === 0 && state.ended) return 0;
        if (state.objectMode) return 1;
        if (n !== n) {
            // Only flow one buffer at a time
            if (state.flowing && state.length) return state.buffer.head.data.length;
            else return state.length;
        }
        // If we're asking for more than the current hwm, then raise the hwm.
        if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
        if (n <= state.length) return n;
        // Don't have enough
        if (!state.ended) {
            state.needReadable = true;
            return 0;
        }
        return state.length;
    }
    // you can override either this method, or the async _read(n) below.
    Readable.prototype.read = function(n) {
        debug('read', n);
        n = parseInt(n, 10);
        var state = this._readableState;
        var nOrig = n;
        if (n !== 0) state.emittedReadable = false;
        // if we're doing read(0) to trigger a readable event, but we
        // already have a bunch of data in the buffer, then just trigger
        // the 'readable' event and move on.
        if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
            debug('read: emitReadable', state.length, state.ended);
            if (state.length === 0 && state.ended) endReadable(this);
            else emitReadable(this);
            return null;
        }
        n = howMuchToRead(n, state);
        // if we've ended, and we're now clear, then finish it up.
        if (n === 0 && state.ended) {
            if (state.length === 0) endReadable(this);
            return null;
        }
        // All the actual chunk generation logic needs to be
        // *below* the call to _read.  The reason is that in certain
        // synthetic stream cases, such as passthrough streams, _read
        // may be a completely synchronous operation which may change
        // the state of the read buffer, providing enough data when
        // before there was *not* enough.
        //
        // So, the steps are:
        // 1. Figure out what the state of things will be after we do
        // a read from the buffer.
        //
        // 2. If that resulting state will trigger a _read, then call _read.
        // Note that this may be asynchronous, or synchronous.  Yes, it is
        // deeply ugly to write APIs this way, but that still doesn't mean
        // that the Readable class should behave improperly, as streams are
        // designed to be sync/async agnostic.
        // Take note if the _read call is sync or async (ie, if the read call
        // has returned yet), so that we know whether or not it's safe to emit
        // 'readable' etc.
        //
        // 3. Actually pull the requested chunks out of the buffer and return.
        // if we need a readable event, then we need to do some reading.
        var doRead = state.needReadable;
        debug('need readable', doRead);
        // if we currently have less than the highWaterMark, then also read some
        if (state.length === 0 || state.length - n < state.highWaterMark) {
            doRead = true;
            debug('length less than watermark', doRead);
        }
        // however, if we've ended, then there's no point, and if we're already
        // reading, then it's unnecessary.
        if (state.ended || state.reading) {
            doRead = false;
            debug('reading or ended', doRead);
        } else if (doRead) {
            debug('do read');
            state.reading = true;
            state.sync = true;
            // if the length is currently zero, then we *need* a readable event.
            if (state.length === 0) state.needReadable = true;
            // call internal read method
            this._read(state.highWaterMark);
            state.sync = false;
            // If _read pushed data synchronously, then `reading` will be false,
            // and we need to re-evaluate how much data we can return to the user.
            if (!state.reading) n = howMuchToRead(nOrig, state);
        }
        var ret;
        if (n > 0) ret = fromList(n, state);
        else ret = null;
        if (ret === null) {
            state.needReadable = true;
            n = 0;
        } else {
            state.length -= n;
        }
        if (state.length === 0) {
            // If we have nothing in the buffer, then we want to know
            // as soon as we *do* get something into the buffer.
            if (!state.ended) state.needReadable = true;
            // If we tried to read() past the EOF, then emit end on the next tick.
            if (nOrig !== n && state.ended) endReadable(this);
        }
        if (ret !== null) this.emit('data', ret);
        return ret;
    };
    function onEofChunk(stream, state) {
        if (state.ended) return;
        if (state.decoder) {
            var chunk = state.decoder.end();
            if (chunk && chunk.length) {
                state.buffer.push(chunk);
                state.length += state.objectMode ? 1 : chunk.length;
            }
        }
        state.ended = true;
        // emit 'readable' now to make sure it gets picked up.
        emitReadable(stream);
    }
    // Don't emit readable right away in sync mode, because this can trigger
    // another read() call => stack overflow.  This way, it might trigger
    // a nextTick recursion warning, but that's not so bad.
    function emitReadable(stream) {
        var state = stream._readableState;
        state.needReadable = false;
        if (!state.emittedReadable) {
            debug('emitReadable', state.flowing);
            state.emittedReadable = true;
            if (state.sync) pna.nextTick(emitReadable_, stream);
            else emitReadable_(stream);
        }
    }
    function emitReadable_(stream) {
        debug('emit readable');
        stream.emit('readable');
        flow(stream);
    }
    // at this point, the user has presumably seen the 'readable' event,
    // and called read() to consume some data.  that may have triggered
    // in turn another _read(n) call, in which case reading = true if
    // it's in progress.
    // However, if we're not ended, or reading, and the length < hwm,
    // then go ahead and try to read some more preemptively.
    function maybeReadMore(stream, state) {
        if (!state.readingMore) {
            state.readingMore = true;
            pna.nextTick(maybeReadMore_, stream, state);
        }
    }
    function maybeReadMore_(stream, state) {
        var len = state.length;
        while(!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark){
            debug('maybeReadMore read 0');
            stream.read(0);
            if (len === state.length) break;
            else len = state.length;
        }
        state.readingMore = false;
    }
    // abstract method.  to be overridden in specific implementation classes.
    // call cb(er, data) where data is <= n in length.
    // for virtual (non-string, non-buffer) streams, "length" is somewhat
    // arbitrary, and perhaps not very meaningful.
    Readable.prototype._read = function(n) {
        this.emit('error', new Error('_read() is not implemented'));
    };
    Readable.prototype.pipe = function(dest, pipeOpts) {
        var src = this;
        var state = this._readableState;
        switch(state.pipesCount){
            case 0:
                state.pipes = dest;
                break;
            case 1:
                state.pipes = [
                    state.pipes,
                    dest
                ];
                break;
            default:
                state.pipes.push(dest);
                break;
        }
        state.pipesCount += 1;
        debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
        var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
        var endFn = doEnd ? onend : unpipe;
        if (state.endEmitted) pna.nextTick(endFn);
        else src.once('end', endFn);
        dest.on('unpipe', onunpipe);
        function onunpipe(readable, unpipeInfo) {
            debug('onunpipe');
            if (readable === src) {
                if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
                    unpipeInfo.hasUnpiped = true;
                    cleanup();
                }
            }
        }
        function onend() {
            debug('onend');
            dest.end();
        }
        // when the dest drains, it reduces the awaitDrain counter
        // on the source.  This would be more elegant with a .once()
        // handler in flow(), but adding and removing repeatedly is
        // too slow.
        var ondrain = pipeOnDrain(src);
        dest.on('drain', ondrain);
        var cleanedUp = false;
        function cleanup() {
            debug('cleanup');
            // cleanup event handlers once the pipe is broken
            dest.removeListener('close', onclose);
            dest.removeListener('finish', onfinish);
            dest.removeListener('drain', ondrain);
            dest.removeListener('error', onerror);
            dest.removeListener('unpipe', onunpipe);
            src.removeListener('end', onend);
            src.removeListener('end', unpipe);
            src.removeListener('data', ondata);
            cleanedUp = true;
            // if the reader is waiting for a drain event from this
            // specific writer, then it would cause it to never start
            // flowing again.
            // So, if this is awaiting a drain, then we just call it now.
            // If we don't know, then assume that we are waiting for one.
            if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
        }
        // If the user pushes more data while we're writing to dest then we'll end up
        // in ondata again. However, we only want to increase awaitDrain once because
        // dest will only emit one 'drain' event for the multiple writes.
        // => Introduce a guard on increasing awaitDrain.
        var increasedAwaitDrain = false;
        src.on('data', ondata);
        function ondata(chunk) {
            debug('ondata');
            increasedAwaitDrain = false;
            var ret = dest.write(chunk);
            if (false === ret && !increasedAwaitDrain) {
                // If the user unpiped during `dest.write()`, it is possible
                // to get stuck in a permanently paused state if that write
                // also returned false.
                // => Check whether `dest` is still a piping destination.
                if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
                    debug('false write response, pause', state.awaitDrain);
                    state.awaitDrain++;
                    increasedAwaitDrain = true;
                }
                src.pause();
            }
        }
        // if the dest has an error, then stop piping into it.
        // however, don't suppress the throwing behavior for this.
        function onerror(er) {
            debug('onerror', er);
            unpipe();
            dest.removeListener('error', onerror);
            if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
        }
        // Make sure our error handler is attached before userland ones.
        prependListener(dest, 'error', onerror);
        // Both close and finish should trigger unpipe, but only once.
        function onclose() {
            dest.removeListener('finish', onfinish);
            unpipe();
        }
        dest.once('close', onclose);
        function onfinish() {
            debug('onfinish');
            dest.removeListener('close', onclose);
            unpipe();
        }
        dest.once('finish', onfinish);
        function unpipe() {
            debug('unpipe');
            src.unpipe(dest);
        }
        // tell the dest that it's being piped to
        dest.emit('pipe', src);
        // start the flow if it hasn't been started already.
        if (!state.flowing) {
            debug('pipe resume');
            src.resume();
        }
        return dest;
    };
    function pipeOnDrain(src) {
        return function() {
            var state = src._readableState;
            debug('pipeOnDrain', state.awaitDrain);
            if (state.awaitDrain) state.awaitDrain--;
            if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
                state.flowing = true;
                flow(src);
            }
        };
    }
    Readable.prototype.unpipe = function(dest) {
        var state = this._readableState;
        var unpipeInfo = {
            hasUnpiped: false
        };
        // if we're not piping anywhere, then do nothing.
        if (state.pipesCount === 0) return this;
        // just one destination.  most common case.
        if (state.pipesCount === 1) {
            // passed in one, but it's not the right one.
            if (dest && dest !== state.pipes) return this;
            if (!dest) dest = state.pipes;
            // got a match.
            state.pipes = null;
            state.pipesCount = 0;
            state.flowing = false;
            if (dest) dest.emit('unpipe', this, unpipeInfo);
            return this;
        }
        // slow case. multiple pipe destinations.
        if (!dest) {
            // remove all.
            var dests = state.pipes;
            var len = state.pipesCount;
            state.pipes = null;
            state.pipesCount = 0;
            state.flowing = false;
            for(var i = 0; i < len; i++){
                dests[i].emit('unpipe', this, {
                    hasUnpiped: false
                });
            }
            return this;
        }
        // try to find the right one.
        var index = indexOf(state.pipes, dest);
        if (index === -1) return this;
        state.pipes.splice(index, 1);
        state.pipesCount -= 1;
        if (state.pipesCount === 1) state.pipes = state.pipes[0];
        dest.emit('unpipe', this, unpipeInfo);
        return this;
    };
    // set up data events if they are asked for
    // Ensure readable listeners eventually get something
    Readable.prototype.on = function(ev, fn) {
        var res = Stream.prototype.on.call(this, ev, fn);
        if (ev === 'data') {
            // Start flowing on next tick if stream isn't explicitly paused
            if (this._readableState.flowing !== false) this.resume();
        } else if (ev === 'readable') {
            var state = this._readableState;
            if (!state.endEmitted && !state.readableListening) {
                state.readableListening = state.needReadable = true;
                state.emittedReadable = false;
                if (!state.reading) {
                    pna.nextTick(nReadingNextTick, this);
                } else if (state.length) {
                    emitReadable(this);
                }
            }
        }
        return res;
    };
    Readable.prototype.addListener = Readable.prototype.on;
    function nReadingNextTick(self1) {
        debug('readable nexttick read 0');
        self1.read(0);
    }
    // pause() and resume() are remnants of the legacy readable stream API
    // If the user uses them, then switch into old mode.
    Readable.prototype.resume = function() {
        var state = this._readableState;
        if (!state.flowing) {
            debug('resume');
            state.flowing = true;
            resume(this, state);
        }
        return this;
    };
    function resume(stream, state) {
        if (!state.resumeScheduled) {
            state.resumeScheduled = true;
            pna.nextTick(resume_, stream, state);
        }
    }
    function resume_(stream, state) {
        if (!state.reading) {
            debug('resume read 0');
            stream.read(0);
        }
        state.resumeScheduled = false;
        state.awaitDrain = 0;
        stream.emit('resume');
        flow(stream);
        if (state.flowing && !state.reading) stream.read(0);
    }
    Readable.prototype.pause = function() {
        debug('call pause flowing=%j', this._readableState.flowing);
        if (false !== this._readableState.flowing) {
            debug('pause');
            this._readableState.flowing = false;
            this.emit('pause');
        }
        return this;
    };
    function flow(stream) {
        var state = stream._readableState;
        debug('flow', state.flowing);
        while(state.flowing && stream.read() !== null){}
    }
    // wrap an old-style stream as the async data source.
    // This is *not* part of the readable stream interface.
    // It is an ugly unfortunate mess of history.
    Readable.prototype.wrap = function(stream) {
        var _this = this;
        var state = this._readableState;
        var paused = false;
        stream.on('end', function() {
            debug('wrapped end');
            if (state.decoder && !state.ended) {
                var chunk = state.decoder.end();
                if (chunk && chunk.length) _this.push(chunk);
            }
            _this.push(null);
        });
        stream.on('data', function(chunk) {
            debug('wrapped data');
            if (state.decoder) chunk = state.decoder.write(chunk);
            // don't skip over falsy values in objectMode
            if (state.objectMode && (chunk === null || chunk === undefined)) return;
            else if (!state.objectMode && (!chunk || !chunk.length)) return;
            var ret = _this.push(chunk);
            if (!ret) {
                paused = true;
                stream.pause();
            }
        });
        // proxy all the other methods.
        // important when wrapping filters and duplexes.
        for(var i in stream){
            if (this[i] === undefined && typeof stream[i] === 'function') {
                this[i] = function(method) {
                    return function() {
                        return stream[method].apply(stream, arguments);
                    };
                }(i);
            }
        }
        // proxy certain important events.
        for(var n = 0; n < kProxyEvents.length; n++){
            stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
        }
        // when we try to consume some more bytes, simply unpause the
        // underlying stream.
        this._read = function(n) {
            debug('wrapped _read', n);
            if (paused) {
                paused = false;
                stream.resume();
            }
        };
        return this;
    };
    Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
        // making it explicit this property is not enumerable
        // because otherwise some prototype manipulation in
        // userland will fail
        enumerable: false,
        get: function get() {
            return this._readableState.highWaterMark;
        }
    });
    // exposed for testing purposes only.
    Readable._fromList = fromList;
    // Pluck off n bytes from an array of buffers.
    // Length is the combined lengths of all the buffers in the list.
    // This function is designed to be inlinable, so please take care when making
    // changes to the function body.
    function fromList(n, state) {
        // nothing buffered
        if (state.length === 0) return null;
        var ret;
        if (state.objectMode) ret = state.buffer.shift();
        else if (!n || n >= state.length) {
            // read it all, truncate the list
            if (state.decoder) ret = state.buffer.join('');
            else if (state.buffer.length === 1) ret = state.buffer.head.data;
            else ret = state.buffer.concat(state.length);
            state.buffer.clear();
        } else {
            // read part of list
            ret = fromListPartial(n, state.buffer, state.decoder);
        }
        return ret;
    }
    // Extracts only enough buffered data to satisfy the amount requested.
    // This function is designed to be inlinable, so please take care when making
    // changes to the function body.
    function fromListPartial(n, list, hasStrings) {
        var ret;
        if (n < list.head.data.length) {
            // slice is the same for buffers and strings
            ret = list.head.data.slice(0, n);
            list.head.data = list.head.data.slice(n);
        } else if (n === list.head.data.length) {
            // first chunk is a perfect match
            ret = list.shift();
        } else {
            // result spans more than one buffer
            ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
        }
        return ret;
    }
    // Copies a specified amount of characters from the list of buffered data
    // chunks.
    // This function is designed to be inlinable, so please take care when making
    // changes to the function body.
    function copyFromBufferString(n, list) {
        var p = list.head;
        var c = 1;
        var ret = p.data;
        n -= ret.length;
        while(p = p.next){
            var str = p.data;
            var nb = n > str.length ? str.length : n;
            if (nb === str.length) ret += str;
            else ret += str.slice(0, n);
            n -= nb;
            if (n === 0) {
                if (nb === str.length) {
                    ++c;
                    if (p.next) list.head = p.next;
                    else list.head = list.tail = null;
                } else {
                    list.head = p;
                    p.data = str.slice(nb);
                }
                break;
            }
            ++c;
        }
        list.length -= c;
        return ret;
    }
    // Copies a specified amount of bytes from the list of buffered data chunks.
    // This function is designed to be inlinable, so please take care when making
    // changes to the function body.
    function copyFromBuffer(n, list) {
        var ret = Buffer.allocUnsafe(n);
        var p = list.head;
        var c = 1;
        p.data.copy(ret);
        n -= p.data.length;
        while(p = p.next){
            var buf = p.data;
            var nb = n > buf.length ? buf.length : n;
            buf.copy(ret, ret.length - n, 0, nb);
            n -= nb;
            if (n === 0) {
                if (nb === buf.length) {
                    ++c;
                    if (p.next) list.head = p.next;
                    else list.head = list.tail = null;
                } else {
                    list.head = p;
                    p.data = buf.slice(nb);
                }
                break;
            }
            ++c;
        }
        list.length -= c;
        return ret;
    }
    function endReadable(stream) {
        var state = stream._readableState;
        // If we get here before consuming all the bytes, then that is a
        // bug in node.  Should never happen.
        if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');
        if (!state.endEmitted) {
            state.ended = true;
            pna.nextTick(endReadableNT, state, stream);
        }
    }
    function endReadableNT(state, stream) {
        // Check that we didn't get one last unshift.
        if (!state.endEmitted && state.length === 0) {
            state.endEmitted = true;
            stream.readable = false;
            stream.emit('end');
        }
    }
    function indexOf(xs, x) {
        for(var i = 0, l = xs.length; i < l; i++){
            if (xs[i] === x) return i;
        }
        return -1;
    }
    return _stream_readable;
}

function _instanceof$4(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
var _stream_transform;
var hasRequired_stream_transform;
function require_stream_transform() {
    if (hasRequired_stream_transform) return _stream_transform;
    hasRequired_stream_transform = 1;
    _stream_transform = Transform;
    var Duplex = require_stream_duplex();
    /*<replacement>*/ var util = Object.create(requireUtil());
    util.inherits = requireInherits();
    /*</replacement>*/ util.inherits(Transform, Duplex);
    function afterTransform(er, data) {
        var ts = this._transformState;
        ts.transforming = false;
        var cb = ts.writecb;
        if (!cb) {
            return this.emit('error', new Error('write callback called multiple times'));
        }
        ts.writechunk = null;
        ts.writecb = null;
        if (data != null) this.push(data);
        cb(er);
        var rs = this._readableState;
        rs.reading = false;
        if (rs.needReadable || rs.length < rs.highWaterMark) {
            this._read(rs.highWaterMark);
        }
    }
    function Transform(options) {
        if (!_instanceof$4(this, Transform)) return new Transform(options);
        Duplex.call(this, options);
        this._transformState = {
            afterTransform: afterTransform.bind(this),
            needTransform: false,
            transforming: false,
            writecb: null,
            writechunk: null,
            writeencoding: null
        };
        // start out asking for a readable event once data is transformed.
        this._readableState.needReadable = true;
        // we have implemented the _read method, and done the other things
        // that Readable wants before the first _read call, so unset the
        // sync guard flag.
        this._readableState.sync = false;
        if (options) {
            if (typeof options.transform === 'function') this._transform = options.transform;
            if (typeof options.flush === 'function') this._flush = options.flush;
        }
        // When the writable side finishes, then flush out anything remaining.
        this.on('prefinish', prefinish);
    }
    function prefinish() {
        var _this = this;
        if (typeof this._flush === 'function') {
            this._flush(function(er, data) {
                done(_this, er, data);
            });
        } else {
            done(this, null, null);
        }
    }
    Transform.prototype.push = function(chunk, encoding) {
        this._transformState.needTransform = false;
        return Duplex.prototype.push.call(this, chunk, encoding);
    };
    // This is the part where you do stuff!
    // override this function in implementation classes.
    // 'chunk' is an input chunk.
    //
    // Call `push(newChunk)` to pass along transformed output
    // to the readable side.  You may call 'push' zero or more times.
    //
    // Call `cb(err)` when you are done with this chunk.  If you pass
    // an error, then that'll put the hurt on the whole operation.  If you
    // never call cb(), then you'll never get another chunk.
    Transform.prototype._transform = function(chunk, encoding, cb) {
        throw new Error('_transform() is not implemented');
    };
    Transform.prototype._write = function(chunk, encoding, cb) {
        var ts = this._transformState;
        ts.writecb = cb;
        ts.writechunk = chunk;
        ts.writeencoding = encoding;
        if (!ts.transforming) {
            var rs = this._readableState;
            if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
        }
    };
    // Doesn't matter what the args are here.
    // _transform does all the work.
    // That we got here means that the readable side wants more data.
    Transform.prototype._read = function(n) {
        var ts = this._transformState;
        if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
            ts.transforming = true;
            this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
        } else {
            // mark that we need a transform, so that any data that comes in
            // will get processed, now that we've asked for it.
            ts.needTransform = true;
        }
    };
    Transform.prototype._destroy = function(err, cb) {
        var _this2 = this;
        Duplex.prototype._destroy.call(this, err, function(err2) {
            cb(err2);
            _this2.emit('close');
        });
    };
    function done(stream, er, data) {
        if (er) return stream.emit('error', er);
        if (data != null) stream.push(data);
        // if there's nothing in the write buffer, then that means
        // that nothing more will ever be provided
        if (stream._writableState.length) throw new Error('Calling transform done when ws.length != 0');
        if (stream._transformState.transforming) throw new Error('Calling transform done when still transforming');
        return stream.push(null);
    }
    return _stream_transform;
}

function _instanceof$3(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
var _stream_passthrough;
var hasRequired_stream_passthrough;
function require_stream_passthrough() {
    if (hasRequired_stream_passthrough) return _stream_passthrough;
    hasRequired_stream_passthrough = 1;
    _stream_passthrough = PassThrough;
    var Transform = require_stream_transform();
    /*<replacement>*/ var util = Object.create(requireUtil());
    util.inherits = requireInherits();
    /*</replacement>*/ util.inherits(PassThrough, Transform);
    function PassThrough(options) {
        if (!_instanceof$3(this, PassThrough)) return new PassThrough(options);
        Transform.call(this, options);
    }
    PassThrough.prototype._transform = function(chunk, encoding, cb) {
        cb(null, chunk);
    };
    return _stream_passthrough;
}

var hasRequiredReadable;
function requireReadable() {
    if (hasRequiredReadable) return readable.exports;
    hasRequiredReadable = 1;
    (function(module, exports) {
        var Stream = require$$0;
        if (process.env.READABLE_STREAM === 'disable' && Stream) {
            module.exports = Stream;
            exports = module.exports = Stream.Readable;
            exports.Readable = Stream.Readable;
            exports.Writable = Stream.Writable;
            exports.Duplex = Stream.Duplex;
            exports.Transform = Stream.Transform;
            exports.PassThrough = Stream.PassThrough;
            exports.Stream = Stream;
        } else {
            exports = module.exports = require_stream_readable();
            exports.Stream = Stream || exports;
            exports.Readable = exports;
            exports.Writable = require_stream_writable();
            exports.Duplex = require_stream_duplex();
            exports.Transform = require_stream_transform();
            exports.PassThrough = require_stream_passthrough();
        }
    })(readable, readable.exports);
    return readable.exports;
}

function _instanceof$2(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
var bl;
var hasRequiredBl;
function requireBl() {
    if (hasRequiredBl) return bl;
    hasRequiredBl = 1;
    var DuplexStream = requireReadable().Duplex, util = require$$1;
    function BufferList(callback) {
        if (!_instanceof$2(this, BufferList)) return new BufferList(callback);
        this._bufs = [];
        this.length = 0;
        if (typeof callback == 'function') {
            this._callback = callback;
            var piper = (function piper(err) {
                if (this._callback) {
                    this._callback(err);
                    this._callback = null;
                }
            }).bind(this);
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
        var tot = 0, i = 0, _t;
        if (offset === 0) return [
            0,
            0
        ];
        for(; i < this._bufs.length; i++){
            _t = tot + this._bufs[i].length;
            if (offset < _t || i == this._bufs.length - 1) {
                return [
                    i,
                    offset - tot
                ];
            }
            tot = _t;
        }
    };
    BufferList.prototype._reverseOffset = function(blOffset) {
        var bufferId = blOffset[0];
        var offset = blOffset[1];
        for(var i = 0; i < bufferId; i++){
            offset += this._bufs[i].length;
        }
        return offset;
    };
    BufferList.prototype.append = function append(buf) {
        var i = 0;
        if (Buffer.isBuffer(buf)) {
            this._appendBuffer(buf);
        } else if (Array.isArray(buf)) {
            for(; i < buf.length; i++)this.append(buf[i]);
        } else if (_instanceof$2(buf, BufferList)) {
            // unwrap argument into individual BufferLists
            for(; i < buf._bufs.length; i++)this.append(buf._bufs[i]);
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
        var copy = !!dst, off = this._offset(srcStart), len = srcEnd - srcStart, bytes = len, bufoff = copy && dstStart || 0, start = off[1], l, i;
        // copy/slice everything
        if (srcStart === 0 && srcEnd == this.length) {
            if (!copy) {
                return this._bufs.length === 1 ? this._bufs[0] : Buffer.concat(this._bufs, this.length);
            }
            // copy, need to copy individual buffers
            for(i = 0; i < this._bufs.length; i++){
                this._bufs[i].copy(dst, bufoff);
                bufoff += this._bufs[i].length;
            }
            return dst;
        }
        // easy, cheap case where it's a subset of one of the buffers
        if (bytes <= this._bufs[off[0]].length - start) {
            return copy ? this._bufs[off[0]].copy(dst, dstStart, start, start + bytes) : this._bufs[off[0]].slice(start, start + bytes);
        }
        if (!copy) dst = Buffer.allocUnsafe(len);
        for(i = off[0]; i < this._bufs.length; i++){
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
        }
        // safeguard so that we don't return uninitialized memory
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
        var startOffset = this._offset(start), endOffset = this._offset(end), buffers = this._bufs.slice(startOffset[0], endOffset[0] + 1);
        if (endOffset[1] == 0) buffers.pop();
        else buffers[buffers.length - 1] = buffers[buffers.length - 1].slice(0, endOffset[1]);
        if (startOffset[1] != 0) buffers[0] = buffers[0].slice(startOffset[1]);
        return new BufferList(buffers);
    };
    BufferList.prototype.toString = function toString(encoding, start, end) {
        return this.slice(start, end).toString(encoding);
    };
    BufferList.prototype.consume = function consume(bytes) {
        // first, normalize the argument, in accordance with how Buffer does it
        bytes = MathTrunc(bytes);
        // do nothing if not a positive number
        if (Number.isNaN(bytes) || bytes <= 0) return this;
        while(this._bufs.length){
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
        var i = 0, copy = new BufferList();
        for(; i < this._bufs.length; i++)copy.append(this._bufs[i]);
        return copy;
    };
    BufferList.prototype._destroy = function _destroy(err, cb) {
        this._bufs.length = 0;
        this.length = 0;
        cb(err);
    };
    BufferList.prototype.indexOf = function(search, offset, encoding) {
        if (encoding === undefined && typeof offset === 'string') {
            encoding = offset;
            offset = undefined;
        }
        if (typeof search === 'function' || Array.isArray(search)) {
            throw new TypeError('The "value" argument must be one of type string, Buffer, BufferList, or Uint8Array.');
        } else if (typeof search === 'number') {
            search = Buffer.from([
                search
            ]);
        } else if (typeof search === 'string') {
            search = Buffer.from(search, encoding);
        } else if (_instanceof$2(search, BufferList)) {
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
        var blIndex = blOffset[0] // index of which internal buffer we're working on
        ;
        var buffOffset = blOffset[1] // offset of the internal buffer we're working on
        ;
        // scan over each buffer
        for(blIndex; blIndex < this._bufs.length; blIndex++){
            var buff = this._bufs[blIndex];
            while(buffOffset < buff.length){
                var availableWindow = buff.length - buffOffset;
                if (availableWindow >= search.length) {
                    var nativeSearchResult = buff.indexOf(search, buffOffset);
                    if (nativeSearchResult !== -1) {
                        return this._reverseOffset([
                            blIndex,
                            nativeSearchResult
                        ]);
                    }
                    buffOffset = buff.length - search.length + 1; // end of native search window
                } else {
                    var revOffset = this._reverseOffset([
                        blIndex,
                        buffOffset
                    ]);
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
    BufferList.prototype._match = function(offset, search) {
        if (this.length - offset < search.length) {
            return false;
        }
        for(var searchOffset = 0; searchOffset < search.length; searchOffset++){
            if (this.get(offset + searchOffset) !== search[searchOffset]) {
                return false;
            }
        }
        return true;
    };
    (function() {
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
        for(var m in methods){
            (function(m) {
                if (methods[m] === null) {
                    BufferList.prototype[m] = function(offset, byteLength) {
                        return this.slice(offset, offset + byteLength)[m](0, byteLength);
                    };
                } else {
                    BufferList.prototype[m] = function(offset) {
                        return this.slice(offset, offset + methods[m])[m](0);
                    };
                }
            })(m);
        }
    })();
    bl = BufferList;
    return bl;
}

var headers = {};

var hasRequiredHeaders;
function requireHeaders() {
    if (hasRequiredHeaders) return headers;
    hasRequiredHeaders = 1;
    var alloc = Buffer.alloc;
    var ZEROS = '0000000000000000000';
    var SEVENS = '7777777777777777777';
    var ZERO_OFFSET = '0'.charCodeAt(0);
    var USTAR_MAGIC = Buffer.from('ustar\x00', 'binary');
    var USTAR_VER = Buffer.from('00', 'binary');
    var GNU_MAGIC = Buffer.from('ustar\x20', 'binary');
    var GNU_VER = Buffer.from('\x20\x00', 'binary');
    var MASK = parseInt('7777', 8);
    var MAGIC_OFFSET = 257;
    var VERSION_OFFSET = 263;
    var clamp = function clamp(index, len, defaultValue) {
        if (typeof index !== 'number') return defaultValue;
        index = ~~index; // Coerce to integer.
        if (index >= len) return len;
        if (index >= 0) return index;
        index += len;
        if (index >= 0) return index;
        return 0;
    };
    var toType = function toType(flag) {
        switch(flag){
            case 0:
                return 'file';
            case 1:
                return 'link';
            case 2:
                return 'symlink';
            case 3:
                return 'character-device';
            case 4:
                return 'block-device';
            case 5:
                return 'directory';
            case 6:
                return 'fifo';
            case 7:
                return 'contiguous-file';
            case 72:
                return 'pax-header';
            case 55:
                return 'pax-global-header';
            case 27:
                return 'gnu-long-link-path';
            case 28:
            case 30:
                return 'gnu-long-path';
        }
        return null;
    };
    var toTypeflag = function toTypeflag(flag) {
        switch(flag){
            case 'file':
                return 0;
            case 'link':
                return 1;
            case 'symlink':
                return 2;
            case 'character-device':
                return 3;
            case 'block-device':
                return 4;
            case 'directory':
                return 5;
            case 'fifo':
                return 6;
            case 'contiguous-file':
                return 7;
            case 'pax-header':
                return 72;
        }
        return 0;
    };
    var indexOf = function indexOf(block, num, offset, end) {
        for(; offset < end; offset++){
            if (block[offset] === num) return offset;
        }
        return end;
    };
    var cksum = function cksum(block) {
        var sum = 8 * 32;
        for(var i = 0; i < 148; i++)sum += block[i];
        for(var j = 156; j < 512; j++)sum += block[j];
        return sum;
    };
    var encodeOct = function encodeOct(val, n) {
        val = val.toString(8);
        if (val.length > n) return SEVENS.slice(0, n) + ' ';
        else return ZEROS.slice(0, n - val.length) + val + ' ';
    };
    /* Copied from the node-tar repo and modified to meet
	 * tar-stream coding standard.
	 *
	 * Source: https://github.com/npm/node-tar/blob/51b6627a1f357d2eb433e7378e5f05e83b7aa6cd/lib/header.js#L349
	 */ function parse256(buf) {
        // first byte MUST be either 80 or FF
        // 80 for positive, FF for 2's comp
        var positive;
        if (buf[0] === 0x80) positive = true;
        else if (buf[0] === 0xFF) positive = false;
        else return null;
        // build up a base-256 tuple from the least sig to the highest
        var tuple = [];
        for(var i = buf.length - 1; i > 0; i--){
            var byte = buf[i];
            if (positive) tuple.push(byte);
            else tuple.push(0xFF - byte);
        }
        var sum = 0;
        var l = tuple.length;
        for(i = 0; i < l; i++){
            sum += tuple[i] * Math.pow(256, i);
        }
        return positive ? sum : -1 * sum;
    }
    var decodeOct = function decodeOct(val, offset, length) {
        val = val.slice(offset, offset + length);
        offset = 0;
        // If prefixed with 0x80 then parse as a base-256 integer
        if (val[offset] & 0x80) {
            return parse256(val);
        } else {
            // Older versions of tar can prefix with spaces
            while(offset < val.length && val[offset] === 32)offset++;
            var end = clamp(indexOf(val, 32, offset, val.length), val.length, val.length);
            while(offset < end && val[offset] === 0)offset++;
            if (end === offset) return 0;
            return parseInt(val.slice(offset, end).toString(), 8);
        }
    };
    var decodeStr = function decodeStr(val, offset, length, encoding) {
        return val.slice(offset, indexOf(val, 0, offset, offset + length)).toString(encoding);
    };
    var addLength = function addLength(str) {
        var len = Buffer.byteLength(str);
        var digits = Math.floor(Math.log(len) / Math.log(10)) + 1;
        if (len + digits >= Math.pow(10, digits)) digits++;
        return len + digits + str;
    };
    headers.decodeLongPath = function(buf, encoding) {
        return decodeStr(buf, 0, buf.length, encoding);
    };
    headers.encodePax = function(opts) {
        var result = '';
        if (opts.name) result += addLength(' path=' + opts.name + '\n');
        if (opts.linkname) result += addLength(' linkpath=' + opts.linkname + '\n');
        var pax = opts.pax;
        if (pax) {
            for(var key in pax){
                result += addLength(' ' + key + '=' + pax[key] + '\n');
            }
        }
        return Buffer.from(result);
    };
    headers.decodePax = function(buf) {
        var result = {};
        while(buf.length){
            var i = 0;
            while(i < buf.length && buf[i] !== 32)i++;
            var len = parseInt(buf.slice(0, i).toString(), 10);
            if (!len) return result;
            var b = buf.slice(i + 1, len - 1).toString();
            var keyIndex = b.indexOf('=');
            if (keyIndex === -1) return result;
            result[b.slice(0, keyIndex)] = b.slice(keyIndex + 1);
            buf = buf.slice(len);
        }
        return result;
    };
    headers.encode = function(opts) {
        var buf = alloc(512);
        var name = opts.name;
        var prefix = '';
        if (opts.typeflag === 5 && name[name.length - 1] !== '/') name += '/';
        if (Buffer.byteLength(name) !== name.length) return null // utf-8
        ;
        while(Buffer.byteLength(name) > 100){
            var i = name.indexOf('/');
            if (i === -1) return null;
            prefix += prefix ? '/' + name.slice(0, i) : name.slice(0, i);
            name = name.slice(i + 1);
        }
        if (Buffer.byteLength(name) > 100 || Buffer.byteLength(prefix) > 155) return null;
        if (opts.linkname && Buffer.byteLength(opts.linkname) > 100) return null;
        buf.write(name);
        buf.write(encodeOct(opts.mode & MASK, 6), 100);
        buf.write(encodeOct(opts.uid, 6), 108);
        buf.write(encodeOct(opts.gid, 6), 116);
        buf.write(encodeOct(opts.size, 11), 124);
        buf.write(encodeOct(opts.mtime.getTime() / 1000 | 0, 11), 136);
        buf[156] = ZERO_OFFSET + toTypeflag(opts.type);
        if (opts.linkname) buf.write(opts.linkname, 157);
        USTAR_MAGIC.copy(buf, MAGIC_OFFSET);
        USTAR_VER.copy(buf, VERSION_OFFSET);
        if (opts.uname) buf.write(opts.uname, 265);
        if (opts.gname) buf.write(opts.gname, 297);
        buf.write(encodeOct(opts.devmajor || 0, 6), 329);
        buf.write(encodeOct(opts.devminor || 0, 6), 337);
        if (prefix) buf.write(prefix, 345);
        buf.write(encodeOct(cksum(buf), 6), 148);
        return buf;
    };
    headers.decode = function(buf, filenameEncoding, allowUnknownFormat) {
        var typeflag = buf[156] === 0 ? 0 : buf[156] - ZERO_OFFSET;
        var name = decodeStr(buf, 0, 100, filenameEncoding);
        var mode = decodeOct(buf, 100, 8);
        var uid = decodeOct(buf, 108, 8);
        var gid = decodeOct(buf, 116, 8);
        var size = decodeOct(buf, 124, 12);
        var mtime = decodeOct(buf, 136, 12);
        var type = toType(typeflag);
        var linkname = buf[157] === 0 ? null : decodeStr(buf, 157, 100, filenameEncoding);
        var uname = decodeStr(buf, 265, 32);
        var gname = decodeStr(buf, 297, 32);
        var devmajor = decodeOct(buf, 329, 8);
        var devminor = decodeOct(buf, 337, 8);
        var c = cksum(buf);
        // checksum is still initial value if header was null.
        if (c === 8 * 32) return null;
        // valid checksum
        if (c !== decodeOct(buf, 148, 8)) throw new Error('Invalid tar header. Maybe the tar is corrupted or it needs to be gunzipped?');
        if (BufferCompare(USTAR_MAGIC, buf, MAGIC_OFFSET, MAGIC_OFFSET + 6) === 0) {
            // ustar (posix) format.
            // prepend prefix, if present.
            if (buf[345]) name = decodeStr(buf, 345, 155, filenameEncoding) + '/' + name;
        } else if (BufferCompare(GNU_MAGIC, buf, MAGIC_OFFSET, MAGIC_OFFSET + 6) === 0 && BufferCompare(GNU_VER, buf, VERSION_OFFSET, VERSION_OFFSET + 2) === 0) ; else {
            if (!allowUnknownFormat) {
                throw new Error('Invalid tar header: unknown format.');
            }
        }
        // to support old tar versions that use trailing / to indicate dirs
        if (typeflag === 0 && name && name[name.length - 1] === '/') typeflag = 5;
        return {
            name: name,
            mode: mode,
            uid: uid,
            gid: gid,
            size: size,
            mtime: new Date(1000 * mtime),
            type: type,
            linkname: linkname,
            uname: uname,
            gname: gname,
            devmajor: devmajor,
            devminor: devminor
        };
    };
    return headers;
}

function _instanceof$1(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
var extract;
var hasRequiredExtract;
function requireExtract() {
    if (hasRequiredExtract) return extract;
    hasRequiredExtract = 1;
    var util = require$$1;
    var bl = requireBl();
    var headers = requireHeaders();
    var Writable = requireReadable().Writable;
    var PassThrough = requireReadable().PassThrough;
    var noop = function noop() {};
    var overflow = function overflow(size) {
        size &= 511;
        return size && 512 - size;
    };
    var emptyStream = function emptyStream(self, offset) {
        var s = new Source(self, offset);
        s.end();
        return s;
    };
    var mixinPax = function mixinPax(header, pax) {
        if (pax.path) header.name = pax.path;
        if (pax.linkpath) header.linkname = pax.linkpath;
        if (pax.size) header.size = parseInt(pax.size, 10);
        header.pax = pax;
        return header;
    };
    var Source = function Source(self, offset) {
        this._parent = self;
        this.offset = offset;
        PassThrough.call(this, {
            autoDestroy: false
        });
    };
    util.inherits(Source, PassThrough);
    Source.prototype.destroy = function(err) {
        this._parent.destroy(err);
    };
    var Extract = function Extract1(opts) {
        if (!_instanceof$1(this, Extract)) return new Extract(opts);
        Writable.call(this, opts);
        opts = opts || {};
        this._offset = 0;
        this._buffer = bl();
        this._missing = 0;
        this._partial = false;
        this._onparse = noop;
        this._header = null;
        this._stream = null;
        this._overflow = null;
        this._cb = null;
        this._locked = false;
        this._destroyed = false;
        this._pax = null;
        this._paxGlobal = null;
        this._gnuLongPath = null;
        this._gnuLongLinkPath = null;
        var self = this;
        var b = self._buffer;
        var oncontinue = function oncontinue() {
            self._continue();
        };
        var onunlock = function onunlock(err) {
            self._locked = false;
            if (err) return self.destroy(err);
            if (!self._stream) oncontinue();
        };
        var onstreamend = function onstreamend() {
            self._stream = null;
            var drain = overflow(self._header.size);
            if (drain) self._parse(drain, ondrain);
            else self._parse(512, onheader);
            if (!self._locked) oncontinue();
        };
        var ondrain = function ondrain() {
            self._buffer.consume(overflow(self._header.size));
            self._parse(512, onheader);
            oncontinue();
        };
        var onpaxglobalheader = function onpaxglobalheader() {
            var size = self._header.size;
            self._paxGlobal = headers.decodePax(b.slice(0, size));
            b.consume(size);
            onstreamend();
        };
        var onpaxheader = function onpaxheader() {
            var size = self._header.size;
            self._pax = headers.decodePax(b.slice(0, size));
            if (self._paxGlobal) self._pax = Object.assign({}, self._paxGlobal, self._pax);
            b.consume(size);
            onstreamend();
        };
        var ongnulongpath = function ongnulongpath() {
            var size = self._header.size;
            this._gnuLongPath = headers.decodeLongPath(b.slice(0, size), opts.filenameEncoding);
            b.consume(size);
            onstreamend();
        };
        var ongnulonglinkpath = function ongnulonglinkpath() {
            var size = self._header.size;
            this._gnuLongLinkPath = headers.decodeLongPath(b.slice(0, size), opts.filenameEncoding);
            b.consume(size);
            onstreamend();
        };
        var onheader = function onheader1() {
            var offset = self._offset;
            var header;
            try {
                header = self._header = headers.decode(b.slice(0, 512), opts.filenameEncoding, opts.allowUnknownFormat);
            } catch (err) {
                self.emit('error', err);
            }
            b.consume(512);
            if (!header) {
                self._parse(512, onheader);
                oncontinue();
                return;
            }
            if (header.type === 'gnu-long-path') {
                self._parse(header.size, ongnulongpath);
                oncontinue();
                return;
            }
            if (header.type === 'gnu-long-link-path') {
                self._parse(header.size, ongnulonglinkpath);
                oncontinue();
                return;
            }
            if (header.type === 'pax-global-header') {
                self._parse(header.size, onpaxglobalheader);
                oncontinue();
                return;
            }
            if (header.type === 'pax-header') {
                self._parse(header.size, onpaxheader);
                oncontinue();
                return;
            }
            if (self._gnuLongPath) {
                header.name = self._gnuLongPath;
                self._gnuLongPath = null;
            }
            if (self._gnuLongLinkPath) {
                header.linkname = self._gnuLongLinkPath;
                self._gnuLongLinkPath = null;
            }
            if (self._pax) {
                self._header = header = mixinPax(header, self._pax);
                self._pax = null;
            }
            self._locked = true;
            if (!header.size || header.type === 'directory') {
                self._parse(512, onheader);
                self.emit('entry', header, emptyStream(self, offset), onunlock);
                return;
            }
            self._stream = new Source(self, offset);
            self.emit('entry', header, self._stream, onunlock);
            self._parse(header.size, onstreamend);
            oncontinue();
        };
        this._onheader = onheader;
        this._parse(512, onheader);
    };
    util.inherits(Extract, Writable);
    Extract.prototype.destroy = function(err) {
        if (this._destroyed) return;
        this._destroyed = true;
        if (err) this.emit('error', err);
        this.emit('close');
        if (this._stream) this._stream.emit('close');
    };
    Extract.prototype._parse = function(size, onparse) {
        if (this._destroyed) return;
        this._offset += size;
        this._missing = size;
        if (onparse === this._onheader) this._partial = false;
        this._onparse = onparse;
    };
    Extract.prototype._continue = function() {
        if (this._destroyed) return;
        var cb = this._cb;
        this._cb = noop;
        if (this._overflow) this._write(this._overflow, undefined, cb);
        else cb();
    };
    Extract.prototype._write = function(data, enc, cb) {
        if (this._destroyed) return;
        var s = this._stream;
        var b = this._buffer;
        var missing = this._missing;
        if (data.length) this._partial = true;
        // we do not reach end-of-chunk now. just forward it
        if (data.length < missing) {
            this._missing -= data.length;
            this._overflow = null;
            if (s) return s.write(data, cb);
            b.append(data);
            return cb();
        }
        // end-of-chunk. the parser should call cb.
        this._cb = cb;
        this._missing = 0;
        var overflow = null;
        if (data.length > missing) {
            overflow = data.slice(missing);
            data = data.slice(0, missing);
        }
        if (s) s.end(data);
        else b.append(data);
        this._overflow = overflow;
        this._onparse();
    };
    Extract.prototype._final = function(cb) {
        if (this._partial) return this.destroy(new Error('Unexpected end of data'));
        cb();
    };
    extract = Extract;
    return extract;
}

var fsConstants;
var hasRequiredFsConstants;
function requireFsConstants() {
    if (hasRequiredFsConstants) return fsConstants;
    hasRequiredFsConstants = 1;
    fsConstants = require$$0$2.constants || require$$1$1;
    return fsConstants;
}

var once = {
    exports: {}
};

var wrappy_1;
var hasRequiredWrappy;
function requireWrappy() {
    if (hasRequiredWrappy) return wrappy_1;
    hasRequiredWrappy = 1;
    // Returns a wrapper function that returns a wrapped callback
    // The wrapper function should do some stuff, and return a
    // presumably different callback function.
    // This makes sure that own properties are retained, so that
    // decorations and such are not lost along the way.
    wrappy_1 = wrappy;
    function wrappy(fn, cb) {
        if (fn && cb) return wrappy(fn)(cb);
        if (typeof fn !== 'function') throw new TypeError('need wrapper function');
        Object.keys(fn).forEach(function(k) {
            wrapper[k] = fn[k];
        });
        return wrapper;
        function wrapper() {
            var args = new Array(arguments.length);
            for(var i = 0; i < args.length; i++){
                args[i] = arguments[i];
            }
            var ret = fn.apply(this, args);
            var _$cb = args[args.length - 1];
            if (typeof ret === 'function' && ret !== _$cb) {
                Object.keys(_$cb).forEach(function(k) {
                    ret[k] = _$cb[k];
                });
            }
            return ret;
        }
    }
    return wrappy_1;
}

var hasRequiredOnce;
function requireOnce() {
    if (hasRequiredOnce) return once.exports;
    hasRequiredOnce = 1;
    var wrappy = requireWrappy();
    once.exports = wrappy(once$1);
    once.exports.strict = wrappy(onceStrict);
    once$1.proto = once$1(function() {
        Object.defineProperty(Function.prototype, 'once', {
            value: function value() {
                return once$1(this);
            },
            configurable: true
        });
        Object.defineProperty(Function.prototype, 'onceStrict', {
            value: function value() {
                return onceStrict(this);
            },
            configurable: true
        });
    });
    function once$1(fn) {
        var f = function f1() {
            if (f.called) return f.value;
            f.called = true;
            return f.value = fn.apply(this, arguments);
        };
        f.called = false;
        return f;
    }
    function onceStrict(fn) {
        var f = function f1() {
            if (f.called) throw new Error(f.onceError);
            f.called = true;
            return f.value = fn.apply(this, arguments);
        };
        var name = fn.name || 'Function wrapped with `once`';
        f.onceError = name + " shouldn't be called more than once";
        f.called = false;
        return f;
    }
    return once.exports;
}

var endOfStream;
var hasRequiredEndOfStream;
function requireEndOfStream() {
    if (hasRequiredEndOfStream) return endOfStream;
    hasRequiredEndOfStream = 1;
    var once = requireOnce();
    var noop = function noop() {};
    var qnt = commonjsGlobal.Bare ? queueMicrotask : process.nextTick.bind(process);
    var isRequest = function isRequest(stream) {
        return stream.setHeader && typeof stream.abort === 'function';
    };
    var isChildProcess = function isChildProcess(stream) {
        return stream.stdio && Array.isArray(stream.stdio) && stream.stdio.length === 3;
    };
    var eos = function eos1(stream, opts, callback) {
        if (typeof opts === 'function') return eos(stream, null, opts);
        if (!opts) opts = {};
        callback = once(callback || noop);
        var ws = stream._writableState;
        var rs = stream._readableState;
        var readable = opts.readable || opts.readable !== false && stream.readable;
        var writable = opts.writable || opts.writable !== false && stream.writable;
        var cancelled = false;
        var onlegacyfinish = function onlegacyfinish() {
            if (!stream.writable) onfinish();
        };
        var onfinish = function onfinish() {
            writable = false;
            if (!readable) callback.call(stream);
        };
        var onend = function onend() {
            readable = false;
            if (!writable) callback.call(stream);
        };
        var onexit = function onexit(exitCode) {
            callback.call(stream, exitCode ? new Error('exited with error code: ' + exitCode) : null);
        };
        var onerror = function onerror(err) {
            callback.call(stream, err);
        };
        var onclose = function onclose() {
            qnt(onclosenexttick);
        };
        var onclosenexttick = function onclosenexttick() {
            if (cancelled) return;
            if (readable && !(rs && rs.ended && !rs.destroyed)) return callback.call(stream, new Error('premature close'));
            if (writable && !(ws && ws.ended && !ws.destroyed)) return callback.call(stream, new Error('premature close'));
        };
        var onrequest = function onrequest() {
            stream.req.on('finish', onfinish);
        };
        if (isRequest(stream)) {
            stream.on('complete', onfinish);
            stream.on('abort', onclose);
            if (stream.req) onrequest();
            else stream.on('request', onrequest);
        } else if (writable && !ws) {
            stream.on('end', onlegacyfinish);
            stream.on('close', onlegacyfinish);
        }
        if (isChildProcess(stream)) stream.on('exit', onexit);
        stream.on('end', onend);
        stream.on('finish', onfinish);
        if (opts.error !== false) stream.on('error', onerror);
        stream.on('close', onclose);
        return function() {
            cancelled = true;
            stream.removeListener('complete', onfinish);
            stream.removeListener('abort', onclose);
            stream.removeListener('request', onrequest);
            if (stream.req) stream.req.removeListener('finish', onfinish);
            stream.removeListener('end', onlegacyfinish);
            stream.removeListener('close', onlegacyfinish);
            stream.removeListener('finish', onfinish);
            stream.removeListener('exit', onexit);
            stream.removeListener('end', onend);
            stream.removeListener('error', onerror);
            stream.removeListener('close', onclose);
        };
    };
    endOfStream = eos;
    return endOfStream;
}

function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
var pack;
var hasRequiredPack;
function requirePack() {
    if (hasRequiredPack) return pack;
    hasRequiredPack = 1;
    var constants = requireFsConstants();
    var eos = requireEndOfStream();
    var inherits = requireInherits();
    var alloc = Buffer.alloc;
    var Readable = requireReadable().Readable;
    var Writable = requireReadable().Writable;
    var StringDecoder = require$$11.StringDecoder;
    var headers = requireHeaders();
    var DMODE = parseInt('755', 8);
    var FMODE = parseInt('644', 8);
    var END_OF_TAR = alloc(1024);
    var noop = function noop() {};
    var overflow = function overflow(self, size) {
        size &= 511;
        if (size) self.push(END_OF_TAR.slice(0, 512 - size));
    };
    function modeToType(mode) {
        switch(mode & constants.S_IFMT){
            case constants.S_IFBLK:
                return 'block-device';
            case constants.S_IFCHR:
                return 'character-device';
            case constants.S_IFDIR:
                return 'directory';
            case constants.S_IFIFO:
                return 'fifo';
            case constants.S_IFLNK:
                return 'symlink';
        }
        return 'file';
    }
    var Sink = function Sink(to) {
        Writable.call(this);
        this.written = 0;
        this._to = to;
        this._destroyed = false;
    };
    inherits(Sink, Writable);
    Sink.prototype._write = function(data, enc, cb) {
        this.written += data.length;
        if (this._to.push(data)) return cb();
        this._to._drain = cb;
    };
    Sink.prototype.destroy = function() {
        if (this._destroyed) return;
        this._destroyed = true;
        this.emit('close');
    };
    var LinkSink = function LinkSink() {
        Writable.call(this);
        this.linkname = '';
        this._decoder = new StringDecoder('utf-8');
        this._destroyed = false;
    };
    inherits(LinkSink, Writable);
    LinkSink.prototype._write = function(data, enc, cb) {
        this.linkname += this._decoder.write(data);
        cb();
    };
    LinkSink.prototype.destroy = function() {
        if (this._destroyed) return;
        this._destroyed = true;
        this.emit('close');
    };
    var Void = function Void() {
        Writable.call(this);
        this._destroyed = false;
    };
    inherits(Void, Writable);
    Void.prototype._write = function(data, enc, cb) {
        cb(new Error('No body allowed for this entry'));
    };
    Void.prototype.destroy = function() {
        if (this._destroyed) return;
        this._destroyed = true;
        this.emit('close');
    };
    var Pack = function Pack1(opts) {
        if (!_instanceof(this, Pack)) return new Pack(opts);
        Readable.call(this, opts);
        this._drain = noop;
        this._finalized = false;
        this._finalizing = false;
        this._destroyed = false;
        this._stream = null;
    };
    inherits(Pack, Readable);
    Pack.prototype.entry = function(header, buffer, callback) {
        if (this._stream) throw new Error('already piping an entry');
        if (this._finalized || this._destroyed) return;
        if (typeof buffer === 'function') {
            callback = buffer;
            buffer = null;
        }
        if (!callback) callback = noop;
        var self = this;
        if (!header.size || header.type === 'symlink') header.size = 0;
        if (!header.type) header.type = modeToType(header.mode);
        if (!header.mode) header.mode = header.type === 'directory' ? DMODE : FMODE;
        if (!header.uid) header.uid = 0;
        if (!header.gid) header.gid = 0;
        if (!header.mtime) header.mtime = new Date();
        if (typeof buffer === 'string') buffer = Buffer.from(buffer);
        if (Buffer.isBuffer(buffer)) {
            header.size = buffer.length;
            this._encode(header);
            var ok = this.push(buffer);
            overflow(self, header.size);
            if (ok) process.nextTick(callback);
            else this._drain = callback;
            return new Void();
        }
        if (header.type === 'symlink' && !header.linkname) {
            var linkSink = new LinkSink();
            eos(linkSink, function(err) {
                if (err) {
                    self.destroy();
                    return callback(err);
                }
                header.linkname = linkSink.linkname;
                self._encode(header);
                callback();
            });
            return linkSink;
        }
        this._encode(header);
        if (header.type !== 'file' && header.type !== 'contiguous-file') {
            process.nextTick(callback);
            return new Void();
        }
        var sink = new Sink(this);
        this._stream = sink;
        eos(sink, function(err) {
            self._stream = null;
            if (err) {
                self.destroy();
                return callback(err);
            }
            if (sink.written !== header.size) {
                self.destroy();
                return callback(new Error('size mismatch'));
            }
            overflow(self, header.size);
            if (self._finalizing) self.finalize();
            callback();
        });
        return sink;
    };
    Pack.prototype.finalize = function() {
        if (this._stream) {
            this._finalizing = true;
            return;
        }
        if (this._finalized) return;
        this._finalized = true;
        this.push(END_OF_TAR);
        this.push(null);
    };
    Pack.prototype.destroy = function(err) {
        if (this._destroyed) return;
        this._destroyed = true;
        if (err) this.emit('error', err);
        this.emit('close');
        if (this._stream && this._stream.destroy) this._stream.destroy();
    };
    Pack.prototype._encode = function(header) {
        if (!header.pax) {
            var buf = headers.encode(header);
            if (buf) {
                this.push(buf);
                return;
            }
        }
        this._encodePax(header);
    };
    Pack.prototype._encodePax = function(header) {
        var paxHeader = headers.encodePax({
            name: header.name,
            linkname: header.linkname,
            pax: header.pax
        });
        var newHeader = {
            name: 'PaxHeader',
            mode: header.mode,
            uid: header.uid,
            gid: header.gid,
            size: paxHeader.length,
            mtime: header.mtime,
            type: 'pax-header',
            linkname: header.linkname && 'PaxHeader',
            uname: header.uname,
            gname: header.gname,
            devmajor: header.devmajor,
            devminor: header.devminor
        };
        this.push(headers.encode(newHeader));
        this.push(paxHeader);
        overflow(this, paxHeader.length);
        newHeader.size = header.size;
        newHeader.type = header.type;
        this.push(headers.encode(newHeader));
    };
    Pack.prototype._read = function(n) {
        var drain = this._drain;
        this._drain = noop;
        drain();
    };
    pack = Pack;
    return pack;
}

var hasRequiredTarStream;
function requireTarStream() {
    if (hasRequiredTarStream) return tarStream;
    hasRequiredTarStream = 1;
    tarStream.extract = requireExtract();
    tarStream.pack = requirePack();
    return tarStream;
}

var tarStreamExports = requireTarStream();
var index = /*@__PURE__*/ getDefaultExportFromCjs(tarStreamExports);

module.exports = index;
