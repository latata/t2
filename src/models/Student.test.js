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
