import type { record } from "rrweb";
import { debug, error } from "../logger";
import { handleRREvent } from "./handleRREvents";

// @ts-ignore
import rrSrc from "./releases/2.0.0-alpha.4.js.src";

export function injectRROnce(window: Window) {
  // @ts-ignore
  if (window.rrwebRecord) {
    debug("rrwebRecord already injected.");
    return;
  }

  const r = window.document.createElement("script");
  r.innerHTML = rrSrc;
  r.type = "text/javascript";

  window.document.head.appendChild(r);
  // @ts-ignore
  if (!window.rrwebRecord) {
    error("Failed to load rrwebRecord after injecting script.");
    return;
  }
  // @ts-ignore
  (window.rrwebRecord as typeof record)({
    emit: handleRREvent,
  });
}
