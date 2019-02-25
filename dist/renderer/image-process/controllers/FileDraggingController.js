"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FileDraggingController = /** @class */ (function () {
    function FileDraggingController(config) {
        this.config = config;
        this.addEvents();
    }
    FileDraggingController.prototype.addEvents = function () {
        var _this = this;
        this.config.element.ondragover = this.setActiveToggle.bind(this, true);
        this.config.element.ondragenter = this.setActiveToggle.bind(this, true);
        this.config.element.ondragleave = this.setActiveToggle.bind(this, false);
        this.config.element.ondrop = function (e) {
            e.preventDefault();
            if (e.dataTransfer !== null) {
                if (_this.config.isFolderOnly && e.dataTransfer.files[0].type !== "")
                    return false;
                _this.config.dropCallback(e.dataTransfer.files);
            }
            _this.setActiveToggle.call(_this, false);
            return false;
        };
    };
    FileDraggingController.prototype.setActiveToggle = function (on) {
        if (on)
            this.config.element.classList.add(this.config.activeClass);
        else
            this.config.element.classList.remove(this.config.activeClass);
        return false;
    };
    return FileDraggingController;
}());
exports.default = FileDraggingController;
//# sourceMappingURL=FileDraggingController.js.map