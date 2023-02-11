import { Client } from "./client-list.model";
import { ClientApiService } from "./client.service";

class ClientListController {
  clientList: Client[] = [];
  constructor(private clientApiService: ClientApiService) {
    "ngInject";
    this.clientList = [];
  }

  $onInit() {
    this.clientApiService.getClientList().then((result) => {
      this.clientList = result;
      console.log(result);
    });
  }
}

export const ClientListComponent = {
  template: require("./client-list.component.html") as string,
  controller: ClientListController,
  controllerAs: "vm",
};

ClientListController.$inject = ["ClientApiService"];
