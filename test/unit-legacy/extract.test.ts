import assert from 'assert';
import fs from 'fs';
// @ts-ignore
import * as tar from 'tar-stream-compat';
import * as fixtures from '../fixtures/index.ts';
import concat from '../lib/concat-writeable.ts';

var clamp = (index, len, defaultValue) => {
  if (typeof index !== 'number') return defaultValue;
  index = ~~index; // Coerce to integer.
  if (index >= len) return len;
  if (index >= 0) return index;
  index += len;
  if (index >= 0) return index;
  return 0;
};

describe('extract', () => {
  it('one-file', (done) => {
    var extract = tar.extract();
    var noEntries = false;

    extract.on('entry', (header, stream, callback) => {
      delete header.pax; // different across implementations
      assert.deepEqual(header, {
        name: 'test.txt',
        mode: 0o644,
        uid: 501,
        gid: 20,
        size: 12,
        mtime: new Date(1387580181000),
        type: 'file',
        linkname: null,
        uname: 'maf',
        gname: 'staff',
        devmajor: 0,
        devminor: 0,
      });

      stream.pipe(
        concat((data) => {
          noEntries = true;
          assert.equal(data.toString(), 'hello world\n');
          callback();
        })
      );
    });

    extract.on('finish', () => {
      assert.ok(noEntries);
      done();
    });

    extract.end(fs.readFileSync(fixtures.ONE_FILE_TAR));
  });

  it('chunked-one-file', (done) => {
    var extract = tar.extract();
    var noEntries = false;

    extract.on('entry', (header, stream, callback) => {
      delete header.pax; // different across implementations

      assert.deepEqual(header, {
        name: 'test.txt',
        mode: 0o644,
        uid: 501,
        gid: 20,
        size: 12,
        mtime: new Date(1387580181000),
        type: 'file',
        linkname: null,
        uname: 'maf',
        gname: 'staff',
        devmajor: 0,
        devminor: 0,
      });

      stream.pipe(
        concat((data) => {
          noEntries = true;
          assert.equal(data.toString(), 'hello world\n');
          callback();
        })
      );
    });

    extract.on('finish', () => {
      assert.ok(noEntries);
      done();
    });

    var b = fs.readFileSync(fixtures.ONE_FILE_TAR);

    for (var i = 0; i < b.length; i += 321) {
      extract.write(b.slice(i, clamp(i + 321, b.length, b.length)));
    }
    extract.end();
  });

  it('multi-file', (done) => {
    var extract = tar.extract();
    var noEntries = false;

    var onfile1 = (header, stream, callback) => {
      delete header.pax; // different across implementations

      assert.deepEqual(header, {
        name: 'file-1.txt',
        mode: 0o644,
        uid: 501,
        gid: 20,
        size: 12,
        mtime: new Date(1387580181000),
        type: 'file',
        linkname: null,
        uname: 'maf',
        gname: 'staff',
        devmajor: 0,
        devminor: 0,
      });

      extract.on('entry', onfile2);
      stream.pipe(
        concat((data) => {
          assert.equal(data.toString(), 'i am file-1\n');
          callback();
        })
      );
    };

    var onfile2 = (header, stream, callback) => {
      delete header.pax; // different across implementations

      assert.deepEqual(header, {
        name: 'file-2.txt',
        mode: 0o644,
        uid: 501,
        gid: 20,
        size: 12,
        mtime: new Date(1387580181000),
        type: 'file',
        linkname: null,
        uname: 'maf',
        gname: 'staff',
        devmajor: 0,
        devminor: 0,
      });

      stream.pipe(
        concat((data) => {
          noEntries = true;
          assert.equal(data.toString(), 'i am file-2\n');
          callback();
        })
      );
    };

    extract.once('entry', onfile1);

    extract.on('finish', () => {
      assert.ok(noEntries);
      done();
    });

    extract.end(fs.readFileSync(fixtures.MULTI_FILE_TAR));
  });

  it('chunked-multi-file', (done) => {
    var extract = tar.extract();
    var noEntries = false;

    var onfile1 = (header, stream, callback) => {
      delete header.pax; // different across implementations

      assert.deepEqual(header, {
        name: 'file-1.txt',
        mode: 0o644,
        uid: 501,
        gid: 20,
        size: 12,
        mtime: new Date(1387580181000),
        type: 'file',
        linkname: null,
        uname: 'maf',
        gname: 'staff',
        devmajor: 0,
        devminor: 0,
      });

      extract.on('entry', onfile2);
      stream.pipe(
        concat((data) => {
          assert.equal(data.toString(), 'i am file-1\n');
          callback();
        })
      );
    };

    var onfile2 = (header, stream, callback) => {
      delete header.pax; // different across implementations

      assert.deepEqual(header, {
        name: 'file-2.txt',
        mode: 0o644,
        uid: 501,
        gid: 20,
        size: 12,
        mtime: new Date(1387580181000),
        type: 'file',
        linkname: null,
        uname: 'maf',
        gname: 'staff',
        devmajor: 0,
        devminor: 0,
      });

      stream.pipe(
        concat((data) => {
          noEntries = true;
          assert.equal(data.toString(), 'i am file-2\n');
          callback();
        })
      );
    };

    extract.once('entry', onfile1);

    extract.on('finish', () => {
      assert.ok(noEntries);
      done();
    });

    var b = fs.readFileSync(fixtures.MULTI_FILE_TAR);
    for (var i = 0; i < b.length; i += 321) {
      extract.write(b.slice(i, clamp(i + 321, b.length, b.length)));
    }
    extract.end();
  });

  it('pax', (done) => {
    var extract = tar.extract();
    var noEntries = false;

    extract.on('entry', (header, stream, callback) => {
      assert.deepEqual(header, {
        name: 'pax.txt',
        mode: 0o644,
        uid: 501,
        gid: 20,
        size: 12,
        mtime: new Date(1387580181000),
        type: 'file',
        linkname: null,
        uname: 'maf',
        gname: 'staff',
        devmajor: 0,
        devminor: 0,
        pax: { path: 'pax.txt', special: 'sauce' },
      });

      stream.pipe(
        concat((data) => {
          noEntries = true;
          assert.equal(data.toString(), 'hello world\n');
          callback();
        })
      );
    });

    extract.on('finish', () => {
      assert.ok(noEntries);
      done();
    });

    extract.end(fs.readFileSync(fixtures.PAX_TAR));
  });

  it('types', (done) => {
    var extract = tar.extract();
    var noEntries = false;

    var ondir = (header, stream, callback) => {
      delete header.pax; // different across implementations

      assert.deepEqual(header, {
        name: 'directory',
        mode: 0o755,
        uid: 501,
        gid: 20,
        size: 0,
        mtime: new Date(1387580181000),
        type: 'directory',
        linkname: null,
        uname: 'maf',
        gname: 'staff',
        devmajor: 0,
        devminor: 0,
      });
      stream.on('data', () => {
        assert.ok(false);
      });
      extract.once('entry', onlink);
      callback();
    };

    var onlink = (header, stream, callback) => {
      delete header.pax; // different across implementations

      assert.deepEqual(header, {
        name: 'directory-link',
        mode: 0o755,
        uid: 501,
        gid: 20,
        size: 0,
        mtime: new Date(1387580181000),
        type: 'symlink',
        linkname: 'directory',
        uname: 'maf',
        gname: 'staff',
        devmajor: 0,
        devminor: 0,
      });
      stream.on('data', () => {
        assert.ok(false);
      });
      noEntries = true;
      callback();
    };

    extract.once('entry', ondir);

    extract.on('finish', () => {
      assert.ok(noEntries);
      done();
    });

    extract.end(fs.readFileSync(fixtures.TYPES_TAR));
  });

  it('long-name', (done) => {
    var extract = tar.extract();
    var noEntries = false;

    extract.on('entry', (header, stream, callback) => {
      delete header.pax; // different across implementations

      assert.deepEqual(header, {
        name: 'my/file/is/longer/than/100/characters/and/should/use/the/prefix/header/foobarbaz/foobarbaz/foobarbaz/foobarbaz/foobarbaz/foobarbaz/filename.txt',
        mode: 0o644,
        uid: 501,
        gid: 20,
        size: 16,
        mtime: new Date(1387580181000),
        type: 'file',
        linkname: null,
        uname: 'maf',
        gname: 'staff',
        devmajor: 0,
        devminor: 0,
      });

      stream.pipe(
        concat((data) => {
          noEntries = true;
          assert.equal(data.toString(), 'hello long name\n');
          callback();
        })
      );
    });

    extract.on('finish', () => {
      assert.ok(noEntries);
      done();
    });

    extract.end(fs.readFileSync(fixtures.LONG_NAME_TAR));
  });

  it('unicode-bsd', (done) => {
    // can unpack a bsdtar unicoded tarball

    var extract = tar.extract();
    var noEntries = false;

    extract.on('entry', (header, stream, callback) => {
      assert.deepEqual(header, {
        name: 'høllø.txt',
        mode: 0o644,
        uid: 501,
        gid: 20,
        size: 4,
        mtime: new Date(1387588646000),
        pax: {
          'SCHILY.dev': '16777217',
          'SCHILY.ino': '3599143',
          'SCHILY.nlink': '1',
          atime: '1387589077',
          ctime: '1387588646',
          path: 'høllø.txt',
        },
        type: 'file',
        linkname: null,
        uname: 'maf',
        gname: 'staff',
        devmajor: 0,
        devminor: 0,
      });

      stream.pipe(
        concat((data) => {
          noEntries = true;
          assert.equal(data.toString(), 'hej\n');
          callback();
        })
      );
    });

    extract.on('finish', () => {
      assert.ok(noEntries);
      done();
    });

    extract.end(fs.readFileSync(fixtures.UNICODE_BSD_TAR));
  });

  it('unicode', (done) => {
    // can unpack a bsdtar unicoded tarball

    var extract = tar.extract();
    var noEntries = false;

    extract.on('entry', (header, stream, callback) => {
      assert.deepEqual(header, {
        name: 'høstål.txt',
        mode: 0o644,
        uid: 501,
        gid: 20,
        size: 8,
        mtime: new Date(1387580181000),
        pax: { path: 'høstål.txt' },
        type: 'file',
        linkname: null,
        uname: 'maf',
        gname: 'staff',
        devmajor: 0,
        devminor: 0,
      });

      stream.pipe(
        concat((data) => {
          noEntries = true;
          assert.equal(data.toString(), 'høllø\n');
          callback();
        })
      );
    });

    extract.on('finish', () => {
      assert.ok(noEntries);
      done();
    });

    extract.end(fs.readFileSync(fixtures.UNICODE_TAR));
  });

  it('name-is-100', (done) => {
    var extract = tar.extract();

    extract.on('entry', (header, stream, callback) => {
      assert.equal(header.name.length, 100);

      stream.pipe(
        concat((data) => {
          assert.equal(data.toString(), 'hello\n');
          callback();
        })
      );
    });

    extract.on('finish', () => {
      assert.ok(true);
      done();
    });

    extract.end(fs.readFileSync(fixtures.NAME_IS_100_TAR));
  });

  it('invalid-file', (done) => {
    var extract = tar.extract();

    extract.on('error', (err) => {
      assert.ok(!!err);
      extract.destroy();
      done();
    });

    extract.end(fs.readFileSync(fixtures.INVALID_TGZ));
  });

  it('space prefixed', (done) => {
    var extract = tar.extract();

    extract.on('entry', (_header, _stream, callback) => {
      assert.ok(true);
      callback();
    });

    extract.on('finish', () => {
      assert.ok(true);
      done();
    });

    extract.end(fs.readFileSync(fixtures.SPACE_TAR_GZ));
  });

  it('gnu long path', (done) => {
    var extract = tar.extract();

    extract.on('entry', (header, _stream, callback) => {
      assert.ok(header.name.length > 100);
      callback();
    });

    extract.on('finish', () => {
      assert.ok(true);
      done();
    });

    extract.end(fs.readFileSync(fixtures.GNU_LONG_PATH));
  });

  it('base 256 uid and gid', (done) => {
    var extract = tar.extract();

    extract.on('entry', (header, _stream, callback) => {
      assert.ok(header.uid === 116435139);
      assert.ok(header.gid === 1876110778);
      callback();
    });

    extract.on('finish', () => {
      done();
    });
    extract.end(fs.readFileSync(fixtures.BASE_256_UID_GID));
  });

  it('base 256 size', (done) => {
    var extract = tar.extract();

    extract.on('entry', (header, _stream, callback) => {
      delete header.pax; // different across implementations

      assert.deepEqual(header, {
        name: 'test.txt',
        mode: 0o644,
        uid: 501,
        gid: 20,
        size: 12,
        mtime: new Date(1387580181000),
        type: 'file',
        linkname: null,
        uname: 'maf',
        gname: 'staff',
        devmajor: 0,
        devminor: 0,
      });
      callback();
    });

    extract.on('finish', () => {
      assert.ok(true);
      done();
    });

    extract.end(fs.readFileSync(fixtures.BASE_256_SIZE));
  });

  it('latin-1', (done) => {
    // can unpack filenames encoded in latin-1

    // This is the older name for the "latin1" encoding in Node
    var extract = tar.extract({ filenameEncoding: 'binary' });
    var noEntries = false;

    extract.on('entry', (header, stream, callback) => {
      delete header.pax; // different across implementations

      assert.deepEqual(header, {
        name: "En français, s'il vous plaît?.txt",
        mode: 0o644,
        uid: 0,
        gid: 0,
        size: 14,
        mtime: new Date(1495941034000),
        type: 'file',
        linkname: null,
        uname: 'root',
        gname: 'root',
        devmajor: 0,
        devminor: 0,
      });

      stream.pipe(
        concat((data) => {
          noEntries = true;
          assert.equal(data.toString(), 'Hello, world!\n');
          callback();
        })
      );
    });

    extract.on('finish', () => {
      assert.ok(noEntries);
      done();
    });

    extract.end(fs.readFileSync(fixtures.LATIN1_TAR));
  });

  it('incomplete', (done) => {
    var extract = tar.extract();

    extract.on('entry', (_header, _stream, callback) => {
      callback();
    });

    extract.on('error', (err) => {
      assert.equal(err.message, 'Unexpected end of data');
      done();
    });

    extract.on('finish', () => {
      assert.ok(false, 'should not finish');
    });

    extract.end(fs.readFileSync(fixtures.INCOMPLETE_TAR));
  });

  it('gnu', (done) => {
    // can correctly unpack gnu-tar format

    var extract = tar.extract();
    var noEntries = false;

    extract.on('entry', (header, stream, callback) => {
      delete header.pax; // different across implementations

      assert.deepEqual(header, {
        name: 'test.txt',
        mode: 0o644,
        uid: 12345,
        gid: 67890,
        size: 14,
        mtime: new Date(1559239869000),
        type: 'file',
        linkname: null,
        uname: 'myuser',
        gname: 'mygroup',
        devmajor: 0,
        devminor: 0,
      });

      stream.pipe(
        concat((data) => {
          noEntries = true;
          assert.equal(data.toString(), 'Hello, world!\n');
          callback();
        })
      );
    });

    extract.on('finish', () => {
      assert.ok(noEntries);
      done();
    });

    extract.end(fs.readFileSync(fixtures.GNU_TAR));
  });

  it('gnu-incremental', (done) => {
    // can correctly unpack gnu-tar incremental format. In this situation,
    // the tarball will have additional ctime and atime values in the header,
    // and without awareness of the 'gnu' tar format, the atime (offset 345) is mistaken
    // for a directory prefix (also offset 345).

    var extract = tar.extract();
    var noEntries = false;

    extract.on('entry', (header, stream, callback) => {
      delete header.pax; // different across implementations

      assert.deepEqual(header, {
        name: 'test.txt',
        mode: 0o644,
        uid: 12345,
        gid: 67890,
        size: 14,
        mtime: new Date(1559239869000),
        type: 'file',
        linkname: null,
        uname: 'myuser',
        gname: 'mygroup',
        devmajor: 0,
        devminor: 0,
      });

      stream.pipe(
        concat((data) => {
          noEntries = true;
          assert.equal(data.toString(), 'Hello, world!\n');
          callback();
        })
      );
    });

    extract.on('finish', () => {
      assert.ok(noEntries);
      done();
    });

    extract.end(fs.readFileSync(fixtures.GNU_INCREMENTAL_TAR));
  });

  it('v7 unsupported', (done) => {
    // correctly fails to parse v7 tarballs

    var extract = tar.extract();

    extract.on('error', (err) => {
      assert.ok(!!err);
      extract.destroy();
      done();
    });

    extract.end(fs.readFileSync(fixtures.V7_TAR));
  });

  it("unknown format doesn't extract by default", (done) => {
    var extract = tar.extract();

    extract.on('error', (err) => {
      assert.ok(!!err);
      extract.destroy();
      done();
    });

    extract.end(fs.readFileSync(fixtures.UNKNOWN_FORMAT));
  });

  it('unknown format attempts to extract if allowed', (done) => {
    var extract = tar.extract({ allowUnknownFormat: true });
    var noEntries = false;

    var onfile1 = (header, stream, callback) => {
      delete header.pax; // different across implementations

      assert.deepEqual(header, {
        name: 'file-1.txt',
        mode: 0o644,
        uid: 501,
        gid: 20,
        size: 12,
        mtime: new Date(1387580181000),
        type: 'file',
        linkname: null,
        uname: 'maf',
        gname: 'staff',
        devmajor: 0,
        devminor: 0,
      });

      extract.on('entry', onfile2);
      stream.pipe(
        concat((data) => {
          assert.equal(data.toString(), 'i am file-1\n');
          callback();
        })
      );
    };

    var onfile2 = (header, stream, callback) => {
      delete header.pax; // different across implementations

      assert.deepEqual(header, {
        name: 'file-2.txt',
        mode: 0o644,
        uid: 501,
        gid: 20,
        size: 12,
        mtime: new Date(1387580181000),
        type: 'file',
        linkname: null,
        uname: 'maf',
        gname: 'staff',
        devmajor: 0,
        devminor: 0,
      });

      stream.pipe(
        concat((data) => {
          noEntries = true;
          assert.equal(data.toString(), 'i am file-2\n');
          callback();
        })
      );
    };

    extract.once('entry', onfile1);

    extract.on('finish', () => {
      assert.ok(noEntries);
      done();
    });

    extract.end(fs.readFileSync(fixtures.UNKNOWN_FORMAT));
  });
});
