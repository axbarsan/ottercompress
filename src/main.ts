import { app, BrowserWindow } from "electron";
import Application from "./main/";

Application.bootstrap(app, BrowserWindow);
