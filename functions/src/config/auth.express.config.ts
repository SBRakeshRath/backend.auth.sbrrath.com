import express = require("express");
import router from "../authRoute/auth.router";
import * as cors from "cors";
import bodyParser = require("body-parser");
import { corsOptions } from "./cors";

const authApp = express();
authApp.use(cors(corsOptions));
authApp.use(bodyParser.json());
authApp.use(bodyParser.urlencoded());
// in latest body-parser use like below.
authApp.use(bodyParser.urlencoded({ extended: true }));

authApp.use(router);

export default authApp;
