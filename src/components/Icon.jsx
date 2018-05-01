import React from 'react';
import PropTypes from 'prop-types';
import './Icon.css';

export default function Icon({ className, name }) {
  let classNames = 'icon';

  if (className) {
    classNames += ` ${className}`;
  }

  return (
    <svg className={classNames}>
      <use xlinkHref={`#${name}`} className={`icon-${name}`} />
    </svg>);
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};
