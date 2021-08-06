const Projects = require(`./projects-model.js`); // imports projects model
const express = require(`express`); // imports express
const validateProjectId = require(`../projects/projects-middleware`) // imports projects middleware
const router = express.Router(); // creates router using express


// [GET] /api/projects returns an array of projects (or an empty array) as the body of the response.
router.get(`/`, (req,res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            res.status(500).json({message: `unable to retrieve projects`})
        })
})



// [GET] /api/projects/:id returns a project with the given id as the body of the response.
router.get(`/:id`, validateProjectId,  (req,res) => {
    Projects.get(req.params.id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            res.status(404).json({message: `unable to retrieve project`})
        })
})



// [POST] /api/projects returns the newly created project as the body of the response.
router.post(`/`, (req,res) => {
    if(!res.body.name || !res.body.description) {
        res.status(400).json({message: `projects require a name and description`})
    }
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            res.status(500).json({message: `unable to create new project`})
        })
})



// [PUT] /api/projects/:id returns the updated project as the body of the response.
router.put(`/:id`, validateProjectId, (req,res) => {
    if(!res.body.name || !res.body.description) {
        res.status(400).json({message: `projects require a name and description`})
    }
    const id = req.params.id
    const changes = req.body
    Projects.update(id,changes)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(500).json({message: `unable to update project`})
})



// [DELETE] /api/projects/:id returns no response body.
router.delete(`/:id`, validateProjectId, (req,res) => {
    Projects.remove(req.params.id)
        .then(project => {
            res.status(201).json(`project deletion successful`)
        })
        .catch(err => {
            res.status(404).json({message: `unable to delete project`})
        })
})

router.get(`/:id/actions`, (req,res) => {
    Projects.getProjectActions(req.params.id)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            res.status(500).json({message: `unable to retrieve actions associated with project`})
        })
})

module.exports = router; 