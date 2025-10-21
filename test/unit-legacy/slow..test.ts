import assert from 'assert';
import fs from 'fs';
import { Writable } from 'readable-stream';
import { stdout as log } from 'single-line-log2';
import * as tar from 'tar-stream-compat';
import zlib from 'zlib';
import * as fixtures from '../fixtures/index.ts';

describe.skip('slow', () => {
  it('slow', (done) => {
    var extract = tar.extract();
    var noEntries = false;
    var hugeFileSize = 8804630528; // ~8.2GB
    var dataLength = 0;

    var countStream = new Writable();
    countStream._write = (chunk, _encoding, cb) => {
      dataLength += chunk.length;
      log(dataLength);
      cb();
    };
    countStream._flush = (cb) => {
      console.log('');
      cb();
    };

    // Make sure we read the correct pax size entry for a file larger than 8GB.
    extract.on('entry', (header, stream, callback) => {
      assert.deepEqual(header, {
        devmajor: 0,
        devminor: 0,
        gid: 20,
        gname: 'staff',
        linkname: null,
        mode: 420,
        mtime: new Date(1521214967000),
        name: 'huge.txt',
        pax: {
          'LIBARCHIVE.creationtime': '1521214954',
          'SCHILY.dev': '16777218',
          'SCHILY.ino': '91584182',
          'SCHILY.nlink': '1',
          atime: '1521214969',
          ctime: '1521214967',
          size: hugeFileSize.toString(),
        },
        size: hugeFileSize,
        type: 'file',
        uid: 502,
        uname: 'apd4n',
      });

      noEntries = true;
      stream.pipe(countStream).on('error', callback).on('finish', callback);
    });

    extract.on('finish', () => {
      assert.ok(noEntries);
      assert.equal(dataLength, hugeFileSize);
      done();
    });

    var gunzip = zlib.createGunzip();
    var reader = fs.createReadStream(fixtures.HUGE);
    reader.pipe(gunzip).pipe(extract);
  });
});
