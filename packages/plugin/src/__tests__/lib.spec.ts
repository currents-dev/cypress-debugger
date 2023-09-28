import { describe, expect, it } from '@jest/globals';
import {
  MAX_FILE_PATH_LENGTH,
  isValidLength,
  sanitizeFilename,
  truncateMiddle,
  truncatePathParts,
} from '../lib';

describe('isValidLength', () => {
  const testCases: [string, number | undefined, boolean][] = [
    ['short.txt', undefined, true], // Valid filename with default maxLength
    ['a'.repeat(MAX_FILE_PATH_LENGTH), undefined, true], // Valid filename with maximum maxLength
    ['a'.repeat(MAX_FILE_PATH_LENGTH + 1), undefined, false], // Invalid filename exceeding maxLength
    ['abcdefghij', 10, true], // Valid filename with specified maxLength
    ['abcdefghijk', 10, false], // Invalid filename exceeding specified maxLength
    ['anystring.txt', 0, false], // Invalid filename with maxLength of 0
  ];

  it.each(testCases)(
    'should return the exepcted result for the provided string and max length',
    (str: string, maxLength: number | undefined, expectedResult: boolean) => {
      expect(isValidLength(str, maxLength)).toBe(expectedResult);
    }
  );
});

describe('truncateMiddle', () => {
  const longString =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac odio ac quam auctor faucibus ut id dolor. Vivamus vel odio eu ligula tempus viverra. Aenean vehicula, ex non varius euismod, elit ex cursus ex, in bibendum quam elit quis tortor. Sed volutpat scelerisque tortor quis blandit. A';
  const truncatedString =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac odio ac quam auctor faucibus ut id dolor. Vivamus vel o..., ex non varius euismod, elit ex cursus ex, in bibendum quam elit quis tortor. Sed volutpat scelerisque tortor quis blandit. A';
  const testCases = [
    ['short.txt', MAX_FILE_PATH_LENGTH, 'short.txt'], // Short filename within maximum length
    [longString, MAX_FILE_PATH_LENGTH, truncatedString], // Long filename, truncated with default separator
    ['short.txt', 5, 's...t'], // Short filename within a custom maximum length
    ['longname.txt', 8, 'lon...xt'], // Long filename truncated with custom maximum length and default separator
    ['filename.txt', 10, 'file...txt'], // Medium-length filename truncated with default separator
    ['middleseparator.txt', 15, 'middle...or.txt'], // Medium-length filename truncated with default separator
    ['separatoratstart.txt', 15, 'separa...rt.txt'], // Medium-length filename truncated with default separator
  ] as Array<[string, number, string]>;

  it.each(testCases)(
    'should truncate the string correctly for the provided filename and max length',
    (filename, maxLength, expected) => {
      const result = truncateMiddle(filename, maxLength);
      expect(result).toBe(expected);
    }
  );

  const truncatedStringWithDashes =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac odio ac quam auctor faucibus ut id dolor. Vivamus vel od--, ex non varius euismod, elit ex cursus ex, in bibendum quam elit quis tortor. Sed volutpat scelerisque tortor quis blandit. A';

  const customSeparatorTestCases = [
    ['short.txt', MAX_FILE_PATH_LENGTH, 'short.txt'], // Short filename within maximum length
    [longString, MAX_FILE_PATH_LENGTH, truncatedStringWithDashes], // Long filename, truncated with default separator
    ['short.txt', 5, 'sh--t'], // Short filename within a custom maximum length
    ['longname.txt', 8, 'lon--txt'], // Long filename truncated with custom maximum length and default separator
    ['filename.txt', 10, 'file--.txt'], // Medium-length filename truncated with default separator
    ['middleseparator.txt', 15, 'middles--or.txt'], // Medium-length filename truncated with default separator
    ['separatoratstart.txt', 15, 'separat--rt.txt'], // Medium-length filename truncated with default separator
  ] as Array<[string, number, string]>;

  it.each(customSeparatorTestCases)(
    'truncates "%s" to "%s" with max length %d and custom separator',
    (filename, maxLength, expected) => {
      const result = truncateMiddle(filename, maxLength, '--');
      expect(result).toBe(expected);
    }
  );
});

describe('sanitizeFilename', () => {
  const testCases = [
    ['validFilename.txt', 'validFilename.txt'], // Valid filename with no invalid characters
    ['file?with?question?mark.txt', 'file-with-question-mark.txt'], // Replace '?' with '-'
    ['file*with*asterisk.txt', 'file-with-asterisk.txt'], // Replace '*' with '-'
    ['file<with<less.txt', 'file-with-less.txt'], // Replace '<' with '-'
    ['file>with>greater.txt', 'file-with-greater.txt'], // Replace '>' with '-'
    ['file:with:colon.txt', 'file-with-colon.txt'], // Replace ':' with '-'
    ['file|with|pipe.txt', 'file-with-pipe.txt'], // Replace '|' with '-'
    ['file%with%percent.txt', 'file-with-percent.txt'], // Replace '%' with '-'
    ['file"with"doublequote.txt', 'file-with-doublequote.txt'], // Replace '"' with '-'
    ['file/with/slash.txt', 'file-with-slash.txt'], // Replace '/' with '-'
    ['file\\with\\backslash.txt', 'file-with-backslash.txt'], // Replace '\\' with '-'
    [
      'mixed?chars*and<slashes>and:stuff|"here%.txt',
      'mixed-chars-and-slashes-and-stuff--here-.txt',
    ], // Replace multiple invalid characters with '-'
  ];

  it.each(testCases)(
    'should sanitize the string as expected',
    (input, expected) => {
      const result = sanitizeFilename(input);
      expect(result).toBe(expected);
    }
  );
});

describe('truncatePathParts function', () => {
  const longFolderName =
    'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstu';
  const truncatedLongFolderName =
    'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuv...zabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstu';
  const longFilename =
    'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopq.json';
  const truncatedLongFilename =
    'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrst...yzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopq.json';
  it.each([
    ['folder1/file.txt', 'folder1/file.txt'],
    [
      `${longFolderName}/${longFolderName}/folder3/file.txt`,
      `${truncatedLongFolderName}/${truncatedLongFolderName}/folder3/file.txt`,
    ],
    [`folder1/${longFilename}`, `folder1/${truncatedLongFilename}`],
  ])('should truncate path parts', (input, expected) => {
    const result = truncatePathParts(input);
    expect(result).toEqual(expected);
  });
});
