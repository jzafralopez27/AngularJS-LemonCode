import { LoginService } from "./login.service";
import { StateService } from "@uirouter/angularjs";
import { IToastrService } from "angular-toastr";

class LoginPageController {
  private loginService: LoginService;
  $state: StateService;
  toastr: IToastrService;

  constructor(
    $state: StateService,
    toastr: IToastrService,
    loginService: LoginService
  ) {
    "ngInject";
    this.$state = $state;
    this.toastr = toastr;
    this.loginService = loginService;
  }

  validateLogin = (login: string, password: string) => {
    this.loginService.validateLogin(login, password).then((succeeded) => {
      if (succeeded) {
        this.$state.go("clientlist");
      } else {
        this.toastr.error(
          "Incorrect login or password, please try again, Pssst login: user@email.com pwd: test"
        );
      }
    });
  };
}

export const LoginComponent = {
  template: require("./login.component.html") as string,
  controllerAs: "vm",
  controller: LoginPageController,
};

LoginPageController.$inject = ["$state", "toastr", "LoginService"];
