const express = require("express");
const fs = require('fs');
const path = require("path");
const cors = require("cors");
const https = require('https');
const dotenv = require("dotenv");
dotenv.config();
const { PORT } = process.env;

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World, now over HTTPS!");
});

const privateKey = fs.readFileSync(
  "/etc/letsencrypt/live/nymity.freemyip.com/privkey.pem",
  "utf8"
);
const certificate = fs.readFileSync(
  "/etc/letsencrypt/live/nymity.freemyip.com/fullchain.pem",
  "utf8"
);

const credentials = { key: privateKey, cert: certificate };
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT, () => {
    console.log(`HTTPS Server running on port ${PORT}`);
  });

// app.listen(PORT, async () => {
//   console.log(`Сервер запущен на ${PORT} порту`);
// });
