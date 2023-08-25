import { describe, expect, it } from '@jest/globals';
import { sanitizeFilename } from '../lib';

describe('sanitizeFilename', () => {
  it('should sanitize the string', () => {
    expect(sanitizeFilename('a/b\\c?d*e:f|g<h>i%jk', ' ')).toEqual(
      'a b c d e f g h i jk'
    );
  });
});
