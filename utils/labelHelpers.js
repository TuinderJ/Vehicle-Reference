const { Label } = require('../models');
const { isAdmin } = require('./authHelpers');

const getLabel = async ({ label, id }) => {
  try {
    const updatedLabel = await Label.update({ label }, { where: { id } });

    if (updatedLabel[0]) {
      return { id, label };
    } else {
      return 'label not found or no updates';
    }
  } catch (err) {
    return { err };
  }
};

const deleteLabel = async ({ id }) => {
  if (!isAdmin()) return { loggedIn: false };
  try {
    const deletedLabel = await Label.destroy({ where: { id } });
    if (deletedLabel) {
      return 'label deleted';
    } else {
      return 'label not found';
    }
  } catch (err) {
    return { err };
  }
};

module.exports = { getLabel, deleteLabel };
