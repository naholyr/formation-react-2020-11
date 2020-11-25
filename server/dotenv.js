const path = require("path");

// Default $NODE_ENV
process.env.NODE_ENV = process.env.NODE_ENV ?? "production";

// Load configuration from parent React app
process.chdir(path.join(__dirname, ".."));
require("react-scripts/config/env");
process.chdir(__dirname);

module.exports = process.env;
