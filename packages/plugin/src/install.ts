import { HttpArchiveLog } from '@currents/cypress-debugger-support';
import {
  ensureBrowserFlags,
  install as installHarPlugin,
} from '@neuralegion/cypress-har-generator';
import path from 'path';
import {
  browserLaunchHandler,
  clearLogs,
  getLogs,
  recordLogs,
} from './browserLogs';
import { createDir, readFile, removeDir, removeFile, writeFile } from './fs';
import { PluginOptions, TestExecutionResult } from './types';

const dumpDir = './dump';
const harDir = 'dump_har';

const createDumpFile = (data: TestExecutionResult): string => {
  createDir(dumpDir);
  const resultsPath = path.join(dumpDir, `${data.id}.raw.json`);
  writeFile(resultsPath, JSON.stringify(data, null, 2));
  return resultsPath;
};

const getHar = (filename: string): HttpArchiveLog => {
  const filePath = path.join(harDir, filename);
  const data = readFile(filePath);
  const parsed = JSON.parse(data.toString('utf-8'));

  removeFile(filePath);

  return parsed;
};

function install(on: Cypress.PluginEvents, options?: PluginOptions) {
  on('task', {
    // called in "afterEach" hook
    dumpEvents(
      data: Pick<TestExecutionResult, 'id' | 'cy' | 'rr' | 'meta'> & {
        harFilename: string;
      }
    ) {
      const har = getHar(data.harFilename);

      const browserLogs = getLogs();
      clearLogs();

      const dumpData = {
        id: data.id,
        cy: data.cy,
        rr: data.rr,
        meta: data.meta,
        har,
        browserLogs,
        pluginMeta: options?.meta,
      };

      const resultsFilePath = createDumpFile(dumpData);

      if (options && options.callback) {
        options.callback(resultsFilePath, dumpData);
      }

      return null;
    },

    // called in "after" hook
    cleanup() {
      removeDir(harDir);
      return null;
    },
  });

  // install cypress-har-generator
  installHarPlugin(on);

  on('before:browser:launch', (browser, launchOptions) => {
    // cypress-har-generator uses this event, details here: https://github.com/NeuraLegion/cypress-har-generator/blob/master/README.md?plain=1#L74
    ensureBrowserFlags(browser, launchOptions);

    // use chrome debugging protocol to listen to console events
    browserLaunchHandler(browser, launchOptions);

    return launchOptions;
  });

  on('before:spec', async () => {
    await recordLogs();
  });
}

export default install;
