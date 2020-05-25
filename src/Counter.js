import React, { Component } from 'react';


const getStateFromLocalStorage = () => {
  const storage = localStorage.getItem('counterState');
  if(storage) return JSON.parse(storage);
  return { count: 0};
}

const updateDocumentTitle = (state) => {
  document.title = `Count: ${state.count}`;
}

const storeStateInLocalStorage = (state) => {
  localStorage.setItem('counterState', JSON.stringify(state));
}
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = getStateFromLocalStorage();
  }

  increment = () => {
    this.setState((state, props) => {
      const {max, step } = props;
      if(state.count >=max) return;
      return {count: state.count + step}
    }, () => {
      storeStateInLocalStorage(this.state)
      updateDocumentTitle(this.state)
    });
  }

  decrement = () => {
    this.setState((state) =>  ({count: state.count - 1}),
      () => updateDocumentTitle(this.state))
  }

  reset = () => {
    this.setState(() => ({count: 0}), () => updateDocumentTitle(this.state))
  }

  render() {
    const { count } = this.state;
    return (
      <div className="Counter">
        <p className="count">{count}</p>
        <section className="controls">
          <button onClick={this.increment}>Increment</button>
          <button onClick={this.decrement}>Decrement</button>
          <button onClick={this.reset}>Reset</button>
        </section>
      </div>
    );
  }
}

export default Counter;
