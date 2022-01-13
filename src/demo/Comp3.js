import React, {Component} from "react";
import StateManager from "../../index";

export class Comp3 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            color: true
        }
    }

    changeStates = (state) => {
        this.setState({color: !this.state.color});
    }

    componentDidMount() {
        StateManager.subscribeState({ numberClick: { Comp3: this.changeStates }} );
    }

    render() {

        let color = this.state.color ? "#fff" : "#666";

        let block = (<div>
            <h2 style={{backgroundColor: color}}>Я меняюсь по своему стейту</h2>
        </div>);
        return block;
    }
}