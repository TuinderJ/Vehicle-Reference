const { Value } = require('../models');

const updateValue = async ({ id, value }) => {
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

module.exports = { updateValue, deleteValue, bulkCreateValues };
