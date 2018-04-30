import { Record } from 'immutable';

export default defaultValues => class extends Record({
  _id: undefined,
  ...defaultValues,
}) {
  flatten() {
    const flattenObj = {};
    const asJS = this.toJS();

    Object.keys(this.toJS())
      .forEach((key) => {
        let value = asJS[key];
        if (value && typeof value === 'object' && value._id) {
          value = value._id;
        }
        flattenObj[key] = value;
      });

    return flattenObj;
  }
};
