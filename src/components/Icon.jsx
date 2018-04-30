import React from 'react';

export default function Icon({ className, name }) {
  const classNames = `icon ${className}`;

  return (
    <svg className={classNames}>
      <use xlinkHref={`#${name}`} className={`icon-${name}`} />
    </svg>);
}
