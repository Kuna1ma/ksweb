const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Default root route (optional, just to test server is alive)
app.get("/", (req, res) => {
  res.send("Kill switch server is running! Use /status");
});

// Status endpoint
app.get("/status", (req, res) => {
  res.json({
    maintenance: false,
    message: "Site is live again",
    lastUpdated: "2025-10-03T00:20:00Z"
  });
});

app.listen(PORT, () => {
  console.log(`Kill switch running on port ${PORT}`);
});
