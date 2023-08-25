export const sanitizeFilename = (filename: string, replacement = '-') =>
  // https://en.wikipedia.org/wiki/Filename#Reserved_characters_and_words
  filename.replace(/[\/\?<>\\:\*\|%"]/g, replacement);
