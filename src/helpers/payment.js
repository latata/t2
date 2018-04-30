export const defaultPaymentType = 'r9';

export const paymentTypes = [
  {
    value: 'r9',
    label: '9 rat',
  },
  {
    value: 'r4',
    label: '4 raty',
  },
  {
    value: 'r2',
    label: '2 raty',
  },
  {
    value: 'r1',
    label: '1 rata',
  },
];

export const paymentPeriods = [
  {
    value: 'oct',
    label: 'do 10 października',
  },
  {
    value: 'nov',
    label: 'do 10 listopada',
  },
  {
    value: 'dec',
    label: 'do 10 grudnia',
  },
  {
    value: 'jan',
    label: 'do 10 stycznia',
  },
  {
    value: 'feb',
    label: 'do 10 lutego',
  },
  {
    value: 'mar',
    label: 'do 10 marca',
  },
  {
    value: 'apr',
    label: 'do 10 kwietnia',
  },
  {
    value: 'may',
    label: 'do 10 maja',
  },
];

export const paymentPeriodToTypePeriodMap = {
  oct: {
    r9: 'oct',
    r4: 'oct',
    r2: 'oct',
    r1: 'oct',
  },
  nov: {
    r9: 'nov',
    r4: 'nov',
    r2: 'oct',
    r1: 'oct',
  },
  dec: {
    r9: 'dec',
    r4: 'nov',
    r2: 'oct',
    r1: 'oct',
  },
  jan: {
    r9: 'jan',
    r4: 'jan',
    r2: 'jan',
    r1: 'oct',
  },
  feb: {
    r9: 'feb',
    r4: 'jan',
    r2: 'jan',
    r1: 'oct',
  },
  mar: {
    r9: 'mar',
    r4: 'mar',
    r2: 'jan',
    r1: 'oct',
  },
  apr: {
    r9: 'apr',
    r4: 'mar',
    r2: 'jan',
    r1: 'oct',
  },
  may: {
    r9: 'may',
    r4: 'mar',
    r2: 'jan',
    r1: 'oct',
  },
};
