import assert from 'assert';
import fs from 'fs';
import { Writable } from 'readable-stream';
import * as tar from 'tar-stream-compat';
import BufferAlloc from '../../assets/buffer-alloc.cjs';
import * as fixtures from '../fixtures/index.ts';
import concat from '../lib/concat-writeable.ts';

const major = +process.versions.node.split('.')[0];

describe('pack', () => {
  if (major <= 10) return;

  it('one-file', (done) => {
    const pack = tar.pack();

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

    pack.pipe(
      concat((data) => {
        assert.equal(data.length & 511, 0);
        assert.deepEqual(data, fs.readFileSync(fixtures.ONE_FILE_TAR));
      })
    );
    pack.on('close', () => {
      done();
    });
  });

  it('multi-file', (done) => {
    const pack = tar.pack();

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

    pack.pipe(
      concat((data) => {
        assert.equal(data.length & 511, 0);
        assert.deepEqual(data, fs.readFileSync(fixtures.MULTI_FILE_TAR));
      })
    );
    pack.on('close', () => done());
  });

  it('pax', (done) => {
    const pack = tar.pack();

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

    pack.pipe(
      concat((data) => {
        assert.equal(data.length & 511, 0);
        assert.deepEqual(data, fs.readFileSync(fixtures.PAX_TAR));
      })
    );
    pack.on('close', () => done());
  });

  it('types', (done) => {
    const pack = tar.pack();

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

    pack.pipe(
      concat((data) => {
        assert.equal(data.length & 511, 0);
        assert.deepEqual(data, fs.readFileSync(fixtures.TYPES_TAR));
      })
    );
    pack.on('close', () => done());
  });

  it('empty directory body is valid', (done) => {
    const pack = tar.pack();

    pack.entry(
      {
        name: 'directory',
        mtime: new Date(1387580181000),
        type: 'directory',
        mode: 0o755,
        uname: 'maf',
        gname: 'staff',
        uid: 501,
        gid: 20,
      },
      ''
    );

    pack.finalize();

    pack.resume();

    pack.on('error', () => assert.ok(false, 'should not throw'));
    pack.on('close', () => done());
  });

  it('long-name', (done) => {
    const pack = tar.pack();

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

    pack.pipe(
      concat((data) => {
        assert.equal(data.length & 511, 0);
        assert.deepEqual(data, fs.readFileSync(fixtures.LONG_NAME_TAR));
      })
    );
    pack.on('close', () => done());
  });

  it('large-uid-gid', (done) => {
    const pack = tar.pack();

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

    pack.pipe(
      concat((data) => {
        assert.equal(data.length & 511, 0);
        assert.deepEqual(data, fs.readFileSync(fixtures.LARGE_UID_GID));
      })
    );
    pack.on('close', () => done());
  });

  it('unicode', (done) => {
    const pack = tar.pack();

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

    pack.pipe(
      concat((data) => {
        assert.equal(data.length & 511, 0);
        assert.deepEqual(data, fs.readFileSync(fixtures.UNICODE_TAR));
      })
    );
    pack.on('close', () => done());
  });

  it('backpressure', async () => {
    const slowStream = new Writable({
      highWaterMark: 1,

      write(_data, _encoding, cb) {
        setImmediate(cb);
      },
    });

    slowStream.on('finish', () => {});

    const pack = tar.pack();

    let later = false;

    setImmediate(() => {
      later = true;
    });

    pack.on('end', () => assert.ok(later)).pipe(slowStream);

    let i = 0;
    const next = () => {
      if (++i < 25) {
        const header = {
          name: `file${i}.txt`,
          mtime: new Date(1387580181000),
          mode: 0o644,
          uname: 'maf',
          gname: 'staff',
          uid: 501,
          gid: 20,
        };

        const buffer = BufferAlloc(1024);

        pack.entry(header, buffer, next);
      } else {
        pack.finalize();
      }
    };

    next();
  });
});
