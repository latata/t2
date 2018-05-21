import Student from './Student';

test('test Student', () => {
  const student = Student.create({
    _id: '123123',
    firstName: 'Imie',
    lastName: 'Nazwisko',
  });

  expect(student.getFullName())
    .toEqual('Imie Nazwisko');

  const testGroupId = 'testgroup';
  const testCases = [
    {
      student: student.setResigned(testGroupId),
      expected: true,
    },
    {
      student: student.setResigned(testGroupId, true),
      expected: true,
    },
    {
      student: student.setResigned(testGroupId, false),
      expected: false,
    },
  ];

  testCases.forEach(testCase => {
    expect(testCase.student.getIn(['groupsOptions', testGroupId, 'resigned']))
      .toEqual(testCase.expected);

    expect(testCase.student.isResigned(testGroupId))
      .toEqual(testCase.expected);
  });

});

test('test Student comparator', () => {
  const students = [
    {
      _id: '1',
      firstName: 'Jan',
      lastName: 'Kowalski',
    },
    {
      _id: '2',
      firstName: 'Marian',
      lastName: 'Kowalski',
    },
    {
      _id: '3',
      firstName: 'Adam',
      lastName: 'Borowski',
    },
    {
      _id: '4',
      firstName: 'Adam',
      lastName: 'Zalewski',
    },
  ]
    .map(student => Student.create(student))
    .sort(Student.comparator);

  ['3', '1', '2', '4'].forEach((id, index) => {
    expect(students[index]._id)
      .toEqual(id);
  });

});
