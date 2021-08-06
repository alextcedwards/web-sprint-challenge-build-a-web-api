// add middlewares here related to actions
const Actions = require(`../actions/actions-model.js`);

function validateActionId(req, res, next) {
  Actions.get(req.params.id).then((action) => {
    if (action === null) {
      res.status(404).json({ message: `action not found` });
    } else {
      next();
    }
  });
}

module.exports = validateActionId;
