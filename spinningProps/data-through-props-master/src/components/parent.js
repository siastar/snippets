import React, { Component } from "react";
import Child1 from "./child1";
import Child2 from "./child2";

export default class Parent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      child1: random0To99(),
      child2: random0To99()
    };
    this.mutateChild1 = this.mutateChild1.bind(this);
    this.mutateChild2 = this.mutateChild2.bind(this);
    this.mutateChildren = this.mutateChildren.bind(this);
  }
  mutateChild1(value) {
    this.setState({
      child1: value
    });
  }
  mutateChild2(value) {
    this.setState({
      child2: value
    });
  }
  mutateChildren() {
    this.setState({
      child1: random0To99(),
      child2: random0To99()
    });
  }
  render() {
    return (
      <div className="parent" onClick={this.mutateChildren}>
        <strong>Parent</strong>
        <Child1 value={this.state.child1} mutateState={this.mutateChild1} />
        <Child2 value={this.state.child2} mutateState={this.mutateChild2} />
      </div>
    );
  }
}

export function random0To99() {
  return Math.floor(Math.random() * 100);
}
