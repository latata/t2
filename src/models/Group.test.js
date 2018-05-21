import Group from './Group';
import Student from './Student';

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

test('test Group sorting', () => {
  const groupId = '1';
  const student = Student.create({
    _id: 1,
    groupsOptions: { [groupId]: { resigned: true } },
  });
  const groups = [
    {
      _id: groupId,
      code: 'group1',
      students: [
        student,
      ],
    },
    {
      _id: '2',
      code: 'group2',
      students: [
        student,
      ],
    },
    {
      _id: '3',
      code: 'group3',
      students: [
        student,
      ],
      deleted: true,
    },
  ]
    .map(group => Group.create(group))
    .sort((a, b) => {
      return Group.comparator(a, b, student);
    });

  ['2', '1', '3'].forEach((id, index) => {
    expect(groups[index]._id)
      .toEqual(id);
  });
});
