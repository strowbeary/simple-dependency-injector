"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registredInjectables = [];
const injectables = new Map();
function Injectable(target) {
    registredInjectables.push(target.name);
    return target;
}
exports.Injectable = Injectable;
function Inject(providers) {
    return (constructor) => {
        const providersInstances = [];
        for (const provider of providers) {
            if (injectables.get(provider.name) === void 0 && registredInjectables.includes(provider.name)) {
                injectables.set(provider.name, new provider());
                providersInstances.push(injectables.get(provider.name));
            }
            else {
                throw Error(`We cannot inject ${provider.name} into ${constructor.name}, it is not an @Injectable`);
            }
        }
        return constructor.bind({}, ...providersInstances);
    };
}
exports.Inject = Inject;
