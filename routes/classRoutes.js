import express from "express";
import Class from "../schemas/Class.js";

const router = express.Router();

// Add Class
router.post("/add", async (req, res) => {
  const newClass = new Class(req.body);
  try {
    const savedClass = await newClass.save();
    res.status(200).json(savedClass);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Remove Class
router.delete("/remove/:id", async (req, res) => {
  try {
    await Class.findByIdAndDelete(req.params.id);
    res.status(200).json("Class deleted successfully.");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get All Classes
router.get("/all", async (req, res) => {
  try {
    const classes = await Class.find();
    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;


