import { LoginService } from "./login.service";
import { StateService } from "@uirouter/angularjs";

class LoginPageController {
  private loginService: LoginService;
  $state: StateService;

  constructor($state: StateService, loginService: LoginService) {
    "ngInject";
    this.$state = $state;
    this.loginService = loginService;
  }

  validateLogin = (login: string, password: string) => {
    this.loginService.validateLogin(login, password).then((succeeded) => {
      if (succeeded) {
        this.$state.go("clientlist");
      } else {
        alert("login failed");
      }
    });
  };
}

export const LoginComponent = {
  template: require("./login.component.html") as string,
  controllerAs: "vm",
  controller: LoginPageController,
};

LoginPageController.$inject = ["$state", "LoginService"];
