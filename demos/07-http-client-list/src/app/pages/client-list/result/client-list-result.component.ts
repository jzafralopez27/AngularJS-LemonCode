import { Client } from "../client-list.model";

export const ClientListResultComponent = {
  bindings: {
    clientList: "<",
  },
  template: require("./client-list-result.component.html") as string,
  controllerAs: 'vm'
};
