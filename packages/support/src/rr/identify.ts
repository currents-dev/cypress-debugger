import { getRRWeb } from "./inject";

export const getRRNodes = (els?: any) => {
  const nodes: HTMLElement[] = [];
  els?.each((_i: number, el: HTMLElement) => nodes.push(el));
  return nodes
    .map((el) => getRRWeb()?.mirror.getId(el))
    .filter((i) => !!i && i > -1)
    .filter(Boolean) as number[];
};
