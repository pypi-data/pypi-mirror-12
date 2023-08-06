(function() {
  angular.module('djangoCradmin.multiselect.directives', []).directive('djangoCradminMultiselectTarget', [
    'djangoCradminMultiselectCoordinator', function(djangoCradminMultiselectCoordinator) {
      return {
        restrict: 'A',
        controller: function($scope, $element) {
          var domId;
          domId = $element.attr('id');
          $scope.selectedItemsScope = null;
          if (domId == null) {
            throw Error('Elements using django-cradmin-multiselect-target must have an id.');
          }
          djangoCradminMultiselectCoordinator.registerTarget(domId, $scope);
          $scope.$on("$destroy", function() {
            return djangoCradminMultiselectCoordinator.unregisterTarget(domId);
          });
          $scope.select = function(selectScope) {
            /*
            Called by djangoCradminMultiselectSelect via
            djangoCradminMultiselectCoordinator when an item is selected.
            */

            return $scope.selectedItemsScope.append(selectScope);
          };
          this.setSelectedItemsScope = function(selectedItemsScope) {
            return $scope.selectedItemsScope = selectedItemsScope;
          };
        },
        link: function($scope, $element, attributes) {}
      };
    }
  ]).directive('djangoCradminMultiselectTargetSelectedItems', [
    'djangoCradminMultiselectCoordinator', function(djangoCradminMultiselectCoordinator) {
      return {
        restrict: 'A',
        require: '^djangoCradminMultiselectTarget',
        controller: function($scope, $element) {
          $scope.append = function(selectScope) {
            var previewHtml;
            previewHtml = selectScope.getPreviewHtml();
            console.log(previewHtml);
            return angular.element(previewHtml).appendTo($element);
          };
        },
        link: function($scope, $element, attributes, targetCtrl) {
          targetCtrl.setSelectedItemsScope($scope);
        }
      };
    }
  ]).directive('djangoCradminMultiselectSelect', [
    'djangoCradminMultiselectCoordinator', function(djangoCradminMultiselectCoordinator) {
      return {
        restrict: 'A',
        scope: {
          options: '=djangoCradminMultiselectSelect'
        },
        controller: function($scope, $element) {
          $scope.getPreviewHtml = function() {
            var $containerElement, $previewElement;
            $containerElement = $element.parents($scope.options.preview_container_css_selector);
            console.log('Container', $containerElement);
            $previewElement = $containerElement.find($scope.options.preview_css_selector);
            console.log('Preview', $previewElement);
            return $previewElement.html();
          };
        },
        link: function($scope, $element, attributes, listfilterCtrl) {
          $element.on('click', function(e) {
            var targetDomId;
            e.preventDefault();
            console.log('SELECT', $scope.options);
            targetDomId = $scope.options.target_dom_id;
            return djangoCradminMultiselectCoordinator.select(targetDomId, $scope);
          });
        }
      };
    }
  ]);

}).call(this);
