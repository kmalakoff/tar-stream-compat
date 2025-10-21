import assert from 'assert';
import { Readable } from 'stream';
import * as tar from 'tar-stream-compat';
import BufferAlloc from '../../assets/buffer-alloc.cjs';

const major = +process.versions.node.split('.')[0];

describe('dual', () => {
  if (major <= 10) return;

  it('write and read huge archive', (done) => {
    const pack = tar.pack();
    const extract = tar.extract();

    extract.on('entry', (header, stream, next) => {
      let size = 0;

      stream.on('data', (data) => {
        size += data.byteLength;
      });

      stream.on('end', () => {
        assert.equal(size, header.size);
        next();
      });
    });

    pack.pipe(extract, (err) => {
      assert.ok(!err, 'pipeline finished');
    });

    const entry = pack.entry({
      name: 'huge.txt',
      size: 10 * 1024 * 1024 * 1024,
    });

    const buf = BufferAlloc(1024 * 1024);

    let pushed = 0;

    const rs = new Readable({
      read() {
        this.push(buf);
        pushed += buf.byteLength;
        if (pushed === entry.header.size) this.push(null);
      },
    });

    rs.pipe(entry);

    extract.on('finish', done);
    pack.finalize();
  });
});
