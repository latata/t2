/* eslint-disable */

// import React from 'react';
import Student from './models/Student';
import Group from './models/Group';

it('returns fullName', () => {
  const student = Student.create({
    _id: '123123',
    firstName: 'Imie',
    lastName: 'Nazwisko'
  });
  expect(student.getFullName())
    .toEqual('Imie Nazwisko');
});

it('sets right resigned value', () => {
  const student = Student.create(123)
    .setResigned('abcd', true);

  expect(student.getIn(['groupsOptions', 'abcd', 'resigned']))
    .toEqual(true);
});

it('sets right resigned value 2', () => {
  const student = Student.create(123)
    .setResigned('qwe', false);

  expect(student.getIn(['groupsOptions', 'qwe', 'resigned']))
    .toEqual(false);
});

it('sets right resigned value 3', () => {
  const student = Student.create(123);

  expect(student.getIn(['groupsOptions', 'asdasd', 'resigned']))
    .toEqual(undefined);
});

it('groups students mapping works', () => {
  const group = Group.create({
    _id: 123,
    students: [{
      firstName: 'Karol',
      lastName: 'Tatała'
    }]
  });

  expect(group.getIn(['students', 0])
    .getFullName())
    .toEqual('Karol Tatała');
});
