import express from 'express';
import connectDB from '../db.mjs';
import { ObjectId } from 'mongodb';

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const db = await connectDB();
    const inspections = await db.collection('inspections').find({}).toArray();
    res.json(inspections);
  } catch (error) {
    console.error('Error fetching inspections:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


export default router;
