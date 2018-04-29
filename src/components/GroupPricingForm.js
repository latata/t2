import React, { Component } from 'react';
import { Map } from 'immutable';
import GroupPricing from '../models/GroupPricing';

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

  return (<div className="form-group">
    <label htmlFor={props.name}>{number} {installment} {monthName}</label>
    <input
      name={props.name}
      id={props.name}
      className="form-control"
      value={value}
      onChange={props.inputChanged}
    />
          </div>);
}

class GroupPricingForm extends Component {
  constructor(props) {
    super(props);

    this.inputChanged = this.inputChanged.bind(this);
    const pricing = this.fillPricing(this.props.pricing, pricingItems);

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

  fillPricing(pricing, pricingItems) {
    let filledPricing = Map(pricing);
    pricingItems.forEach((item) => {
      if (typeof filledPricing.get(item) === 'undefined') {
        filledPricing = filledPricing.set(item, 0);
      }
    });

    return filledPricing;
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

    let pricing = this.state.pricing;

    pricingItems.forEach((pricingItem) => {
      pricing = pricing.set(pricingItem, groupPricing[pricingItem]);
    });

    this.setState({ pricing });
    this.updatePricing(pricing);
  }

  inputChanged(event) {
    const pricing = this.state.pricing.set(event.target.name, event.target.value);

    this.setState({ pricing });
    this.updatePricing(pricing);
  }

  render() {
    return (<div>
      <div>
        {this.state.groupPricings && this.state.groupPricings.map(groupPricing => (<span
          key={groupPricing._id}
        ><a
          href="qwe"
          onClick={this.usePricing.bind(this, groupPricing)}
        >{groupPricing.name}
        </a> |
        </span>))}
      </div>
      {this.state.pricingItems.map(item => (<PricingItem
        key={item}
        name={item}
        pricing={this.state.pricing}
        inputChanged={this.inputChanged}
      />))}
            </div>);
  }
}

export default GroupPricingForm;
