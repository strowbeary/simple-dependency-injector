Use decorators to manage dependency injection in you TS and JS projects

## Installation 
```sh
npm install simple-dependency-injector --save
yarn add simple-dependency-injector
```
**this module need experimentalDecorators enabled**

## Usage
Use ```@Injectable``` to declare an injectable object.

Use ```@Inject([<injectable constructor>,])``` to inject declared injectable into a function.
### TypeScript

```typescript
import {Injectable, Inject} from "simple-dependency-injector";

@Injectable
class MyInjectable {
    //some code
}

@Inject([MyInjectable])
class WhoNeedMyInjectable {
    constructor(private myInjectable: MyInjectable) {
        //use MyInjectable with this.myInjectable
    }
}
```

### Javascript
```javascript
import {Injectable, Inject} from "simple-dependency-injector";

@Injectable
class MyInjectable {
    //some code
}

@Inject([MyInjectable])
class WhoNeedMyInjectable {
    constructor(myInjectable) {
        this.myInjectable = myInjectable;
        //use MyInjectable with this.myInjectable
    }
}
```


## Test 
```sh
npm run test
```