(function() {
  angular.module('djangoCradmin.multiselect.services', []).factory('djangoCradminMultiselectCoordinator', function() {
    /*
    Coordinates between djangoCradminMultiselectSelect
    and djangoCradminMultiselectTarget.
    */

    var Coordinator;
    Coordinator = (function() {
      function Coordinator() {
        this.targets = {};
      }

      Coordinator.prototype.registerTarget = function(targetDomId, targetScope) {
        return this.targets[targetDomId] = targetScope;
      };

      Coordinator.prototype.unregisterTarget = function(targetDomId, targetScope) {
        return del(this.targets[targetDomId]);
      };

      Coordinator.prototype.select = function(targetDomId, selectScope) {
        var targetScope;
        targetScope = this.targets[targetDomId];
        if (targetScope == null) {
          throw Error("No target with ID '" + targetDomId + "' registered with djangoCradminMultiselectCoordinator.");
        }
        return targetScope.select(selectScope);
      };

      return Coordinator;

    })();
    return new Coordinator();
  });

}).call(this);
