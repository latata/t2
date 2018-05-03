// Link.react.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import Icon from './Icon';

test('Icon without className', () => {
  const component = renderer.create(
    <Icon name="test" />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Icon with className', () => {
  const component = renderer.create(
    <Icon name="test" className="test-classname" />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Icon with multiple className', () => {
  const component = renderer.create(
    <Icon name="test" className="test-classname second-class third-class" />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
