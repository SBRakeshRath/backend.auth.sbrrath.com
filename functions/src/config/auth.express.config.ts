import express = require("express");
import router from "../authRoute/auth.router";
import * as cors from "cors";
import { corsOptions } from "./cors";

const authApp = express();
authApp.use(cors(corsOptions));

authApp.use(router);

export default authApp;
