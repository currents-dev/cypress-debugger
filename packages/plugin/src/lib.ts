import path from 'path';

// https://en.wikipedia.org/wiki/Filename#Reserved_characters_and_words
const invalidChars = /[/?<>\\:*|%"]/g;

export const MAX_FILE_PATH_LENGTH = 255;

export const isValidLength = (str: string, maxLength = MAX_FILE_PATH_LENGTH) =>
  Buffer.from(str, 'utf-8').length <= maxLength;

export const truncateMiddle = (
  filename: string,
  maxLength: number = MAX_FILE_PATH_LENGTH,
  separator = '...'
) => {
  if (isValidLength(filename, maxLength)) return filename.trim();

  const sepLen = separator.length;
  const charsToShow = maxLength - sepLen;
  const frontChars = Math.ceil(charsToShow / 2);
  const backChars = Math.floor(charsToShow / 2);

  return (
    filename.substring(0, frontChars) +
    separator +
    filename.substring(filename.length - backChars)
  );
};

export const sanitizeFilename = (filename: string, replacement = '-') =>
  filename.replace(invalidChars, replacement);

export const truncatePathParts = (filename: string): string =>
  filename
    .split(path.sep)
    .map((s, i, arr) => {
      if (i === arr.length - 1) {
        const ext = path.extname(s);
        const filenameWithoutExt = path.parse(path.basename(s)).name;
        return truncateMiddle(
          filenameWithoutExt,
          MAX_FILE_PATH_LENGTH - ext.length
        ).concat(ext);
      }

      return truncateMiddle(s);
    })
    .join(path.sep);
