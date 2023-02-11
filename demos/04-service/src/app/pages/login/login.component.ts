import { LoginService } from "./login.service";

class LoginPageController {
  private loginService: LoginService;

  constructor(loginService: LoginService) {
    "ngInject";
    this.loginService = loginService;
  }

  public $onInit() {
    this.validateLogin("admin", "test");
  }

  validateLogin = (login: string, password: string) => {
    this.loginService.validateLogin(login, password).then((succeeded) => {
      if (succeeded) {
        alert("login succeeded");
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

LoginPageController.$inject = ["LoginService"];
