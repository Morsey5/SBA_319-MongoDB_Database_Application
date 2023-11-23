import express from "express";
import inspectionsRouter from './routes/inspections.mjs';

const app = express()
const PORT = process.env.PORT || 3000;



// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });

  app.use('/inspections', inspectionsRouter);

  
Object.keys(routes).forEach((route) => {
    app.use(`/${route}`, routes[route]);
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  