import parse from "url-parse";

export function getUrlProperties(url: string) {
  return parse(url, false);
}
