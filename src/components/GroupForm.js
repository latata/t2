import { Component } from 'react';
import { Map } from 'immutable';
import h from 'react-hyperscript';
import GroupPricingForm from './GroupPricingForm';
import Group from '../models/Group';
import InputGroup from './forms/InputGroup';
import SelectGroup from './forms/SelectGroup';
import SimpleValidator from '../helpers/validators/SimpleValidator';
import YearValidator from '../helpers/validators/YearValidator';

const validators = {
  code: new SimpleValidator({ required: true }),
  name: new SimpleValidator({ required: true }),
  year: new YearValidator(),
  company: new SimpleValidator({ required: true }),
};

class GroupForm extends Component {
  constructor(props) {
    super(props);

    this.inputChanged = this.inputChanged.bind(this);
    this.updatePricing = this.updatePricing.bind(this);
    this.companyChanged = this.companyChanged.bind(this);
    this.submit = this.submit.bind(this);
    this.onValidityChange = this.onValidityChange.bind(this);

    this.errors = Map();

    this.state = {
      group: this.props.group || Group.create({}),
    };
  }

  componentWillReceiveProps(newProps) {
    if (this.props.group !== newProps.group) {
      this.setState({ group: newProps.group });
    }
  }

  inputChanged({ name, value }) {
    this.setState({ group: this.state.group.set(name, value) });
  }

  companyChanged(data) {
    this.setState({ group: this.state.group.set('company', data && data.value) });
  }

  updatePricing(pricing) {
    this.setState({ group: this.state.group.set('pricing', pricing) });
  }

  submit(event) {
    event.preventDefault();
    this.setState({
      submitted: true,
    });
    if (!this.errors.size) {
      this.props.onSubmit(this.state.group);
    }
  }

  onValidityChange({ name, error }) {
    // we need to use component property because state udpates are asynchronous
    if (error) {
      this.errors = this.errors.set(name, error);
    } else {
      this.errors = this.errors.delete(name);
    }
  }

  render() {
    return (
      h('form', {
        onSubmit: this.submit,
        noValidate: true,
      }, [
        h(InputGroup, {
          label: 'Kod grupy',
          name: 'code',
          validator: validators.code,
          value: this.state.group.code,
          submitted: this.state.submitted,
          onChange: this.inputChanged,
          onValidityChange: this.onValidityChange,
        }),
        h(InputGroup, {
          label: 'Nazwa',
          name: 'name',
          validator: validators.name,
          value: this.state.group.name,
          submitted: this.state.submitted,
          onChange: this.inputChanged,
          onValidityChange: this.onValidityChange,
        }),
        h(InputGroup, {
          label: 'Rok rozpoczęcia',
          name: 'year',
          validator: validators.year,
          value: this.state.group.year,
          submitted: this.state.submitted,
          onChange: this.inputChanged,
          onValidityChange: this.onValidityChange,
        }),
        h(SelectGroup, {
          label: 'Firma',
          name: 'company',
          validator: validators.company,
          value: this.state.group.company,
          submitted: this.state.submitted,
          onChange: this.inputChanged,
          onValidityChange: this.onValidityChange,
          options:
            [
              {
                label: 'LT',
                value: 'LT',
              },
              {
                label: 'AT',
                value: 'AT',
              },
            ],
        }),
        h('.card.my-2', [
          h('.card-header', 'Cennik'),
          h('.card-body', [
            h(GroupPricingForm, {
              pricing: this.state.group.pricing,
              onUpdate: this.updatePricing,
              onValidityChange: this.onValidityChange,
              submitted: this.state.submitted,
            }),
          ]),
        ]),
        h('button.mb-4.btn.btn-primary', {
          type: 'submit',
        }, 'Zapisz'),
      ])
    );
  }
}

export default GroupForm;
