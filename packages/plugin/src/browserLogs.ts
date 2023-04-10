import CDP from "chrome-remote-interface";
import Debug from "debug";
import { REMOTE_DEBUGGING_PORT_ARG, SUPPORTED_BROWSERS } from "./constants";
import { BrowserLog } from "./types";

const debug = Debug("cypress-debugger");
debug.log = console.log.bind(console);

let cdpClient: CDP.Client;
let remoteDebuggingPort: number;
let isCdpConnected: boolean = false;

let logs: BrowserLog = {
  logEntry: [],
  runtimeConsoleApiCalled: [],
};

function isSupportedBrowser(browser: Cypress.Browser): boolean {
  return SUPPORTED_BROWSERS.includes(browser?.family);
}

function getPortFromArgs(args: string[]): number | undefined {
  const param = args.find(
    (arg) =>
      arg.slice(0, REMOTE_DEBUGGING_PORT_ARG.length) ===
      REMOTE_DEBUGGING_PORT_ARG
  );

  return param ? Number(param.split("=")[1]) : undefined;
}

function parseElectronSwitches(): string[] {
  /* eslint-disable-next-line turbo/no-undeclared-env-vars */
  const electronArgs = process.env.ELECTRON_EXTRA_LAUNCH_ARGS;

  if (!electronArgs?.includes(REMOTE_DEBUGGING_PORT_ARG)) {
    throw new Error(
      `Missing ${REMOTE_DEBUGGING_PORT_ARG} command line switch for Electron browser`
    );
  }

  return electronArgs.split(" ");
}

function ensureRdpPort(browser: Cypress.Browser, args: string[]) {
  // --remote-debugging-port is not set for Electron. See https://docs.cypress.io/api/plugins/browser-launch-api#Modify-browser-launch-arguments
  // get the command line switches from ELECTRON_EXTRA_LAUNCH_ARGS. See https://docs.cypress.io/api/plugins/browser-launch-api#Modify-Electron-app-switches
  if (browser.name === "electron") {
    args = parseElectronSwitches();
  }

  let port = getPortFromArgs(args);

  if (!port) {
    port = 40000 + Math.round(Math.random() * 25000);
    debug("Remote Debugging Port not set, using a random port: %d", port);

    args.push(`${REMOTE_DEBUGGING_PORT_ARG}=${port}`);
  }

  return port;
}

async function attachCdpHandlers() {
  debug("Attaching cdp handlers");

  if (!cdpClient) return;

  cdpClient.Log.enable();
  cdpClient.Log.entryAdded((event) => {
    logs.logEntry.push(event.entry);
  });

  cdpClient.Runtime.enable();
  cdpClient.Runtime.consoleAPICalled((event) => {
    logs.runtimeConsoleApiCalled.push(event);
  });
}

async function connect() {
  const MAX_CONNECTION_ATTEMPTS = 5;
  const CONNECTION_TIMEOUT = 100;
  let connectionAttempt = 0;

  const tryConnect = async () => {
    try {
      cdpClient = await CDP({
        port: remoteDebuggingPort,
      });

      debug("Connected to Chrome DevTools Protocol");

      cdpClient.on("disconnect", () => {
        debug("Chrome DevTools Protocol disconnected");
        isCdpConnected = false;
      });
    } catch (error) {
      if (++connectionAttempt === MAX_CONNECTION_ATTEMPTS) {
        throw new Error(
          `Failed to connect to Chrome DevTools Protocol after ${
            CONNECTION_TIMEOUT * connectionAttempt
          }`
        );
      }

      if (connectionAttempt < MAX_CONNECTION_ATTEMPTS) {
        debug(
          "Failed to connect to Chrome DevTools Protocol, attempt: %d",
          connectionAttempt
        );

        debug("Reconnecting...");

        await new Promise((resolve) => setTimeout(resolve, CONNECTION_TIMEOUT));
        await tryConnect();
      }
    }
  };

  await tryConnect();
}

export function browserLaunchHandler(
  browser: Cypress.Browser,
  launchOptions: Cypress.BrowserLaunchOptions
) {
  const args = launchOptions.args || launchOptions;

  if (!isSupportedBrowser(browser)) {
    return debug(
      "Warning: An unsupported browser family was used, output will not be logged to console: %s",
      browser.family
    );
  }

  remoteDebuggingPort = ensureRdpPort(browser, args);

  return launchOptions;
}

export async function recordLogs() {
  if (!remoteDebuggingPort) {
    throw new Error("Remote Debugging Port not set");
  }

  if (cdpClient && isCdpConnected) {
    debug("Closing the current cdp connection");
    await cdpClient.close();
  }

  debug("Attempting to connect to Chrome DevTools Protocol");
  await connect();
  isCdpConnected = true;
  await attachCdpHandlers();
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
