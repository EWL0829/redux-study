import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ThemeSwitch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      themeColor: ''
    };
  }

  static contextTypes = {
    store: PropTypes.object
  };

  componentWillMount () {
    const { store } = this.context;
    this._updateThemeColor();
    store.subscribe(() => { this._updateThemeColor() });
  }

  _updateThemeColor () {
    const { store } = this.context;
    const state = store.getState();
    this.setState({ themeColor: state.themeColor });
  }

  handleToggleTheme = (color) => {
    const { store } = this.context;

    store.dispatch({
      type: 'CHANGE_COLOR',
      themeColor: color
    });

  };


  render() {
    const { themeColor } = this.state;
    const cls = themeColor === 'blue' ? 'blue' : 'red';
    return (
      <div>
        <button onClick={() => { this.handleToggleTheme('red') }} className={cls}>red</button>
        <button onClick={() => { this.handleToggleTheme('blue') }} className={cls}>blue</button>
      </div>
    );
  }
}