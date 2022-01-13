import React, {Component} from "react";
import StateManager from "../../index";

export class Comp2 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            numberClick : 0
        }
    }

    componentDidMount() {
        StateManager.subscribeState({ numberClick: { Comp2: this }});
    }

    render() {
        let block = (<div>
            {this.state.numberClick}
        </div>);
        return block;
    }
}