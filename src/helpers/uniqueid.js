let currentId = 0;

export default function (prefix = 'uid') {
  currentId += 1;
  return `${prefix}-${currentId}`;
}
