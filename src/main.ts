import { app, BrowserWindow } from "electron";
import Application from "./main/";

// Initialize electron application with global app and browserwindow references
Application.bootstrap(app, BrowserWindow);
