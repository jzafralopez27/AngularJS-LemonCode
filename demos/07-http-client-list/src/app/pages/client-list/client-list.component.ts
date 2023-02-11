import { ClientApiService } from "./client.service";

class ClientListController {
  constructor(private clientApiService: ClientApiService) {
    "ngInject";
  }

  $onInit() {
    this.clientApiService.getClientList().then((result) => {
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
