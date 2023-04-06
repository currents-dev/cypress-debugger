import parse from "url-parse";
import { isValidUrl } from "./isValidUrl";

export function getUrlProperties(url: string) {
  return isValidUrl(url) ? parse(url, false) : null;
}
