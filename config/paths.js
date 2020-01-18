const path = require("path");
const fs = require("fs");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appAssets: resolveApp("frontend/src/assets/"), // For images and other assets
  appBuild: resolveApp("frontend/build"), // Prod built 
  appConfig: resolveApp("config"), // App config files
  appHtml: resolveApp("frontend/public/index.html"),
  appIndexJs: resolveApp("frontend/src/index.js"), // Main entry point
  appSrc: resolveApp("frontend/src/") // App source
};