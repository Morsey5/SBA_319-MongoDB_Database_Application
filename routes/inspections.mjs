import express from 'express';
import connectDB from '../db.mjs';
import { ObjectId } from 'mongodb';

const router = express.Router();


// GET ALL
router.get("/", async (req, res) => {
    try {
      const db = await connectDB();
      const inspections = await db.collection("inspections").find({}).toArray();
      res.json(inspections);
    } catch (error) {
      console.error("Error fetching inspections:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  // GET ONE
  router.get("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const db = await connectDB();
      const inspection = await db.collection("inspections").findOne({ _id: ObjectId(id) });
  
      if (!inspection) {
        return res.status(404).json({ error: "Inspection not found" });
      }
  
      res.json(inspection);
    } catch (error) {
      console.error("Error fetching inspection:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
// POST 
router.post("/", async (req, res) => {
    const { body } = req;
  
    try {
      const db = await connectDB();
      const result = await db.collection("inspections").insertOne(body);
  
      // Respond with the newly created inspection
      res.json(result.ops[0]);
    } catch (error) {
      console.error("Error creating inspection:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // PATCH
router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { body } = req;
  
    try {
      const db = await connectDB();
      const result = await db.collection("inspections").updateOne(
        { _id: ObjectId(id) },
        { $set: body }
      );
  
      if (result.matchedCount === 0) {
        return res.status(404).json({ error: "Inspection not found" });
      }
  
      // Respond with the updated inspection
      res.json({ message: "Inspection updated successfully" });
    } catch (error) {
      console.error("Error updating inspection:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // DELETE
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const db = await connectDB();
      const result = await db.collection("inspections").deleteOne({ _id: ObjectId(id) });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "Inspection not found" });
      }
  
      // Respond with a success message
      res.json({ message: "Inspection deleted successfully" });
    } catch (error) {
      console.error("Error deleting inspection:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

export default router;
