/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { eventWithTime } from '@rrweb/types';
import type { record } from 'rrweb';
import { debug, error } from '../logger';

// @ts-ignore
import rrSrc from './releases/2.0.0-alpha.4.js.src';

let rrWebReb: typeof record | null = null;
const getRRWeb = () => rrWebReb;

export function injectRROnce(
  window: Window,
  onEmit: (e: eventWithTime, isCheckout?: boolean | undefined) => void
) {
  // @ts-ignore
  if (window.rrwebRecord) {
    debug('rrwebRecord already injected.');
    return;
  }

  const r = window.document.createElement('script');
  r.innerHTML = rrSrc;
  r.type = 'text/javascript';

  window.document.head.appendChild(r);
  // @ts-ignore
  if (!window.rrwebRecord) {
    error('Failed to load rrwebRecord after injecting script.');
    return;
  }
  // @ts-ignore
  (window.rrwebRecord as typeof record)({
    emit: onEmit,
  });

  // @ts-ignore
  rrWebReb = window.rrwebRecord as typeof record;
}

export function getRRNodes(els?: unknown) {
  const nodes: HTMLElement[] = [];
  (
    els as {
      each: (fn: (i: number, el: HTMLElement) => void) => void;
    }
  )?.each((_: number, el: HTMLElement) => nodes.push(el));
  return nodes
    .map((el) => getRRWeb()?.mirror.getId(el))
    .filter((i) => !!i && i > -1)
    .filter(Boolean) as number[];
}
