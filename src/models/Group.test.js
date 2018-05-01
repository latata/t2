import Group from './Group';

test('test Group', () => {
  const groupId = '123123';
  const group = Group.create({
    _id: groupId,
    code: 'testGroup',
    name: 'testGroup',
    students: [
      {
        _id: '1',
        groupsOptions: { [groupId]: { resigned: true } },
      },
      {
        _id: '2',
        groupsOptions: { [groupId]: { resigned: false } },
      },
      { _id: '3' },
    ],
  });

  expect(group.getCurrentStudents().size)
    .toEqual(2);

  expect(group.getResignedStudents().size)
    .toEqual(1);

  expect(group.getCurrentSize())
    .toEqual(2);
});
