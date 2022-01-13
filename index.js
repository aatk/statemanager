class States {

    StatesValues = {};
    StatesSubscribe = {};

    get state() {
        return this.StatesValues;
    };

    setState(stateObject, bindThis = null) {
        if (bindThis !== null) {
            bindThis.setState( stateObject );
        }

        for (let stateName in stateObject) {
            let value = stateObject[stateName];
            this.StatesValues[stateName] = value;

            let listSubscribes = this.StatesSubscribe[stateName];
            for (let key in listSubscribes) {
                let callback = listSubscribes[key];

                let object = {};
                object[stateName] = value;
                //callback( object );
                if (typeof callback === "function") {
                    callback( object );
                } else {
                    callback.setState( object );
                }
            }
        }
    }


    subscribeState(subscribeObject) {
        for (let stateName in subscribeObject) {
            let subscribes = subscribeObject[stateName];

            if (this.StatesSubscribe[stateName] === undefined) { this.StatesSubscribe[stateName] = {} }
            let allSubscribesName = Object.keys(this.StatesSubscribe[stateName]);

            for (let subscribeName in subscribes) {
                if (!allSubscribesName.includes(subscribeName)) {
                    this.StatesSubscribe[stateName] = {...this.StatesSubscribe[stateName], ...subscribes};
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