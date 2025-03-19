"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DependencyInjector = void 0;
var DependencyInjector = /** @class */ (function () {
    function DependencyInjector() {
        this.factories = new Map();
        this.instances = new Map();
    }
    DependencyInjector.prototype.set = function (key, factory) {
        if (!this.factories.has(key)) {
            this.factories.set(key, factory);
        }
    };
    DependencyInjector.prototype.get = function (key) {
        if (!this.instances.has(key)) {
            var factory = this.factories.get(key);
            if (!factory) {
                throw new Error("No factory found for key: ".concat(typeof key === "string" ? key : key.name));
            }
            var instance = factory();
            this.instances.set(key, instance);
        }
        return this.instances.get(key);
    };
    return DependencyInjector;
}());
exports.DependencyInjector = DependencyInjector;
