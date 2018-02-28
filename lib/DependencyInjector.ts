let registredInjectables = new Array<string>();
let injectables = new Map<String, any>();

export function Injectable(target: any) {
    registredInjectables.push(target.name);
    return target;
}

export function Inject(providers: any[]) {
    return function (constructor: any) {
        let providersInstances: any = [];
        for (let provider of providers) {
            if (injectables.get(provider.name) === void 0 && registredInjectables.includes(provider.name)) {
                injectables.set(provider.name, new provider());
                providersInstances.push(injectables.get(provider.name));
            } else {
                throw Error(
                    `We cannot inject ${provider.name} into ${constructor.name}, it is not an @Injectable`
                );
            }
        }
        return constructor.bind({}, ...providersInstances);
    };
}