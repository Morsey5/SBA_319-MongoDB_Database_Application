import express from "express";
import inspectionsRouter from './routes/inspections.mjs';

const app = express()
const PORT = process.env.PORT || 3000;


// Middleware to parse JSON
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Use the middleware to set up your routes
Object.keys(routes).forEach((route) => {
  app.use(`/${route}`, routes[route]);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});