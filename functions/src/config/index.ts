
import { initializeApp } from "firebase-admin/app";
import {onRequest } from "firebase-functions/v2/https";
import authApp from "./auth.express.config";



initializeApp();


exports.authApp = onRequest(authApp);