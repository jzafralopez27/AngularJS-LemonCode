import * as angular from "angular";

export class LoginService {
  $q: angular.IQService = null;

  constructor($q: angular.IQService) {
    this.$q = $q;
  }

  public validateLogin(user: string, pwd: string): boolean {
    return user === "admin" && pwd === "test";
  }
}

LoginService.$inject = ["$q"];
