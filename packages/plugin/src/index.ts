import fs from "fs";
import path from "path";
import { install } from "@neuralegion/cypress-har-generator";

export const installPlugin = (
  on: Cypress.PluginEvents,
  config?: Cypress.PluginConfigOptions
) => {
  on("task", {
    _curr_dump_events(testEvents) {
      const ts = Date.now();
      fs.mkdirSync("./dump", { recursive: true });
      fs.writeFileSync(
        `./dump/${testEvents.testId}.raw.json`,
        JSON.stringify(testEvents.events, null, 2)
      );
      return null;
    },

    _move_har_to_dump({ filename, dir }: { filename: string; dir: string }) {
      const harFile = path.join(dir, filename);
      const harFileData = fs.readFileSync(harFile);
      const parsedHarFile = JSON.parse(harFileData.toString("utf-8"));

      const dumpFile = path.join("dump", filename);
      const dumpFileData = fs.readFileSync(dumpFile);
      const parsedDumpFile = JSON.parse(dumpFileData.toString("utf-8"));
      fs.writeFileSync(
        dumpFile,
        JSON.stringify({ ...parsedDumpFile, har: parsedHarFile })
      );
      fs.unlinkSync(harFile);
      return null;
    },

    _remove_dump_har({ dir }: { dir: string }) {
      if (fs.existsSync(dir)) {
        fs.rmdirSync(dir, { recursive: true });
      }

      return null;
    },
  });

  install(on);
};
