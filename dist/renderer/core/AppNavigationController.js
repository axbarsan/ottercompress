"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppNavigationController = (function () {
    function AppNavigationController() {
        var _this = this;
        this.elements = [];
        this.activeIndex = 0;
        this.activeClass = "active";
        this.htmlLoadedClass = "loaded";
        this.screenSelector = ".app__screen";
        this.setActiveIndex = function (index) {
            _this.activeIndex = index;
            _this.elements.forEach(function (elem, elemIndex) {
                if (elemIndex === index)
                    elem.classList.add(_this.activeClass);
                else
                    elem.classList.remove(_this.activeClass);
            });
        };
        this.next = function () {
            if (_this.activeIndex < (_this.elements.length - 1))
                _this.setActiveIndex(_this.activeIndex + 1);
        };
        this.prev = function () {
            if (_this.activeIndex > 0)
                _this.setActiveIndex(_this.activeIndex - 1);
        };
        this.reset = function () {
            _this.setActiveIndex(0);
        };
        window.addEventListener("DOMContentLoaded", function () {
            var elements = document.querySelectorAll(_this.screenSelector);
            for (var _i = 0, _a = Array.from(elements); _i < _a.length; _i++) {
                var elem = _a[_i];
                _this.elements.push(elem);
            }
            _this.reset();
        });
        window.addEventListener("load", function () {
            document.documentElement.classList.add(_this.htmlLoadedClass);
        });
    }
    return AppNavigationController;
}());
var navController = new AppNavigationController();
exports.default = navController;
//# sourceMappingURL=AppNavigationController.js.map