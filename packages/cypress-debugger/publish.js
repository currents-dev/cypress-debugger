#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const { Command } = require("commander");

const program = new Command()
  .name("publish")
  .option("-t, --tag <beta | latest>", "npm dist-tag to publish to");

program.parse(process.argv);
const options = program.opts();

console.log(options);
if (!options.tag) {
  console.log("No tag supplied: beta or latest");
  process.exit(1);
}

fs.copyFileSync("../../README.md", "./dist/README.md");
execSync(`npm pack --dry-run && npm publish --tag ${options.tag}`, {
  cwd: "./dist",
  stdio: "inherit",
});
