import * as angular from "angular";
import {
  StateProvider,
  UrlRouterProvider,
  Ng1StateDeclaration,
} from "@uirouter/angularjs";

// https://github.com/ngParty/ng-metadata/issues/206
export const routing = (
  $locationProvider: angular.ILocationProvider,
  $stateProvider: StateProvider,
  $urlRouterProvider: UrlRouterProvider
) => {
  "ngInject";

  // html5 removes the need for # in URL
  $locationProvider.html5Mode({
    enabled: false,
  });

  $stateProvider
    .state("home", <Ng1StateDeclaration>{
      url: "/home",
      views: {
        "content@": { template: "<login></login>" },
      },
    })
    .state("clientlist", <Ng1StateDeclaration>{
      url: "/clientlist",
      views: {
        "content@": { template: "<clientlist></clientlist>" },
      },
    });

  $urlRouterProvider.otherwise("/home");
};

routing.$inject = ["$locationProvider", "$stateProvider", "$urlRouterProvider"];
