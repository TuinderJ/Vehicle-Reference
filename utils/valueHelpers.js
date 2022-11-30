const { Value } = require('../models');

const updateValue = async ({ id, value }) => {
  if (!isLoggedIn()) return { loggedIn: false };
  try {
    const updatedvalue = await Value.update({ value }, { where: { id } });

    if (updatedvalue[0]) {
      return { id, value };
    } else {
      return 'value not found or no updates';
    }
  } catch (err) {
    return { err };
  }
};

const deleteValue = async ({ id }) => {
  if (!isAdmin()) return { loggedIn: false };
  try {
    const deletedvalue = await Value.destroy({ where: { id } });
    if (deletedvalue) {
      return 'value deleted';
    } else {
      return 'value not found';
    }
  } catch (err) {
    return { err };
  }
};

const bulkCreateValues = async ({ values }) => {
  if (!isLoggedIn()) return { loggedIn: false };
  try {
    const newValues = await Value.bulkCreate(values);
    if (newValues[0]) {
      return newValues;
    } else {
      return '';
    }
  } catch (err) {
    return { err };
  }
};

const bulkUpdateValues = async ({ values }) => {
  if (!isLoggedIn()) return { loggedIn: false };
  try {
    values.forEach(({ id, value }) => {
      Value.update({ value }, { where: { id } });
    });
  } catch (err) {
    return { err };
  }
};

module.exports = { updateValue, deleteValue, bulkCreateValues, bulkUpdateValues };
