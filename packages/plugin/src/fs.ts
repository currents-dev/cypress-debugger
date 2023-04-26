import fs from 'fs';

export const createDir = (path: string) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
};

export const writeFile = (path: string, data: string) => {
  fs.writeFileSync(path, data);
};

export const readFile = (path: string) => fs.readFileSync(path);

export const removeFile = (path: string) => {
  fs.unlinkSync(path);
};

export const removeDir = (path: string) => {
  if (fs.existsSync(path)) {
    fs.rmdirSync(path, { recursive: true });
  }
};
