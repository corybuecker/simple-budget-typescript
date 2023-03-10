import * as fs from 'fs';
import { createHash } from 'node:crypto';
import * as path from 'path';

export const hbsHelpers = {
  fingerprint: (fileName: string): string => {
    const asset: string = path.join('./public', fileName);
    const contents: string = fs.readFileSync(asset.toString(), {
      encoding: 'utf8',
      flag: 'r',
    });
    const hash = createHash('sha256');
    hash.update(contents);
    return hash.digest('hex');
  },
};
