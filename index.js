import express from "express";

import { rateLimitMiddleware } from "./middlewares/rateLimitMiddleware.mjs";
import { responseTime } from "./middlewares/responseTime.mjs";

const app = express();
const PORT = 5000;

app.use(responseTime);
app.use(rateLimitMiddleware);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
