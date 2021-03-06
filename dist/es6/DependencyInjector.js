const registredInjectables = [];
const injectables = new Map();
export function Injectable(target) {
    registredInjectables.push(target.name);
    return target;
}
export function Inject(providers) {
    return (constructor) => {
        const providersInstances = [];
        for (const provider of providers) {
            if (registredInjectables.includes(provider.name)) {
                if (injectables.get(provider.name) === void 0) {
                    injectables.set(provider.name, new provider());
                }
                providersInstances.push(injectables.get(provider.name));
            }
            else {
                throw Error(`We cannot inject ${provider.name} into ${constructor.name}, it is not an @Injectable`);
            }
        }
        return constructor.bind({}, ...providersInstances);
    };
}
