const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

let MAINTENANCE = process.env.MAINTENANCE === "true";
const ADMIN_SECRET = process.env.ADMIN_SECRET || "changeme";
let MESSAGE = process.env.MESSAGE || "Site temporarily paused";

// Public endpoint — React fetches this
app.get("/status", (req, res) => {
  res.json({
    maintenance: MAINTENANCE,
    message: MESSAGE,
    lastUpdated: new Date().toISOString(),
  });
});

// Toggle endpoint — only you can hit it with the secret
app.get("/toggle", (req, res) => {
  const { admin_secret, mode, msg } = req.query;
  if (admin_secret !== ADMIN_SECRET) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  if (mode === "true") MAINTENANCE = true;
  if (mode === "false") MAINTENANCE = false;
  if (msg) MESSAGE = msg;

  return res.json({
    ok: true,
    maintenance: MAINTENANCE,
    message: MESSAGE,
    lastUpdated: new Date().toISOString(),
  });
});

const PORT = process.env.PORT || 5000; // ✅ use 5000 locally, Railway will override
app.listen(PORT, () => console.log(`Kill switch running on port ${PORT}`));
