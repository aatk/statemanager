import React, {Component} from "react";
import StateManager from "../../index";

export class Comp4 extends Component {

    changeStates = (state) => {
        let rr = StateManager.state.numberClick;
        StateManager.state.numberClick = rr+1; //Not work! That's correct
        if (rr === 3) {
            StateManager.unsubscribeState({ numberClick: ["Comp4"]});
        }
        console.log(state);
    }

    componentDidMount() {
        StateManager.subscribeState({ numberClick: { Comp4: this.changeStates }});
    }

    render() {
        let block = (<div>
            Я отслеживаю, но не меняюсь
        </div>);
        return block;
    }
}