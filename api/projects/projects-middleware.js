// add middlewares here related to projects
const Projects = require(`../projects/projects-router.js`);

function validateProjectId(req, res, next) {
  Projects.get(req.params.id).then((project) => {
    if (project === null) {
      res.status(404).json({ message: `project not found` });
    } else {
      next();
    }
  });
}

module.exports = validateProjectId;
