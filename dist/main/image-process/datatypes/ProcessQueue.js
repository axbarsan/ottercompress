"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ImageController_1 = require("../controllers/ImageController");
var ImageProcessorController_1 = require("../controllers/ImageProcessorController");
var ProcessQueue = /** @class */ (function () {
    function ProcessQueue() {
        this.queue = new Set();
        this._isFinished = false;
    }
    Object.defineProperty(ProcessQueue.prototype, "isFinished", {
        get: function () {
            return this._isFinished;
        },
        enumerable: true,
        configurable: true
    });
    ProcessQueue.prototype.add = function (path) {
        var imageController = new ImageController_1.default(path);
        this.queue.add(imageController);
        this._isFinished = false;
        return imageController;
    };
    ProcessQueue.prototype.remove = function (path) {
        var _this = this;
        this.queue.forEach(function (controller) {
            if (controller.originalImagePath === path) {
                _this.queue.delete(controller);
            }
        });
    };
    ProcessQueue.prototype.clear = function () {
        this.queue.clear();
        this._isFinished = false;
    };
    ProcessQueue.prototype.process = function (cb) {
        var _this = this;
        if (this._isFinished)
            return;
        var queueItems = [];
        var err = new Error();
        this.queue.forEach(function (controller) {
            if (!controller.isProcessed) {
                queueItems.push(ImageProcessorController_1.default.process(controller));
            }
        });
        Promise.all(queueItems)
            .then(function (imageControllers) {
            _this._isFinished = true;
            if (cb !== undefined)
                cb(null, imageControllers);
        })
            .catch(function () {
            err.message = "There was an error processing your query!";
            if (cb !== undefined)
                cb(err, null);
        });
    };
    return ProcessQueue;
}());
exports.default = ProcessQueue;
//# sourceMappingURL=ProcessQueue.js.map