"use strict";
export {};
const express  = require('express');
const router   = express.Router();

const middleware    = require('../middleware');
const CourseController = require('../controllers/courseController');


router.get('/', CourseController.list); // List all movies
router.post('/', middleware.checkAuthentication, CourseController.create); // Create a new movie
router.get('/:id', CourseController.read); // Read a movie by Id
router.put('/:id', middleware.checkAuthentication, CourseController.update); // Update a movie by Id
router.delete('/:id', middleware.checkAuthentication, CourseController.remove); // Delete a movie by Id


module.exports = router;