import CDP from "chrome-remote-interface";
import { BrowserLog } from "./types";

let _browser: Cypress.Browser;
let _launchOptions: Cypress.BrowserLaunchOptions;
let _connected = false;

let logs: BrowserLog = {
  logEntry: [],
  runtimeConsoleApiCalled: [],
};

function debugLog(msg: string) {
  console.log(`[cypress-debugger] ${msg}`);
}

function isChrome(browser: Cypress.Browser) {
  return (
    ["chrome", "chromium"].includes(browser.family) ||
    ["chrome", "chromium", "canary"].includes(browser.name)
  );
}

function ensureRdpPort(args: string[]) {
  const portArg = "--remote-debugging-port";
  const existing = args.find((arg) => arg.slice(0, portArg.length) === portArg);

  if (existing) {
    return Number(existing.split("=")[1]);
  }

  // default debugging port
  return 9222;
}

export function browserLaunchHandler(
  browser: Cypress.Browser,
  launchOptions: Cypress.BrowserLaunchOptions
) {
  _browser = browser;
  _launchOptions = launchOptions;

  const args = launchOptions.args || launchOptions;

  if (!isChrome(browser)) {
    return debugLog(
      `Warning: An unsupported browser family was used, output will not be logged to console: ${browser.family}`
    );
  }

  const rdp = ensureRdpPort(args);

  debugLog("Attempting to connect to Chrome DevTools Protocol");

  const MAX_CONNECTION_ATTEMPTS = 5;
  const CONNECTION_TIMEOUT = 100;
  let connectionAttempt = 0;

  const tryConnect = () => {
    CDP({
      port: rdp,
    })
      .then((cdp) => {
        debugLog("Connected to Chrome Debugging Protocol");
        _connected = true;

        cdp.Log.enable();
        cdp.Log.entryAdded((event) => {
          logs.logEntry.push(event.entry);
        });

        cdp.Runtime.enable();
        cdp.Runtime.consoleAPICalled((event) => {
          logs.runtimeConsoleApiCalled.push(event);
        });

        cdp.on("disconnect", () => {
          _connected = false;
          debugLog("Chrome DevTools Protocol disconnected");
        });
      })
      .catch(() => {
        if (++connectionAttempt === MAX_CONNECTION_ATTEMPTS) {
          debugLog(
            `Failed to connect to Chrome DevTools Protocol after ${
              CONNECTION_TIMEOUT * connectionAttempt
            }ms`
          );
          return;
        }

        setTimeout(() => {
          if (connectionAttempt < MAX_CONNECTION_ATTEMPTS) {
            tryConnect();
          }
        }, CONNECTION_TIMEOUT);
      });
  };

  tryConnect();

  return launchOptions;
}

export function reconnect() {
  if (!_browser || !_launchOptions) {
    return debugLog("Browser not set");
  }

  if (!_connected) {
    browserLaunchHandler(_browser, _launchOptions);
  }
}

export function getLogs() {
  return logs;
}

export function clearLogs() {
  logs = {
    logEntry: [],
    runtimeConsoleApiCalled: [],
  };
}
