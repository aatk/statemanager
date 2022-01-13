import React, {Component} from "react";
import {Comp1} from "./Comp1";
import {Comp2} from "./Comp2";
import {Comp3} from "./Comp3";
import {Comp4} from "./Comp4";

export class Desk extends Component {

    render() {
        let block = (<div>
            <Comp1>Comp1</Comp1>
            <Comp2>Comp2</Comp2>
            <Comp3>Comp3</Comp3>
            <Comp4>Comp4</Comp4>
        </div>);
        return block;
    }
}