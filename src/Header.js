import React, { Component } from 'react';
import PropTypes from 'prop-types';
export default class Header extends Component {
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

  render() {
    const { themeColor } = this.state;
    const cls = themeColor === 'blue' ? 'blue' : 'red';
    return (
      <div className={cls}>header title</div>
    );
  }
}
