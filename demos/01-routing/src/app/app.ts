import * as angular from "angular";
import { AppComponent } from "./app.component";
import { routing } from "./app.routing";
import { LoginComponent } from "./pages/login/login.component";

angular
  .module("app", ["ui.router"])
  .config(routing)
  .component("app", AppComponent)
  .component("login", LoginComponent);
