import React, {Component} from "react";
import StateManager from "../../index";

export class Comp1 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            numberClick : 0
        }
    }

    addClick = () => {
        let value = this.state.numberClick + 1;
        //this.setState({ numberClick : value });
        //StateManager.setState( { numberClick : value });
        StateManager.setState( { numberClick : value }, this);
    }

    render() {
        let block = (<div>
                <button className={"btn btn-light"} onClick={this.addClick}> {this.state.numberClick} </button>
            </div>);
        return block;
    }
}