(function() {
  var app = angular.module('section-directives', []);
  
    app.directive("aboutSection", function() {
    return {
      restrict: 'E',
      templateUrl: "/sections/about-section.html"
    };
  });

  app.directive("illustrationSection", function() {
    return {
      restrict: 'E',
      templateUrl: "/sections/illustration-section.html",
      controller: function() {
        
      },
      controllerAs: "illustration-gallery"
    };
  });

  app.directive("designSection", function() {
    return {
      restrict:"E",
      templateUrl: "/sections/design-section.html",
      controller: function() {
        
      },
      controllerAs: "design-gallery"
    };
  });

  app.directive("developmentSection", function() {
    return {
      restrict: "E",
      templateUrl: "/sections/development-section.html"
    };
  });

  app.directive("connectSection", function() {
    return {
      restrict: "E",
      templateUrl: "/sections/connect-section.html"
    };
  });

})();