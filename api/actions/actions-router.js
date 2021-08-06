// Write your "actions" router here!
const Actions = require(`./actions-model.js`); // imports actions model
const Projects = require(`../projects/projects-model.js`) // imports projects model
const express = require('express'); // imports express
const validateActionId = require(`../actions/actions-middlware`); // imports actions middleware

const router = express.Router(); // creates router using express


// [GET] /api/actions returns an array of actions (or an empty array) as the body of the response.
router.get(`/`, (req,res) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            res.status(500).json({message: `unable to retrieve actions`})
        })
})



// [GET] /api/actions/:id returns an action with the given id as the body of the response.
router.get(`/:id`, validateActionId, (req,res) => {
    Actions.get(req.params.id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            res.status(404).json({message: `unable to retrieve action`})
        })
})



// [POST] /api/actions returns the newly created action as the body of the response.
router.post(`/`, (req,res) => {
    if(!res.body.project_id || !res.body.description || !res.body.notes) {
        res.status(400).json({message: `action requires project id, description, and notes`})
    }
    Projects.get(res.body.project_id)
        .then(project => {
            if(project === null) {
                res.status(404).json({message: `project doesn't exist`})
            }
        })
    Actions.insert(req.body)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: `unable to create new action`})
        })
})



// [PUT] /api/actions/:id returns the updated action as the body of the response.
router.put(`/:id`, validateActionId, (req,res) => {
    if(!res.body.project_id || !res.body.description || !res.body.notes) {
         res.status(400).json({message: `action requires project id, description, and notes`})
    }
    const id = req.params.id
    const changes = req.body
    Actions.update(id,changes)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(err => {
            res.status(500).json({message: `unable to update action`})
        })
})



// [DELETE] /api/actions/:id returns no response body.
router.delete(`/:id`, validateActionId, (req,res) => {
    Actions.remove(req.params.id)
        .then(action => {
            res.status(201).json(`action deletion successful`)
        })
        .catch(err => {
            res.status(404).json({message: `unable to delete action`})
        })
})



module.exports = router; // exports router for use in server.js
