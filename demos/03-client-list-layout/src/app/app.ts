import * as angular from "angular";
import { AppComponent } from "./app.component";
import { routing } from "./app.routing";
import { LoginComponent } from "./pages/login/login.component";
import { ClientListComponent } from "./pages/client-list/client-list.component";
import { ClientListSearchComponent } from "./pages/client-list/search/client-list-search.component";
import { ClientListResultComponent } from "./pages/client-list/result/client-list-result.component";
import { ClientListCardComponent } from "./pages/client-list/card/client-list-card.component";

angular
  .module("app", ["ui.router"])
  .config(routing)
  .component("app", AppComponent)
  .component("login", LoginComponent)
  .component("clientlist", ClientListComponent)
  .component("clientlistsearch", ClientListSearchComponent)
  .component("clientlistresult", ClientListResultComponent)
  .component("clientlistcard", ClientListCardComponent);
