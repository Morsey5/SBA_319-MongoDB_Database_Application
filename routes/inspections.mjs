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
  
// POST - CREATE ROUTE
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

export default router;
