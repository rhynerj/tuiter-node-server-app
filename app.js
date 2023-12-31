// const express = require('express');
import express from "express";
import cors from "cors";
import "dotenv/config";
import session from "express-session";
import HelloController from "./controllers/hello-controller.js";
import UserController from "./controllers/users/users-controller.js";
import TuitsController from "./controllers/tuits/tuits-controller.js";
import AuthController from "./controllers/users/auth-controller.js";

const app = express();
app.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND_URL
    })
);
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    };
}
sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
};
app.use(
    session(sessionOptions)
);
app.use(express.json());

TuitsController(app);
HelloController(app);
UserController(app);
AuthController(app);

const port = process.env.PORT || 4000;
app.listen(port);