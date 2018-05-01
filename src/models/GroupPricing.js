import { List } from 'immutable';
import Base from './Base';
import http from '../services/http';

export default class GroupPricing extends Base({
  name: undefined,
  r9oct: undefined,
  r9nov: undefined,
  r9dec: undefined,
  r9jan: undefined,
  r9feb: undefined,
  r9mar: undefined,
  r9apr: undefined,
  r9may: undefined,
  r4oct: undefined,
  r4nov: undefined,
  r4jan: undefined,
  r4mar: undefined,
  r2oct: undefined,
  r2jan: undefined,
  r1oct: undefined,
}) {
  static create(data) {
    const groupPricing = {};

    if (typeof data !== 'object') {
      groupPricing._id = data;
    } else if (data) {
      groupPricing._id = data._id;
      groupPricing.name = data.name;
      groupPricing.r9oct = data.r9oct;
      groupPricing.r9nov = data.r9nov;
      groupPricing.r9dec = data.r9dec;
      groupPricing.r9jan = data.r9jan;
      groupPricing.r9feb = data.r9feb;
      groupPricing.r9mar = data.r9mar;
      groupPricing.r9apr = data.r9apr;
      groupPricing.r9may = data.r9may;
      groupPricing.r4oct = data.r4oct;
      groupPricing.r4nov = data.r4nov;
      groupPricing.r4jan = data.r4jan;
      groupPricing.r4mar = data.r4mar;
      groupPricing.r2oct = data.r2oct;
      groupPricing.r2jan = data.r2jan;
      groupPricing.r1oct = data.r1oct;
    }

    return data && new GroupPricing(groupPricing);
  }

  static $getAll() {
    return http('grouppricing')
      .then(groupPricings =>
        List(groupPricings.map(groupPricing => GroupPricing.create(groupPricing))));
  }
}
