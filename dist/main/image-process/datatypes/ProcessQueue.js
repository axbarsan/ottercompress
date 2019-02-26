"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ImageController_1 = require("../controllers/ImageController");
var ImageProcessorController_1 = require("../controllers/ImageProcessorController");
var ProcessQueue = /** @class */ (function () {
    function ProcessQueue() {
        var _this = this;
        this.queue = [];
        this._isFinished = false;
        this.process = function (cb) {
            if (_this._isFinished)
                return;
            var queueItemsToProcess = _this.queue.filter(function (controller) { return !controller.isProcessed; });
            Promise.all(queueItemsToProcess.map(function (controller) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, ImageProcessorController_1.default.process(controller)];
                });
            }); }))
                .then(function (imageControllers) {
                _this._isFinished = true;
                if (cb !== undefined)
                    cb(null, imageControllers);
            })
                .catch(function (err) {
                if (cb !== undefined)
                    cb(new Error(err.message), null);
            });
            // if (cb !== undefined)
            //   cb(null, queueItemsToProcess);
        };
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
        this.queue.push(imageController);
        this._isFinished = false;
        return imageController;
    };
    ProcessQueue.prototype.remove = function (path) {
        var itemIndexInQueue = this.queue.findIndex(function (controller) { return controller.originalImagePath === path; });
        if (itemIndexInQueue !== -1)
            this.queue.splice(itemIndexInQueue, 1);
    };
    ProcessQueue.prototype.clear = function () {
        this.queue = [];
        this._isFinished = false;
    };
    return ProcessQueue;
}());
exports.default = ProcessQueue;
//# sourceMappingURL=ProcessQueue.js.map