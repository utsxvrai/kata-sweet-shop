const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes");



/* ---------- CORS ---------- */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

/* ---------- BODY PARSER ---------- */
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);

/* ---------- ROUTES ---------- */
app.use("/api", routes);




/* ---------- SERVER ---------- */
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
