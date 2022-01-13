class States {

    constructor() {
        this.StatesValues = {};
        this.StatesSubscribe = {};
    }

    get state() {
        return this.StatesValues;
    };

    _callbackRun(callback, stateName, value) {
        let object = {};
        object[stateName] = value;
        if (typeof callback === "function") {
            callback(object);
        } else {
            callback.setState(object);
        }
    }

    setState(stateObject, bindThis = null) {
        if (bindThis !== null) {
            bindThis.setState(stateObject);
        }

        for (let stateName in stateObject) {
            this.StatesValues[stateName] = stateObject[stateName];
        }

        for (let stateName in stateObject) {
            let value = stateObject[stateName];

            let listSubscribes = this.StatesSubscribe[stateName];
            for (let key in listSubscribes) {
                let callback = listSubscribes[key];

                this._callbackRun(callback, stateName, value);
            }
        }
    }


    subscribeState(subscribeObject) {
        for (let stateName in subscribeObject) {
            let subscribes = subscribeObject[stateName];

            if (this.StatesSubscribe[stateName] === undefined) {
                this.StatesSubscribe[stateName] = {}
            }
            let allSubscribesName = Object.keys(this.StatesSubscribe[stateName]);

            for (let subscribeName in subscribes) {
                if (!allSubscribesName.includes(subscribeName)) {
                    this.StatesSubscribe[stateName] = {...this.StatesSubscribe[stateName], ...subscribes};
                }
            }
        }

        //Если при подписке уже есть какие-то значения, то отправим их обратно
        for (let stateName in subscribeObject) {
            let value = this.StatesValues[stateName];
            if (value !== undefined) {

                let subscribes = subscribeObject[stateName];
                for (let subscribeName in subscribes) {
                    let callback = subscribes[subscribeName];
                    this._callbackRun(callback, stateName, value);
                }
            }
        }
    }

    unsubscribeState(subscribeObject) {
        for (let stateName in subscribeObject) {
            let subscribes = subscribeObject[stateName];

            if (this.StatesSubscribe[stateName] !== undefined) {
                let allSubscribesName = Object.keys(this.StatesSubscribe[stateName]);

                for (let subscribeIndex in subscribes) {
                    let subscribeName = subscribes[subscribeIndex];
                    if (allSubscribesName.includes(subscribeName)) {
                        delete this.StatesSubscribe[stateName][subscribeName];
                    }
                }
            }
        }
    }


}


let StateManager = new States();

export default StateManager;