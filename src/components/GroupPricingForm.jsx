import React, { Component } from 'react';
import h from 'react-hyperscript';
import { Map } from 'immutable';
import GroupPricing from '../models/GroupPricing';
import InputGroup from './forms/InputGroup';
import SimpleValidator from '../helpers/validators/SimpleValidator';

const monthMap = {
  oct: 'Październik',
  nov: 'Listopad',
  dec: 'Grudzień',
  jan: 'Styczeń',
  feb: 'Luty',
  mar: 'Marzec',
  apr: 'Kwiecień',
  may: 'Maj',
};

const pricingItems = [
  'r9oct',
  'r9nov',
  'r9dec',
  'r9jan',
  'r9feb',
  'r9mar',
  'r9apr',
  'r9may',
  'r4oct',
  'r4nov',
  'r4jan',
  'r4mar',
  'r2oct',
  'r2jan',
  'r1oct',
];

function PricingItem(props) {
  const value = props.pricing.get(props.name);
  const monthName = monthMap[props.name.substr(2, 3)];
  const number = parseInt(props.name.substr(1, 1), 10);
  let installment = 'raty';
  if (number === 1) {
    installment = 'rata';
  } else if (number === 9) {
    installment = 'rat';
  }
  const label = `${number} ${installment} ${monthName}`;

  return (
    h(InputGroup, {
      label,
      name: props.name,
      value,
      onChange: props.inputChanged,
      submitted: props.submitted,
      onValidityChange: props.onValidityChange,
      validator: new SimpleValidator({ required: true }),
    })
  );
}

class GroupPricingForm extends Component {
  static fillPricing(pricing) {
    let filledPricing = Map(pricing);
    pricingItems.forEach((item) => {
      if (typeof filledPricing.get(item) === 'undefined') {
        filledPricing = filledPricing.set(item, 0);
      }
    });

    return filledPricing;
  }

  constructor(props) {
    super(props);

    this.inputChanged = this.inputChanged.bind(this);
    this.usePricing = this.usePricing.bind(this);

    const pricing = GroupPricingForm.fillPricing(this.props.pricing);

    this.state = {
      pricing,
      pricingItems,
    };
  }

  componentDidMount() {
    GroupPricing.$getAll()
      .then((groupPricings) => {
        this.setState({ groupPricings });
      });
  }

  updatePricing(pricing) {
    let pricingAsNumbers = Map();
    pricingItems.forEach((key) => {
      const value = pricing.get(key)
        .toString()
        .replace(',', '.');

      pricingAsNumbers = pricingAsNumbers.set(key, parseFloat(value));
    });
    this.props.onUpdate(pricingAsNumbers);
  }

  usePricing(groupPricing, event) {
    event.preventDefault();

    let { pricing } = this.state;

    pricingItems.forEach((pricingItem) => {
      pricing = pricing.set(pricingItem, groupPricing[pricingItem]);
    });

    this.setState({ pricing });
    this.updatePricing(pricing);
  }

  inputChanged({ name, value }) {
    const pricing = this.state.pricing.set(name, value);

    this.setState({ pricing });
    this.updatePricing(pricing);
  }

  render() {
    return (
      <div>
        <div className="btn-group">
          {this.state.groupPricings && this.state.groupPricings.map(groupPricing => (
            <button type="button" className="btn btn-outline-primary btn-sm" key={groupPricing._id} onClick={event => this.usePricing(groupPricing, event)}>
              {groupPricing.name}
            </button>))}
        </div>
        {this.state.pricingItems.map(item => (<PricingItem
          key={item}
          name={item}
          pricing={this.state.pricing}
          inputChanged={this.inputChanged}
          submitted={this.props.submitted}
          onValidityChange={this.props.onValidityChange}
        />))}
      </div>);
  }
}

export default GroupPricingForm;
