(function() {
  var app = angular.module('style-directives', []);
  
    app.directive("rightPadding", function() {
    return {
      restrict: 'E',
      templateUrl: "/styles/right-padding.html"
    };
  });

  app.directive("leftPadding", function() {
    return {
      restrict: 'E',
      templateUrl: "/styles/left-padding.html"
    };
  });

  app.directive("compassRose", function() {
    return {
      restrict:"E",
      templateUrl: "/styles/compass-rose.html"
    };
  });

  app.directive("mainLogo", function() {
    return {
      restrict: "E",
      templateUrl: "/styles/main-logo.html"
    };
  });

  app.directive("logoBackground", function() {
    return {
      restrict: "E",
      templateUrl: "/styles/logo-background.html"
    };
  });

})();
