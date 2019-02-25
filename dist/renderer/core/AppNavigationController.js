"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppNavigationController = /** @class */ (function () {
    function AppNavigationController() {
        var _this = this;
        this.elements = [];
        this.activeIndex = 0;
        this.activeClass = "active";
        this.htmlLoadedClass = "loaded";
        this.screenSelector = ".app__screen";
        window.addEventListener("DOMContentLoaded", function () {
            var elements = document.querySelectorAll(_this.screenSelector);
            for (var _i = 0, _a = Array.from(elements); _i < _a.length; _i++) {
                var elem = _a[_i];
                _this.elements.push(elem);
            }
        });
        window.addEventListener("load", function () {
            document.documentElement.classList.add(_this.htmlLoadedClass);
        });
    }
    AppNavigationController.prototype.setActiveIndex = function (index) {
        var _this = this;
        this.activeIndex = index;
        this.elements.forEach(function (elem, elemIndex) {
            if (elemIndex === index)
                elem.classList.add(_this.activeClass);
            else
                elem.classList.remove(_this.activeClass);
        });
    };
    AppNavigationController.prototype.next = function () {
        if (this.activeIndex < (this.elements.length - 1))
            this.setActiveIndex(this.activeIndex + 1);
    };
    AppNavigationController.prototype.prev = function () {
        if (this.activeIndex > 0)
            this.setActiveIndex(this.activeIndex - 1);
    };
    AppNavigationController.prototype.reset = function () {
        this.setActiveIndex(0);
    };
    return AppNavigationController;
}());
exports.default = AppNavigationController;
//# sourceMappingURL=AppNavigationController.js.map