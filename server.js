const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

// Kill switch endpoint
app.get("/config", (req, res) => {
  
  res.json({
    maintenance: true, // toggle true/false
    message: "Please send your payment",
    contact: "gaculacenon@icloud.com",
    lastUpdated: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Kill switch running on port ${PORT}`);
});
