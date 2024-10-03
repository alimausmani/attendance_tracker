// import express from "express";
// import Class from "../schemas/Class.js";

// const router = express.Router();

// // Add Class
// router.post("/add", async (req, res) => {
//   const newClass = new Class(req.body);
//   try {
//     const savedClass = await newClass.save();
//     res.status(200).json(savedClass);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Remove Class
// router.delete("/remove/:id", async (req, res) => {
//   try {
//     await Class.findByIdAndDelete(req.params.id);
//     res.status(200).json("Class deleted successfully.");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Get All Classes
// router.get("/all", async (req, res) => {
//   try {
//     const classes = await Class.find();
//     res.status(200).json(classes);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// export default router;


import express from 'express';
import Class from '../models/classModel.js';  // Ensure this path is correct

const router = express.Router();

// POST route for adding a new class
router.post('/add', async (req, res) => {
    try {
        const { name, section } = req.body;

        // Validate input
        if (!name || !section) {
            return res.status(400).json({ message: 'Name and section are required.' });
        }

        // Create new class
        const newClass = new Class({ name, section });
        await newClass.save();

        res.status(201).json({ message: 'Class created successfully', newClass });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
});

export default router;
