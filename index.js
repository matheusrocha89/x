#!/usr/bin/env node

const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

function readPackageManagerFromFile() {
  const packageManagerFile = path.resolve(".x-rc");
  if (fs.existsSync(packageManagerFile)) {
    return fs.readFileSync(packageManagerFile, "utf8").trim();
  }
  return null;
}

function detectPackageManager() {
  const packageManagerFromFile = readPackageManagerFromFile();
  if (packageManagerFromFile === "yarn") {
    return "yarn";
  } else if (packageManagerFromFile === "pnpm") {
    return "pnpm";
  } else if (packageManagerFromFile === "npm") {
    return "npm";
  }

  // If package manager is not specified in the file, fall back to lock file detection
  if (fs.existsSync(path.resolve("yarn.lock"))) {
    return "yarn";
  } else if (fs.existsSync(path.resolve("pnpm-lock.yaml"))) {
    return "pnpm";
  } else if (fs.existsSync(path.resolve("package-lock.json"))) {
    return "npm";
  }

  return null;
}

function runWithPackageManager(packageManager, args) {
  if (!packageManager) {
    console.error("No package manager found.");
    process.exit(1);
  }

  const result = spawnSync(packageManager, args, { stdio: "inherit" });

  if (result.error) {
    console.error(
      `Error executing '${packageManager}' command: ${result.error.message}`
    );
    process.exit(1);
  }

  process.exit(result.status);
}

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log("Usage: x <command> [args]");
    process.exit(1);
  }

  const packageManager = detectPackageManager();

  if (!packageManager) {
    console.error("No lock file found. Cannot determine the package manager.");
    process.exit(1);
  }

  console.log(`Detected package manager: ${packageManager}`);
  runWithPackageManager(packageManager, args);
}

main();
