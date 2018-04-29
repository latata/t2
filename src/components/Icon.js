import React, { Component } from 'react';

class Icon extends Component {
  render() {
    const classNames = `icon ${this.props.className}`;

    return (<svg className={classNames}>
      <use xlinkHref={`#${this.props.name}`} className={`icon-${this.props.name}`} />
            </svg>);
  }
}

export default Icon;
