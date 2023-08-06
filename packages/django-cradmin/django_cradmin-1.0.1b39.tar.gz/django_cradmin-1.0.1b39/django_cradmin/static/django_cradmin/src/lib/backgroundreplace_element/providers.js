(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  angular.module('djangoCradmin.backgroundreplace_element.providers', []).provider('djangoCradminBgReplaceElement', function() {
    /*
    Makes a request to a an URL, and replaces or extends a DOM element
    on the current page with the same DOM element within
    the requested URL.
    
    Can be used for many things, such as:
    
    - Infinite scroll (append content from ``?page=<pagenumber>``).
    - Live filtering (replace the filtered list when a filter changes).
    */

    var BgReplace;
    BgReplace = (function() {
      function BgReplace($http, $compile) {
        this.updateTargetElement = __bind(this.updateTargetElement, this);
        this.http = $http;
        this.compile = $compile;
      }

      BgReplace.prototype.loadUrlAndExtractRemoteElementHtml = function(options, onSuccess) {
        return this.http(options.parameters).then(function(response) {
          var $remoteHtmlDocument, html, remoteElement, remoteElementInnerHtml;
          html = response.data;
          $remoteHtmlDocument = angular.element(html);
          remoteElement = $remoteHtmlDocument.find(options.remoteElementSelector);
          remoteElementInnerHtml = remoteElement.html();
          return onSuccess(remoteElementInnerHtml, $remoteHtmlDocument);
        }, function(response) {
          if (options.onFinish != null) {
            options.onFinish();
          }
          if (options.onHttpError != null) {
            return options.onHttpError(response);
          } else {
            return typeof console !== "undefined" && console !== null ? typeof console.error === "function" ? console.error("Failed to load", options.parameters) : void 0 : void 0;
          }
        });
      };

      BgReplace.prototype.updateTargetElement = function(options, remoteElementInnerHtml, $remoteHtmlDocument) {
        var $compile, linkingFunction, loadedElement;
        $compile = this.compile;
        linkingFunction = $compile(remoteElementInnerHtml);
        loadedElement = linkingFunction(options.$scope);
        if (options.replace) {
          options.targetElement.empty();
        }
        options.targetElement.append(loadedElement);
        if (options.onFinish != null) {
          options.onFinish();
        }
        if (options.onSuccess) {
          return options.onSuccess($remoteHtmlDocument);
        }
      };

      BgReplace.prototype.load = function(options) {
        var me;
        me = this;
        return this.loadUrlAndExtractRemoteElementHtml(options, function(remoteElementInnerHtml, $remoteHtmlDocument) {
          return me.updateTargetElement(options, remoteElementInnerHtml, $remoteHtmlDocument);
        });
      };

      return BgReplace;

    })();
    this.$get = [
      '$http', '$compile', function($http, $compile) {
        return new BgReplace($http, $compile);
      }
    ];
    return this;
  });

}).call(this);
