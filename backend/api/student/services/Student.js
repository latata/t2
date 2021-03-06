'use strict';

/**
 * Student.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

module.exports = {

  /**
   * Promise to fetch all students.
   *
   * @return {Promise}
   */

  fetchAll: (params) => {
    const convertedParams = strapi.utils.models.convertParams('student', params);

    return Student
      .find()
      .where(convertedParams.where)
      .sort(convertedParams.sort)
      .skip(convertedParams.start)
      .limit(convertedParams.limit)
      .populate(_.keys(_.groupBy(_.reject(strapi.models.student.associations, {autoPopulate: false}), 'alias')).join(' '));
  },

  /**
   * Promise to fetch all students.
   *
   * @return {Promise}
   */

  search: async (query, showDeleted = false) => {
    const regexp = new RegExp(`(${query.split(' ')
      .join(')|(')})`, 'ig');
    const populatePaths = _.keys(_.groupBy(_.reject(strapi.models.student.associations, { autoPopulate: false }), 'alias'))
      .join(' ');

    const firstNameAndLastName = await Student
      .find()
      .where({
        firstName: { $regex: regexp },
        lastName: { $regex: regexp },
      })
      .populate(populatePaths);

    const ids = firstNameAndLastName.map((student) => student._id);

    const firstNameOrLastName = await Student
      .find()
      .where({
        $or: [
          { firstName: { $regex: regexp } },
          { lastName: { $regex: regexp } },
        ],
        _id: {
          $nin: ids,
        },
      })
      .populate(populatePaths);

    let results = [...firstNameAndLastName, ...firstNameOrLastName];

    if (showDeleted !== '1') {
      results = results.filter((student) => {
        let allGroupsDeleted = true;

        student.groups.forEach(group => {
          if (!group.deleted) {
            allGroupsDeleted = false;
          }
        });

        return !allGroupsDeleted;
      });
    }

    return results;
  },

  /**
   * Promise to fetch a/an student.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    return Student
      .findOne(_.pick(params, _.keys(Student.schema.paths)))
      .populate(_.keys(_.groupBy(_.reject(strapi.models.student.associations, {autoPopulate: false}), 'alias')).join(' '));
  },

  /**
   * Promise to add a/an student.
   *
   * @return {Promise}
   */

  add: async (values) => {
    const data = await Student.create(_.omit(values, _.keys(_.groupBy(strapi.models.student.associations, 'alias'))));
    await strapi.hook.mongoose.manageRelations('student', _.merge(_.clone(data), { values }));
    return data;
  },

  /**
   * Promise to edit a/an student.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Note: The current method will return the full response of Mongo.
    // To get the updated object, you have to execute the `findOne()` method
    // or use the `findOneOrUpdate()` method with `{ new:true }` option.
    await strapi.hook.mongoose.manageRelations('student', _.merge(_.clone(params), { values }));
    return Student.update(params, values, { multi: true });
  },

  /**
   * Promise to remove a/an student.
   *
   * @return {Promise}
   */

  remove: async params => {
    const student = await strapi.services.student.fetch(params);

    if (student.studentPayments.length) {
      throw 'Nie można usunąć ucznia, który ma przypisane płatności. Ustaw jako rezygnacja.';
    }

    if (student.phoneNo || student.phoneNo2 || student.street) {
      throw 'Nie można usunąć ucznia, który ma już przypisany nr telefonu lub adres.';
    }

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Student.findOneAndRemove(params, {})
      .populate(_.keys(_.groupBy(_.reject(strapi.models.student.associations, {autoPopulate: false}), 'alias')).join(' '));

    _.forEach(Student.associations, async association => {
      const search = (_.endsWith(association.nature, 'One')) ? { [association.via]: data._id } : { [association.via]: { $in: [data._id] } };
      const update = (_.endsWith(association.nature, 'One')) ? { [association.via]: null } : { $pull: { [association.via]: data._id } };

      await strapi.models[association.model || association.collection].update(
        search,
        update,
        { multi: true });
    });

    return data;
  }
};
