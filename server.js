const express = require("express");
const path = require("path");
const app = express();

// Replit uses a system-assigned port
const PORT = process.env.PORT || 3000;



// Serve the root map folder at /
rootDir = path.join(__dirname);
app.use("/", express.static(rootDir));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
