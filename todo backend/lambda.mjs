// "use strict";
// const app = require("./src/app");
// const serverless = require("serverless-http");
// module.exports.hello = serverless(app);
"use strict";
import app from "./src/app.ts";
import serverless from "serverless-http";

export const hello = serverless(app);
