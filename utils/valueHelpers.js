const { Value } = require('../models');
const { isLoggedIn } = require('../utils/authHelpers');

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
  if (!isLoggedIn({ req })) return { loggedIn: false };
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

const bulkCreateValues = async ({ req, newValues }) => {
  if (!isLoggedIn({ req })) return { loggedIn: false };
  try {
    if (!newValues) return;
    const createdValues = await Value.bulkCreate(newValues);
    if (createdValues[0]) {
      return createdValues;
    } else {
      return '';
    }
  } catch (err) {
    return { err };
  }
};

const bulkUpdateValues = async ({ req, valuesToUpdate }) => {
  if (!isLoggedIn({ req })) return { loggedIn: false };
  try {
    if (!valuesToUpdate) return;
    valuesToUpdate.forEach(({ id, value }) => {
      Value.update({ value }, { where: { id } });
    });
  } catch (err) {
    return { err };
  }
};

module.exports = { updateValue, deleteValue, bulkCreateValues, bulkUpdateValues };
