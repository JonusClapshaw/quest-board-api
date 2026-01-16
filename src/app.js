import express from 'express';
import router from './routers/routes.js';

//configure Express.js app
const app = express();

//middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routers
app.use("/", router);

export default app;