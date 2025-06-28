import assert from 'assert';
import fs from 'fs';
import nextTick from 'next-tick';
import { Writable } from 'readable-stream';
// @ts-ignore
import * as tar from 'tar-stream-compat';
import BufferAlloc from '../../assets/buffer-alloc.cjs';
import * as fixtures from '../fixtures/index.ts';
import concat from '../lib/concat-writeable.ts';

const major = +process.versions.node.split('.')[0];

describe('pack', () => {
  if (major <= 10) return;

  it('one-file', (done) => {
    var pack = tar.pack();

    pack.entry(
      {
        name: 'test.txt',
        mtime: new Date(1387580181000),
        mode: 0o644,
        uname: 'maf',
        gname: 'staff',
        uid: 501,
        gid: 20,
      },
      'hello world\n'
    );

    pack.finalize();

    pack.on('close', () => done());
    pack.pipe(
      concat((data) => {
        assert.equal(data.length & 511, 0);
        assert.deepEqual(data, fs.readFileSync(fixtures.ONE_FILE_TAR));
      })
    );
  });

  it('multi-file', (done) => {
    var pack = tar.pack();

    pack.entry(
      {
        name: 'file-1.txt',
        mtime: new Date(1387580181000),
        mode: 0o644,
        uname: 'maf',
        gname: 'staff',
        uid: 501,
        gid: 20,
      },
      'i am file-1\n'
    );

    pack
      .entry({
        name: 'file-2.txt',
        mtime: new Date(1387580181000),
        mode: 0o644,
        size: 12,
        uname: 'maf',
        gname: 'staff',
        uid: 501,
        gid: 20,
      })
      .end('i am file-2\n');

    pack.finalize();

    pack.on('close', () => done());
    pack.pipe(
      concat((data) => {
        assert.equal(data.length & 511, 0);
        assert.deepEqual(data, fs.readFileSync(fixtures.MULTI_FILE_TAR));
      })
    );
  });

  it('pax', (done) => {
    var pack = tar.pack();

    pack.entry(
      {
        name: 'pax.txt',
        mtime: new Date(1387580181000),
        mode: 0o644,
        uname: 'maf',
        gname: 'staff',
        uid: 501,
        gid: 20,
        pax: { special: 'sauce' },
      },
      'hello world\n'
    );

    pack.finalize();

    pack.on('close', () => done());
    pack.pipe(
      concat((data) => {
        // fs.writeFileSync('tmp.tar', data)
        assert.equal(data.length & 511, 0);
        assert.deepEqual(data, fs.readFileSync(fixtures.PAX_TAR));
      })
    );
  });

  it('types', (done) => {
    var pack = tar.pack();

    pack.entry({
      name: 'directory',
      mtime: new Date(1387580181000),
      type: 'directory',
      mode: 0o755,
      uname: 'maf',
      gname: 'staff',
      uid: 501,
      gid: 20,
    });

    pack.entry({
      name: 'directory-link',
      mtime: new Date(1387580181000),
      type: 'symlink',
      linkname: 'directory',
      mode: 0o755,
      uname: 'maf',
      gname: 'staff',
      uid: 501,
      gid: 20,
      size: 9, // Should convert to zero
    });

    pack.finalize();

    pack.on('close', () => done());
    pack.pipe(
      concat((data) => {
        assert.equal(data.length & 511, 0);
        assert.deepEqual(data, fs.readFileSync(fixtures.TYPES_TAR));
      })
    );
  });

  it('long-name', (done) => {
    var pack = tar.pack();

    pack.entry(
      {
        name: 'my/file/is/longer/than/100/characters/and/should/use/the/prefix/header/foobarbaz/foobarbaz/foobarbaz/foobarbaz/foobarbaz/foobarbaz/filename.txt',
        mtime: new Date(1387580181000),
        type: 'file',
        mode: 0o644,
        uname: 'maf',
        gname: 'staff',
        uid: 501,
        gid: 20,
      },
      'hello long name\n'
    );

    pack.finalize();

    pack.on('close', () => done());
    pack.pipe(
      concat((data) => {
        assert.equal(data.length & 511, 0);
        assert.deepEqual(data, fs.readFileSync(fixtures.LONG_NAME_TAR));
      })
    );
  });

  it('large-uid-gid', (done) => {
    var pack = tar.pack();

    pack.entry(
      {
        name: 'test.txt',
        mtime: new Date(1387580181000),
        mode: 0o644,
        uname: 'maf',
        gname: 'staff',
        uid: 1000000001,
        gid: 1000000002,
      },
      'hello world\n'
    );

    pack.finalize();

    pack.on('close', () => done());
    pack.pipe(
      concat((data) => {
        assert.equal(data.length & 511, 0);
        assert.deepEqual(data, fs.readFileSync(fixtures.LARGE_UID_GID));
        // fs.writeFileSync('/tmp/foo', data)
      })
    );
  });

  it('unicode', (done) => {
    var pack = tar.pack();

    pack.entry(
      {
        name: 'høstål.txt',
        mtime: new Date(1387580181000),
        type: 'file',
        mode: 0o644,
        uname: 'maf',
        gname: 'staff',
        uid: 501,
        gid: 20,
      },
      'høllø\n'
    );

    pack.finalize();

    pack.on('close', () => done());
    pack.pipe(
      concat((data) => {
        assert.equal(data.length & 511, 0);
        assert.deepEqual(data, fs.readFileSync(fixtures.UNICODE_TAR));
      })
    );
  });

  it('backpressure', (done) => {
    var slowWritable = new Writable({ highWaterMark: 1 });
    slowWritable._write = (_chunk, _enc, next) => {
      nextTick(next);
    };

    var pack = tar.pack();
    var later = false;

    nextTick(() => {
      later = true;
    });

    pack.pipe(slowWritable);

    slowWritable.on('finish', () => {
      done();
    });
    pack.on('end', () => {
      assert.ok(later);
    });

    var i = 0;
    var next = () => {
      if (++i < 25) {
        var header = {
          name: `file${i}.txt`,
          mtime: new Date(1387580181000),
          mode: 0o644,
          uname: 'maf',
          gname: 'staff',
          uid: 501,
          gid: 20,
        };

        var buffer = BufferAlloc(1024);

        pack.entry(header, buffer, next);
      } else {
        pack.finalize();
      }
    };

    next();
  });
});
