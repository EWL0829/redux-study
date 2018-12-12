import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import Header from './Header';
import Content from './Content';
import './index.css';

const createStore = (reducer) => {
  let state = null;
  let listeners = [];

  const subscribe = (listener) => {
    listeners.push(listener);
  };
  const getState = () => state;//获取state的函数
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  dispatch({});

  return { getState, dispatch, subscribe };
};

const themeReducer = (state, action) => {
  if (!state) return {
    themeColor: 'red'
  };
  switch (action.type) {
    case 'CHANGE_COLOR':
      return { ...state, themeColor: action.themeColor };
    default:
      return state
  }
};

const store = createStore(themeReducer);

class Index extends Component {
  constructor(props) {
    super(props);
  }

  static childContextTypes = {
    store: PropTypes.object
  };

  getChildContext() {
    return { store };
  }

  render() {
    return (
      <div>
        <Header />
        <Content />
      </div>
    );
  }
}


ReactDOM.render(<Index />, document.getElementById('root'));
