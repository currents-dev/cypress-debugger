import CDP from "chrome-remote-interface";
import { BrowserLog } from "./types";

let logs: BrowserLog = {
  logEntry: [],
  runtimeConsoleApiCalled: [],
};

function debugLog(msg: any) {
  console.log(`[cypress-debugger] ${msg}`);
}

function isChrome(browser: any) {
  return (
    ["chrome", "chromium"].includes(browser.family) ||
    ["chrome", "chromium", "canary"].includes(browser.name)
  );
}

function ensureRdpPort(args: any) {
  const existing = args.find(
    (arg: any) => arg.slice(0, 23) === "--remote-debugging-port"
  );

  if (existing) {
    return Number(existing.split("=")[1]);
  }

  // running cypress with ELECTRON_EXTRA_LAUNCH_ARGS="--remote-debugging-port=9222" do not set the args
  return 9222;
}

export function browserLaunchHandler(browser: any = {}, launchOptions: any) {
  const args = launchOptions.args || launchOptions;

  if (!isChrome(browser)) {
    return debugLog(
      `Warning: An unsupported browser family was used, output will not be logged to console: ${browser.family}`
    );
  }

  const rdp = ensureRdpPort(args);

  debugLog("Attempting to connect to Chrome Debugging Protocol");

  const MAX_CONNECTION_ATTEMPTS = 5;
  const CONNECTION_TIMEOUT = 100;
  let connectionAttempt = 0;

  const tryConnect = () => {
    CDP({
      port: rdp,
    })
      .then((cdp) => {
        debugLog("Connected to Chrome Debugging Protocol");

        cdp.Log.enable();
        cdp.Log.entryAdded((event) => {
          logs.logEntry.push(event.entry);
        });

        cdp.Runtime.enable();
        cdp.Runtime.consoleAPICalled((event) => {
          logs.runtimeConsoleApiCalled.push(event);
        });

        cdp.on("disconnect", () => {
          debugLog("Chrome Debugging Protocol disconnected");
        });
      })
      .catch(() => {
        if (++connectionAttempt === MAX_CONNECTION_ATTEMPTS) {
          debugLog(
            `Failed to connect to Chrome Debugging Protocol after ${
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

export function getLogs() {
  return logs;
}

export function clearLogs() {
  logs = {
    logEntry: [],
    runtimeConsoleApiCalled: [],
  };
}
